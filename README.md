# vue-use-hotkey

Hotkey hooks for Vue 2/3.

## Installation

```sh
npm install vue-use-hotkey # Using NPM
yarn add vue-use-hotkey # Using yarn
```

## Usage

```js
import { defineComponent } from 'vue' // '@vue/composition-api' if Vue 2
import { useHotkey } from 'vue-use-hotkey'

export default defineComponent({
  setup () {
    useHotkey([
      {
        key: ['Control', 'Space'],
        preventDefault: true,
        handler () {
          console.log('Sweet!')
        }
      }
    ])
  }
})
```
