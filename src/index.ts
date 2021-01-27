import { onUnmounted } from 'vue-demi'
import { HotkeyManager } from './HotkeyManager'
import { Hotkey } from './types'

const manager = new HotkeyManager()

/**
 * Register hotkeys.
 * Hotkeys are automatically removed when the component gets unmounted.
 *
 * @param hotkeys Hotkeys to register.
 * @returns Array of functions for removing corresponding hotkeys.
 */
export function useHotkey (hotkeys: Hotkey[]): Array<() => void> {
  hotkeys.forEach(hk => manager.registerHotkey(hk))

  onUnmounted(() => hotkeys.forEach(hk => manager.removeHotkey(hk)))

  return hotkeys.map(hk => () => { manager.removeHotkey(hk) })
}
