import { fireEvent, render } from '@testing-library/vue'
import { useHotkey } from '../src'

test('hotkey works', async () => {
  let triggered = false

  const { container } = render({
    template: '<div></div>',
    setup () {
      useHotkey([
        {
          keys: ['Control', 'b'],
          handler () {
            triggered = true
          }
        }
      ])
    }
  })

  expect(triggered).toBeFalsy()

  await fireEvent.keyDown(container, { key: 'Control' })
  await fireEvent.keyDown(container, { key: 'b' })

  expect(triggered).toBeTruthy()

  await fireEvent.keyUp(container, { key: 'Control' })
  await fireEvent.keyUp(container, { key: 'b' })
})

test('hotkey gets removed when component unmounts', async () => {
  let triggered = false

  const { container, unmount } = render({
    template: '<div></div>',
    setup () {
      useHotkey([
        {
          keys: ['Control', 'b'],
          handler () {
            triggered = true
          }
        }
      ])
    }
  })

  expect(triggered).toBeFalsy()

  unmount()

  await fireEvent.keyDown(container, { key: 'Control' })
  await fireEvent.keyDown(container, { key: 'b' })

  expect(triggered).toBeFalsy()

  await fireEvent.keyUp(container, { key: 'Control' })
  await fireEvent.keyUp(container, { key: 'b' })
})

test('removing hotkey with returned function works', async () => {
  let triggered = false

  const { container } = render({
    template: '<div></div>',
    setup () {
      const [removeHotkey] = useHotkey([
        {
          keys: ['Control', 'b'],
          handler () {
            triggered = true
          }
        }
      ])

      removeHotkey()
    }
  })

  expect(triggered).toBeFalsy()

  await fireEvent.keyDown(container, { key: 'Control' })
  await fireEvent.keyDown(container, { key: 'b' })

  expect(triggered).toBeFalsy()

  await fireEvent.keyUp(container, { key: 'Control' })
  await fireEvent.keyUp(container, { key: 'b' })
})

test('setting repeat to true works', async () => {
  let timesTriggered = 0

  const { container } = render({
    template: '<div></div>',
    setup () {
      useHotkey([
        {
          keys: ['Control', 'b'],
          repeat: true,
          handler () {
            timesTriggered += 1
          }
        }
      ])
    }
  })

  expect(timesTriggered).toBe(0)

  await fireEvent.keyDown(container, { key: 'Control' })
  await fireEvent.keyDown(container, { key: 'b' })

  expect(timesTriggered).toBe(1)

  await fireEvent.keyDown(container, { key: 'b', repeat: true })
  await fireEvent.keyDown(container, { key: 'b', repeat: true })
  await fireEvent.keyDown(container, { key: 'b', repeat: true })
  await fireEvent.keyDown(container, { key: 'b', repeat: true })
  await fireEvent.keyDown(container, { key: 'b', repeat: true })

  expect(timesTriggered).toBe(6)

  await fireEvent.keyUp(container, { key: 'Control' })
  await fireEvent.keyUp(container, { key: 'b' })
})

test('setting repeat to false works', async () => {
  let timesTriggered = 0

  const { container } = render({
    template: '<div></div>',
    setup () {
      useHotkey([
        {
          keys: ['Control', 'b'],
          repeat: false,
          handler () {
            timesTriggered += 1
          }
        }
      ])
    }
  })

  expect(timesTriggered).toBe(0)

  await fireEvent.keyDown(container, { key: 'Control' })
  await fireEvent.keyDown(container, { key: 'b' })

  expect(timesTriggered).toBe(1)

  await fireEvent.keyDown(container, { key: 'b', repeat: true })
  await fireEvent.keyDown(container, { key: 'b', repeat: true })
  await fireEvent.keyDown(container, { key: 'b', repeat: true })
  await fireEvent.keyDown(container, { key: 'b', repeat: true })
  await fireEvent.keyDown(container, { key: 'b', repeat: true })

  expect(timesTriggered).toBe(1)

  await fireEvent.keyUp(container, { key: 'Control' })
  await fireEvent.keyUp(container, { key: 'b' })
})
