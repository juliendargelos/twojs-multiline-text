import Two from 'two.js'
import wrap from 'word-wrapper'

const flag = (name: string) => (
  target: any,
  property: string
) => {
  const privateProperty = `_${property}`
  const flagproperty = `_flag${name[0].toUpperCase()}${name.slice(1)}`

  Object.defineProperty(target, property, {
    get (this: any): any {
      return this[privateProperty]
    },

    set (this: any, value: any) {
      this[privateProperty] = value
      this[flagproperty] = true
    }
  })
}

type OptionallyOffscreenCanvasRenderingContext2D = (
  CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
)

export class MultilineText extends Two.Group implements Two.Text {
  private _flagWrapping: boolean = true
  private _flagStyle: boolean = true

  @flag('wrapping') public width: number
  @flag('wrapping') public measure: 'font' | 'monospace' | 'length'
  @flag('wrapping') public mode: 'normal' | 'pre' | 'nowrap'
  @flag('wrapping') public value: string
  @flag('wrapping') public family: string
  @flag('wrapping') public size: number
  @flag('wrapping') public weight: number | string
  @flag('style') public style: string
  @flag('style') public leading: number
  @flag('style') public absoluteLeading: boolean
  @flag('style') public alignment: string
  @flag('style') public fill: string
  @flag('style') public stroke: string
  @flag('style') public linewidth: number
  @flag('style') public decoration: string
  @flag('style') public baseline: string
  @flag('style') public opacity: number
  @flag('style') public visible: boolean

  public constructor (message: string, x: number = 0, y: number = 0, {
    width = Infinity,
    measure = 'font',
    mode = 'normal',
    family = 'sans-serif',
    size = 13,
    weight = 500,
    style = 'normal',
    leading = 1.2,
    absoluteLeading = false,
    alignment = 'middle',
    fill = '#000',
    stroke = 'transparent',
    linewidth = 1,
    decoration = 'none',
    baseline = 'middle',
    opacity = 1,
    visible = true
  }: {
    width?: number
    measure?: 'font' | 'monospace' | 'length'
    mode?: 'normal' | 'pre' | 'nowrap'
    family?: string
    size?: number
    weight?: number | string
    style?: string
    leading?: number
    absoluteLeading?: boolean
    alignment?: string
    fill?: string
    stroke?: string
    linewidth?: number
    decoration?: string
    baseline?: string
    opacity?: number
    visible?: boolean
  } = {}) {
    super()

    this.translation.set(x, y)
    this.width = width
    this.measure = measure
    this.mode = mode
    this.value = message
    this.family = family
    this.size = size
    this.leading = leading
    this.absoluteLeading = absoluteLeading
    this.alignment = alignment
    this.fill = fill
    this.stroke = stroke
    this.linewidth = linewidth
    this.weight = weight
    this.style = style
    this.decoration = decoration
    this.baseline = baseline
    this.opacity = opacity
    this.visible = visible
  }

  public get computedLeading (): number {
    return this.absoluteLeading ? this.leading : this.size * this.leading
  }

  private get context (): OptionallyOffscreenCanvasRenderingContext2D {
    const value = (typeof OffscreenCanvas === 'function'
      ? new OffscreenCanvas(1, 1)
      : document.createElement('canvas')
    ).getContext('2d')!

    Object.defineProperty(MultilineText.prototype, 'context', {
      value,
      writable: false,
      configurable: false
    })

    return value
  }

  private get _measureMonospace (): (
    text: string,
    start: number,
    end: number,
    width: number
  ) => { start: number, end: number } {
    const charWidth = this.context.measureText('M').width
    return (text: string, start: number, end: number, width: number) => ({
      start,
      end: start + Math.min(
        end - start,
        ~~(width / charWidth),
        ~~((end - start) * charWidth)
      )
    })
  }

  private _measureLength = (
    text: string,
    start: number,
    end: number,
    width: number
  ): { start: number, end: number } => ({
    start,
    end: start + Math.min(width, end - start)
  })

  private _measureFont = (
    text: string,
    start: number,
    end: number,
    width: number
  ): { start: number, end: number } => {
    while (this.context.measureText(text.slice(start, end)).width > width) {
      end--
    }

    return { start, end }
  }

  private _prepareMeasureContext (): void {
    this.context.font = `${
      this.style
    } ${
      this.weight
    } ${
      this.size
    }px ${
      this.family
    }`
  }

  private _update (bubbles: boolean = false): this {
    if (this._flagWrapping) {
      let measure: (
        text: string,
        start: number,
        end: number,
        width: number
      ) => { start: number, end: number }

      if (this.measure === 'length') {
        measure = this._measureLength
      } else {
        this._prepareMeasureContext()
        measure = this.measure === 'monospace'
          ? this._measureMonospace
          : this._measureFont
      }

      const texts = this.children as Two.Text[]
      const lines = wrap
        .lines(this.value, {
          measure,
          width: this.width,
          mode: this.mode
        })
        .map(({ start, end }) => this.value.slice(start, end))

      while (texts.length > lines.length) {
        this.remove(texts[0])
      }

      texts.forEach((text, index) => {
        text.value = lines[index].trim()
      })

      while (texts.length < lines.length) {
        this.add(new Two.Text(lines[texts.length].trim(), 0, 0))
      }

      this._flagStyle = true
    }

    if (this._flagStyle) {
      const {
        family,
        size,
        computedLeading: leading,
        alignment,
        fill,
        stroke,
        linewidth,
        style,
        weight,
        decoration,
        baseline,
        opacity,
        visible
      } = this

      let offset: number = 0

      switch (alignment) {
        case 'end':
          offset = this.width
          break

        case 'center':
          offset = this.width / 2
          break
      }

      ;(this.children as Two.Text[]).forEach((text, index) => {
        text.family = family
        text.size = size
        text.leading = leading
        text.alignment = alignment
        text.fill = fill
        text.stroke = stroke
        text.linewidth = linewidth
        text.style = style
        text.weight = weight
        text.decoration = decoration
        text.baseline = baseline
        text.opacity = opacity
        text.visible = visible
        text.translation.set(offset, leading * index)
      })
    }

    (Two.Group.prototype as unknown as { _update (bubbles?: boolean): void })
      ._update.call(this, bubbles)

    return this
  }

  private flagReset (): this {
    this._flagWrapping = this._flagStyle = false

    ;(Two.Group.prototype as unknown as { flagReset (): void })
      .flagReset.call(this)

    return this
  }
}
