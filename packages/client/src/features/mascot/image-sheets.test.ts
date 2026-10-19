import { expect, test } from 'vitest'
import { createMascotImageSheets } from './image-sheets'

/** A real browser-generated RGBA image exercises the browser's own decoder. */
function sheetAddress() {
  const canvas = document.createElement('canvas')
  canvas.width = 2
  canvas.height = 2
  const context = canvas.getContext('2d')
  if (context === null) throw new Error('browser has no 2D canvas context')
  context.fillStyle = '#4d6bfe'
  context.fillRect(0, 0, 1, 1)
  return canvas.toDataURL('image/png')
}

test('states using one sheet share its decode and paint the original image address', async () => {
  const address = sheetAddress()
  let decoded = 0
  let loaded: () => void
  const completion = new Promise<void>(resolve => { loaded = resolve })
  const sheets = createMascotImageSheets({ idle: address, waking: address }, 'Character', '--character-sheet', () => {
    decoded++
    loaded()
  })
  expect(sheets.ready('idle')).toBe(false)
  expect(sheets.ready('waking')).toBe(false)
  await completion
  expect(sheets.ready('idle')).toBe(true)
  expect(sheets.ready('waking')).toBe(true)
  expect(decoded).toBe(1)
  const element = document.createElement('span')
  sheets.paint(element.style, 'waking')
  expect(element.style.getPropertyValue('--character-sheet')).toBe(`url("${address}")`)
  sheets.dispose()
})

test('an unknown animation fails where it is requested', () => {
  const sheets = createMascotImageSheets({}, 'Character', '--character-sheet', () => {})
  expect(() => sheets.ready('missing')).toThrow('Character has no sheet for "missing"')
  sheets.dispose()
})
