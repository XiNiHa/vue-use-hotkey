/**
 * Interface representing an hotkey.
 *
 * Register it by passing an array of objects in `useHotkey()` hook.
 */
export interface Hotkey {
  keys: string[]
  preventDefault?: boolean
  exact?: boolean
  repeat?: boolean
  handler: (keys: string[]) => any
}
