import Two from 'two.js'
import dat from 'dat.gui'
import { MultilineText } from '../src'

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
  alignment: 'start',
  baseline: 'middle',
  width: 500,
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

const gui = new dat.GUI()

gui.add(multilineText, 'width', 0, 800, 1)
gui.add(multilineText, 'mode', ['normal', 'pre', 'nowrap'])
gui.add(multilineText, 'measure', ['font', 'monospace', 'length']).onChange(() => { (rect as any).visible = multilineText.measure !== 'length' })
gui.add(multilineText, 'family')
gui.add(multilineText, 'size', 1, 50, 0.1)
const leadingGUI = gui.add(multilineText, 'leading', 0, 5, 0.01)
const absoluteLeadingGUI = gui.add(multilineText, 'absoluteLeading')
gui.add(multilineText, 'alignment', ['start', 'end', 'center'])
gui.addColor(multilineText, 'fill')
const strokeGUI = gui.addColor(multilineText, 'stroke')
const linewidthGUI = gui.add(multilineText, 'linewidth', 0, 10)
gui.add(multilineText, 'style', ['normal', 'italic'])
gui.add(multilineText, 'weight', 100, 900, 100)
gui.add(multilineText, 'decoration', ['none', 'underline', 'strikethrough'])
gui.add(multilineText, 'baseline', ['middle', 'baseline', 'top'])
gui.add(multilineText, 'opacity', 0, 1, 0.001)
gui.add(multilineText, 'visible')

absoluteLeadingGUI.onChange(() => {
  if (multilineText.absoluteLeading) {
    leadingGUI.max(250)
    leadingGUI.setValue(Math.min(250, multilineText.leading * multilineText.size))
  } else {
    leadingGUI.max(5)
    leadingGUI.setValue(Math.min(5, multilineText.leading / multilineText.size))
  }
})

linewidthGUI.onChange(() => {
  if (multilineText.linewidth) {
    strokeGUI.setValue(multilineText.stroke.replace(/,[^,]+$/, ', 1)'))
  } else {
    strokeGUI.setValue(multilineText.stroke.replace(/,[^,]+$/, ', 0)'))
  }
})

const text = `
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint.
`.trim()

let interval = setInterval(() => {
  multilineText.value = text.slice(0, multilineText.value.length + 1)
  if (multilineText.value.length === text.length) {
    clearInterval(interval)
  }
}, 40)
