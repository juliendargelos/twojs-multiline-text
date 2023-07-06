# twojs-multiline-text

[![test](https://github.com/juliendargelos/twojs-multiline-text/workflows/test/badge.svg?branch=master)](https://github.com/juliendargelos/twojs-multiline-text/actions?workflow=test)
[![build](https://github.com/juliendargelos/twojs-multiline-text/workflows/build/badge.svg?branch=master)](https://github.com/juliendargelos/twojs-multiline-text/actions?workflow=build)
[![version](https://img.shields.io/github/package-json/v/juliendargelos/twojs-multiline-text)](https://github.com/juliendargelos/twojs-multiline-text)

Provides a `MultilineText` class fitted for Two.js. It has the same interface as the built-in [`Two.Text`](https://two.js.org/docs/text) class but allows for multiline text by handling line breaks and word wrapping using [word-wrapper](https://github.com/mattdesl/word-wrapper).

[Go to the demo](https://julien.gl/twojs-multiline-text) to see it in action.

### Install

```bash
npm i twojs-multiline-text --save
```

You can also use it from CDN:

```html
<script src="https://unpkg.com/two.js"></script>
<script src="https://unpkg.com/twojs-multiline-text"></script>
<script>
  // MutilineText class available in global scope as TwojsMultilineText.MultilineText
</script>
```

Use skypack CDN to import the native es module:

```html
<script type="module">
  import { MultilineText } from 'https://cdn.skypack.dev/twojs-multiline-text@^1.0.0'
</script>
```

### Usage

```typescript
import Two from 'two.js'
import { MultilineText } from 'twojs-multiline-text'

const two = new Two().appendTo(document.body)

const textContent = `
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation.

Ullamco laboris nisi ut aliquip ex ea commodo
consequat.
`.trim()

const multilineText = new MultilineText(textContent, 0, 0, {
  // These are the default values
  width: Infinity,
  measure: 'font',
  mode: 'normal',
  family: 'sans-serif',
  size: 13,
  weight: 500,
  style: 'normal',
  leading: 1.2,
  absoluteLeading: false,
  alignment: 'middle',
  fill: '#000',
  stroke: 'transparent',
  linewidth: 1,
  decoration: 'none',
  baseline: 'middle',
  opacity: 1,
  visible: true
})

// Like in Two.Text, text content can be changed from the value attribute:
multilineText.value = `another text`

two.add(multilineText)
```

The `MultilineText` class has the same options as [`Two.Text`](https://two.js.org/docs/text), they can be set at instantiation or later from the instance (changes are dynamically reflected).

There are extra options for measuring and wrapping behaviour:

- `width` The maximum width of the text. Interpreted depending on the value of `measure` option.
- `measure` Name of the method to use to measure text, can be one of the following:
    + `'font'` Actually measures the text by taking in account the font shape. Interprets the `width` option as a value in pixels.
    + `'monospace'` Behaves the same as `'font'` except that only one character is measured when updating text content or style. This can be used to improve performances when the font is monospaced and the text is frequently updated.
    + '`length`' Only counts the number of characters. Interprets the `width` option as number of characters. This is the most performant method of measuring.
- `mode` Name of the method to use to wrap text. It is directly passed to the `wrap` function from [word-wrapper](https://github.com/mattdesl/word-wrapper). Can be one of the following:
    + `'normal'` Normal wrapping.
    + `'pre'` Maintains spacing.
    + `'nowrap'` Collapse whitespace but only break on newline characters.
