import Two from 'two.js'
import { Pane } from 'tweakpane'
import { MultilineText } from '../src/multiline-text'

const two = new Two({
  type: Two.Types.canvas,
  autostart: true,
  fullscreen: true
}).appendTo(document.body)

const container = new Two.Group()
container.translation.set(20, 20)

const multilineText = new MultilineText('', 0, 0, {
  size: 36,
  weight: 900,
  alignment: 'left',
  baseline: 'middle',
  width: 500,
  fill: 'rgba(0, 0, 0, 1)',
  stroke: 'rgba(255, 0, 0, 0)',
  linewidth: 0
})

const rect = new Two.Path([
  new Two.Anchor(0, 0, 0, 0, 0, 0, Two.Commands.line),
  new Two.Anchor(0, 0, 0, 0, 0, 0, Two.Commands.line),
  new Two.Anchor(0, 0, 0, 0, 0, 0, Two.Commands.line),
  new Two.Anchor(0, 0, 0, 0, 0, 0, Two.Commands.line)
], true, false, false)

rect.stroke = 'rgba(255, 0, 0, .2)'
rect.linewidth = 1

two.bind('update', () => {
  const leading = multilineText.computedLeading
  const width = multilineText.width
  const height = multilineText.children.length * leading

  rect.vertices[1].x = rect.vertices[2].x = width
  rect.vertices[2].y = rect.vertices[3].y = height

  multilineText.translation.y = leading / 2
})

container.add(rect, multilineText)
two.add(container)

const pane = new Pane()

pane.addBinding(multilineText, 'width', { min: 0, max: 800, step: 1 })
pane.addBinding(multilineText, 'mode', { options: { normal: 'normal', pre: 'pre', nowrap: 'nowrap' } })
pane.addBinding(multilineText, 'measure', { options: { font: 'font', monospace: 'monospace', length: 'length' } })
  .on('change', () => { (rect as any).visible = multilineText.measure !== 'length' })
pane.addBinding(multilineText, 'family')
pane.addBinding(multilineText, 'size', { min: 1, max: 50, step: 0.1 })
let leadingBinding = pane.addBinding(multilineText, 'leading', { min: 0, max: 5, step: 0.01 })
pane.addBinding(multilineText, 'absoluteLeading')
  .on('change', () => {
    leadingBinding.dispose()
    if (multilineText.absoluteLeading) {
      multilineText.leading = Math.min(250, multilineText.leading * multilineText.size)
      leadingBinding = pane.addBinding(multilineText, 'leading', { min: 0, max: 250, step: 0.1, index: 5 })
    } else {
      multilineText.leading = Math.min(5, multilineText.leading / multilineText.size)
      leadingBinding = pane.addBinding(multilineText, 'leading', { min: 0, max: 5, step: 0.01, index: 5 })
    }
  })
pane.addBinding(multilineText, 'alignment', { options: { left: 'left', right: 'right', center: 'center' } })
pane.addBinding(multilineText, 'direction', { options: { ltr: 'ltr', rtl: 'rtl' } })
pane.addBinding(multilineText, 'fill')

const strokeProxy = { stroke: 'rgba(255, 0, 0, 1)' }

const applyStroke = () => {
  multilineText.stroke = multilineText.linewidth
    ? strokeProxy.stroke
    : strokeProxy.stroke.replace(/,[^,]+\)$/, ', 0)')
}

pane.addBinding(strokeProxy, 'stroke')
  .on('change', applyStroke)

pane.addBinding(multilineText, 'linewidth', { min: 0, max: 10 })
  .on('change', applyStroke)
pane.addBinding(multilineText, 'style', { options: { normal: 'normal', italic: 'italic' } })
pane.addBinding(multilineText, 'weight', { min: 100, max: 900, step: 100 })
pane.addBinding(multilineText, 'decoration', { options: { none: 'none', underline: 'underline', strikethrough: 'strikethrough' } })
pane.addBinding(multilineText, 'baseline', { options: { top: 'top', middle: 'middle', bottom: 'bottom', baseline: 'baseline' } })
pane.addBinding(multilineText, 'opacity', { min: 0, max: 1, step: 0.001 })
pane.addBinding(multilineText, 'visible')

const text = `
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint.
`.trim()

const interval = setInterval(() => {
  multilineText.value = text.slice(0, multilineText.value.length + 1)
  if (multilineText.value.length === text.length) {
    clearInterval(interval)
  }
}, 40)
