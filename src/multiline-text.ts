import Two from 'two.js'
import wrap from 'word-wrapper'

type OptionallyOffscreenCanvasRenderingContext2D = (
  CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
)

type AlignmentProperties = InstanceType<typeof Two.Text>['alignment']
type StyleProperties = InstanceType<typeof Two.Text>['style']
type DecorationProperties = InstanceType<typeof Two.Text>['decoration']
type BaselineProperties = InstanceType<typeof Two.Text>['baseline']

type Text = Pick<InstanceType<typeof Two.Text>, (
  'value' |
  'family' |
  'size' |
  'leading' |
  'alignment' |
  'fill' |
  'stroke' |
  'linewidth' |
  'style' |
  'weight' |
  'decoration' |
  'baseline' |
  'opacity' |
  'visible' |
  'rotation' |
  'scale' |
  'translation' |
  'clone' |
  'getBoundingClientRect'
)>

const proto: Record<string, PropertyDescriptor> = {
  width: {
    enumerable: true,
    get(this: MultilineText) { return this._width },
    set(this: MultilineText, v: number) { this._width = v; this._flagWrapping = true }
  },
  measure: {
    enumerable: true,
    get(this: MultilineText) { return this._measure },
    set(this: MultilineText, v: 'font' | 'monospace' | 'length') { this._measure = v; this._flagWrapping = true }
  },
  mode: {
    enumerable: true,
    get(this: MultilineText) { return this._mode },
    set(this: MultilineText, v: 'normal' | 'pre' | 'nowrap') { this._mode = v; this._flagWrapping = true }
  },
  value: {
    enumerable: true,
    get(this: MultilineText) { return this._value },
    set(this: MultilineText, v: string) { this._value = v; this._flagWrapping = true }
  },
  family: {
    enumerable: true,
    get(this: MultilineText) { return this._family },
    set(this: MultilineText, v: string) { this._family = v; this._flagWrapping = true }
  },
  size: {
    enumerable: true,
    get(this: MultilineText) { return this._size },
    set(this: MultilineText, v: number) { this._size = v; this._flagWrapping = true }
  },
  weight: {
    enumerable: true,
    get(this: MultilineText) { return this._weight },
    set(this: MultilineText, v: number) { this._weight = v; this._flagWrapping = true }
  },
  style: {
    enumerable: true,
    get(this: MultilineText) { return this._style },
    set(this: MultilineText, v: StyleProperties) { this._style = v; this._flagStyle = true }
  },
  leading: {
    enumerable: true,
    get(this: MultilineText) { return this._leading },
    set(this: MultilineText, v: number) { this._leading = v; this._flagStyle = true }
  },
  absoluteLeading: {
    enumerable: true,
    get(this: MultilineText) { return this._absoluteLeading },
    set(this: MultilineText, v: boolean) { this._absoluteLeading = v; this._flagStyle = true }
  },
  alignment: {
    enumerable: true,
    get(this: MultilineText) { return this._alignment },
    set(this: MultilineText, v: AlignmentProperties) { this._alignment = v; this._flagStyle = true }
  },
  decoration: {
    enumerable: true,
    get(this: MultilineText) { return this._decoration },
    set(this: MultilineText, v: DecorationProperties) { this._decoration = v; this._flagStyle = true }
  },
  baseline: {
    enumerable: true,
    get(this: MultilineText) { return this._baseline },
    set(this: MultilineText, v: BaselineProperties) { this._baseline = v; this._flagStyle = true }
  }
}

const groupBackingFields: Array<[string, string]> = [
  ['_fill', '_flagStyle'],
  ['_stroke', '_flagStyle'],
  ['_linewidth', '_flagStyle'],
  ['_opacity', '_flagStyle'],
  ['_visible', '_flagStyle']
]

export class MultilineText extends Two.Group implements Text {
  _flagWrapping: boolean = true
  _flagStyle: boolean = true

  _width: number = Infinity
  _measure: 'font' | 'monospace' | 'length' = 'font'
  _mode: 'normal' | 'pre' | 'nowrap' = 'normal'
  _value: string = ''
  _family: string = 'sans-serif'
  _size: number = 13
  _weight: number = 500
  _style: StyleProperties = 'normal'
  _leading: number = 1.2
  _absoluteLeading: boolean = false
  _alignment: AlignmentProperties = 'left'
  _decoration: DecorationProperties = 'none'
  _baseline: BaselineProperties = 'middle'

