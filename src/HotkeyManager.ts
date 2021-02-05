import { Hotkey } from './types'

export class HotkeyManager {
  readonly registeredHotkeys: Record<string, Hotkey[]> = {}

  readonly pressedKeys = new Map<string, boolean>()

  constructor () {
    window.addEventListener('keydown', e => {
      this.pressedKeys.set(e.key, e.repeat)

      const keyComb = this.getKeyComb(Array.from(this.pressedKeys.keys()))
      this.registeredHotkeys[keyComb]?.forEach(hotkey => {
        if (!e.repeat || hotkey.repeat) {
          if (hotkey.preventDefault) e.preventDefault()

          hotkey.handler([...this.pressedKeys.keys()])
        }
      })
    })
    window.addEventListener('keyup', e => {
      if (this.pressedKeys.has(e.key)) {
        this.pressedKeys.delete(e.key)
      }
    })
  }

  getKeyComb (keys: string[]): string {
    return keys.sort().join(' ')
  }

  registerHotkey (hotkey: Hotkey): void {
    const keyComb = this.getKeyComb([...hotkey.keys])
    if (!this.registeredHotkeys[keyComb]) {
      this.registeredHotkeys[keyComb] = []
    }
    this.registeredHotkeys[keyComb].push(hotkey)
  }

  removeHotkey (hotkey: Hotkey): boolean {
    const keyComb = this.getKeyComb([...hotkey.keys])
    const index = this.registeredHotkeys[keyComb]?.indexOf(hotkey) ?? -1

    if (index !== -1) {
      this.registeredHotkeys[keyComb].splice(index, 1)
      return true
    }
    return false
  }
}
