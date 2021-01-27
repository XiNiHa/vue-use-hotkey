/**
 * Interface representing an hotkey.
 *
 * Register it by passing an array of objects in `useHotkey()` hook.
 */
export interface Hotkey {
  /**
   * List of keys to trigger the hotkey.
   *
   * The names of the keys should be matched with the ones from `KeyboardEvent`.
   * These can be found on the {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values|MDN Docs}.
   */
  keys: string[]
  /**
   * `event.preventDefault()` is called if set to `true`.
   */
  preventDefault?: boolean
  /**
   * If set to `true`, the hotkey gets triggered only when the pressed keys matches exactly with the keys set.
   */
  exact?: boolean
  /**
   * If set to `true`, the hotkey gets triggered with repeated(holding the key) inputs.
   */
  repeat?: boolean
  /**
   * The event handler.
   *
   * @param keys List of keys that was pressed.
   */
  handler: (keys: string[]) => any
}