  public width!: number
  public measure!: 'font' | 'monospace' | 'length'
  public mode!: 'normal' | 'pre' | 'nowrap'
  public value!: string
  public family!: string
  public size!: number
  public weight!: number
  public style!: StyleProperties
  public leading!: number
  public absoluteLeading!: boolean
  public alignment!: AlignmentProperties
  declare public fill: string
  declare public stroke: string
  declare public linewidth: number
  public decoration!: DecorationProperties
  public baseline!: BaselineProperties
  declare public opacity: number
  declare public visible: boolean

  public constructor (message: string, x: number = 0, y: number = 0, {
    width = Infinity,
    measure = 'font',
    mode = 'normal',
    family = 'sans-serif',
    size = 13,
    weight = 500,
    style = 'normal' as StyleProperties,
    leading = 1.2,
    absoluteLeading = false,
    alignment = 'left' as AlignmentProperties,
    fill = '#000',
    stroke = 'transparent',
    linewidth = 1,
    decoration = 'none' as DecorationProperties,
    baseline = 'middle' as BaselineProperties,
    opacity = 1,
    visible = true
  }: {
    width?: number
    measure?: 'font' | 'monospace' | 'length'
    mode?: 'normal' | 'pre' | 'nowrap'
    family?: string
    size?: number
    weight?: number
    style?: StyleProperties
    leading?: number
    absoluteLeading?: boolean
    alignment?: AlignmentProperties
    fill?: string
    stroke?: string
    linewidth?: number
    decoration?: DecorationProperties
    baseline?: BaselineProperties
    opacity?: number
    visible?: boolean
  } = {}) {
    super()

    for (const key in proto) {
      Object.defineProperty(this, key, proto[key])
    }

    for (const [backingField, flag] of groupBackingFields) {
      let value = (this as any)[backingField]
      Object.defineProperty(this, backingField, {
        get: () => value,
        set: (v) => { value = v; (this as any)[flag] = true },
        configurable: true,
        enumerable: false
      })
    }

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

  public get computedLeading(): number {
    return this._absoluteLeading ? this._leading : this._size * this._leading
  }

  private get context(): OptionallyOffscreenCanvasRenderingContext2D {
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

  private get _measureMonospace(): (
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

  private _prepareMeasureContext(): void {
    this.context.font = `${
      this._style
    } ${
      this._weight
    } ${
      this._size
    }px ${
      this._family
    }`
  }
}

Object.assign(MultilineText.prototype as any, {
  _update(bubbles: boolean): any {
    if (this._flagWrapping) {
      let measure: (
        text: string,
        start: number,
        end: number,
        width: number
      ) => { start: number, end: number }

      if (this._measure === 'length') {
        measure = this._measureLength
      } else {
        this._prepareMeasureContext()
        measure = this._measure === 'monospace'
          ? this._measureMonospace
          : this._measureFont
      }

      const texts = this.children as Text[]
      const lines = wrap
        .lines(this._value, {
          measure,
          width: this._width,
          mode: this._mode
        })
        .map(({ start, end }: { start: number, end: number }) => this._value.slice(start, end))

      while (texts.length > lines.length) {
        this.remove(texts[0])
      }

      texts.forEach((text: Text, index: number) => {
        text.value = lines[index].trim()
      })

      while (texts.length < lines.length) {
        this.add(new Two.Text(lines[texts.length].trim(), 0, 0))
      }

      this._flagStyle = true
    }

    if (this._flagStyle) {
      const leading = this.computedLeading

      let offset: number = 0

      switch (this._alignment) {
        case 'end':
          offset = this._width
          break

        case 'center':
          offset = this._width / 2
          break
      }

      ;(this.children as Text[]).forEach((text, index) => {
        text.family = this._family
        text.size = this._size
        text.leading = leading
        text.alignment = this._alignment
        text.fill = this._fill
        text.stroke = this._stroke
        text.linewidth = this._linewidth
        text.style = this._style
        text.weight = this._weight
        text.decoration = this._decoration
        text.baseline = this._baseline
        text.opacity = this._opacity
        text.visible = this._visible
        text.translation.set(offset, leading * index)
      })
    }

    (Two.Group.prototype as unknown as { _update (bubbles?: boolean): void })
      ._update.call(this, bubbles)

    return this
  },

  flagReset(): any {
    this._flagWrapping = this._flagStyle = false

    ;(Two.Group.prototype as unknown as { flagReset(): void })
      .flagReset.call(this)

    return this
  }
} as any)
