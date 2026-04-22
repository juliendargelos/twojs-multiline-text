import Two from 'two.js'
import wrap from 'word-wrapper'

import type {
  AlignmentProperties,
  StyleProperties,
  DecorationProperties,
  DirectionProperties,
  BaselineProperties
} from 'two.js/src/text'

import { Shape } from 'two.js/src/shape'

type OptionallyOffscreenCanvasRenderingContext2D = (
  CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
)

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
  direction: {
    enumerable: true,
    get(this: MultilineText) { return this._direction },
    set(this: MultilineText, v: DirectionProperties) { this._direction = v; this._flagStyle = true }
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
  protected _flagWrapping: boolean = true
  protected _flagStyle: boolean = true
  protected _width!: number
  protected _measure!: 'font' | 'monospace' | 'length'
  protected _mode!: 'normal' | 'pre' | 'nowrap'
  protected _value!: string
  protected _family!: string
  protected _size!: number
  protected _weight!: number
  protected _style!: StyleProperties
  protected _leading!: number
  protected _absoluteLeading!: boolean
  protected _alignment!: AlignmentProperties
  protected _direction!: DirectionProperties
  protected _decoration!: DecorationProperties
  protected _baseline!: BaselineProperties
  protected declare _fill: string
  protected declare _stroke: string
  protected declare _linewidth: number
  protected declare _opacity: number
  protected declare _visible: boolean

  public declare width: number
  public declare measure: 'font' | 'monospace' | 'length'
  public declare mode: 'normal' | 'pre' | 'nowrap'
  public declare value: string
  public declare family: string
  public declare size: number
  public declare weight: number
  public declare style: StyleProperties
  public declare leading: number
  public declare absoluteLeading: boolean
  public declare alignment: AlignmentProperties
  public declare direction: DirectionProperties
  public declare fill: string
  public declare stroke: string
  public declare linewidth: number
  public declare decoration: DecorationProperties
  public declare baseline: BaselineProperties
  public declare opacity: number
  public declare visible: boolean

  public constructor (message: string, x: number = 0, y: number = 0, {
    width = Infinity,
    measure = 'font',
    mode = 'normal',
    family = 'sans-serif',
    size = 13,
    weight = 500,
    style = 'normal',
    leading = 1.3,
    absoluteLeading = false,
    alignment = 'left',
    direction = 'ltr',
    fill = '#000',
    stroke = 'transparent',
    linewidth = 1,
    decoration = 'none',
    baseline = 'baseline',
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
    direction?: DirectionProperties
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
      let value: any
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
    this.direction = direction
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

  protected get context(): OptionallyOffscreenCanvasRenderingContext2D {
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

  protected get _measureMonospace(): (
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
        Math.floor(width / charWidth),
        Math.floor((end - start) * charWidth)
      )
    })
  }

  protected _measureLength = (
    text: string,
    start: number,
    end: number,
    width: number
  ): { start: number, end: number } => ({
    start,
    end: start + Math.min(width, end - start)
  })

  protected _measureFont = (
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

  protected _prepareMeasureContext(): void {
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
  _update(this: MultilineText, bubbles: boolean): any {
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

      const texts = this.children as unknown as Text[]
      const lines = wrap
        .lines(this._value, {
          measure,
          width: this._width,
          mode: this._mode
        })
        .map(({ start, end }: { start: number, end: number }) => this._value.slice(start, end))

      while (texts.length > lines.length) {
        this.remove(texts[0] as unknown as Shape)
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

      let orientedAlignment: AlignmentProperties = this._alignment

      if (this._direction === 'rtl') {
        switch (this._alignment) {
          case 'left':
            orientedAlignment = 'right'
            break

          case 'right':
            orientedAlignment = 'left'
            break
        }
      }

      switch (this._alignment) {
        case 'right':
          offset = this._width
          break

        case 'center':
          offset = this._width / 2
          break
      }

      ;(this.children as unknown as (Text & {
        direction: DirectionProperties
      })[]).forEach((text, index) => {
        text.family = this._family
        text.size = this._size
        text.leading = leading
        text.alignment = orientedAlignment
        text.direction = this._direction
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
