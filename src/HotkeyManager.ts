import { Hotkey } from './types'

export class HotkeyManager {
  readonly registeredHotkeys: Hotkey[] = []

  readonly pressedKeys = new Set<string>()

  constructor () {
    window.addEventListener('keydown', e => {
      this.pressedKeys.add(e.key)

      this.registeredHotkeys.forEach(hotkey => {
        if ((hotkey.exact == null || !hotkey.exact) || hotkey.keys.length === this.pressedKeys.size) {
          if (hotkey.keys.reduce((result, key) => result && this.pressedKeys.has(key), true)) {
            if (hotkey.preventDefault != null && hotkey.preventDefault) e.preventDefault()

            hotkey.handler([...this.pressedKeys])
          }
        }
      })
    })
    window.addEventListener('keyup', e => {
      if (this.pressedKeys.has(e.key)) {
        this.pressedKeys.delete(e.key)
      }
    })
  }

  registerHotkey (hotkey: Hotkey): void {
    this.registeredHotkeys.push(hotkey)
  }

  removeHotkey (hotkey: Hotkey): boolean {
    const index = this.registeredHotkeys.indexOf(hotkey)

    if (index !== -1) {
      this.registeredHotkeys.splice(index, 1)
      return true
    }
    return false
  }
}
