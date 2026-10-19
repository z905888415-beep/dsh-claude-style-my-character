import { expect, test } from 'vitest'
import { CUSTOM_ANIMATIONS, customSheetTable } from './custom-sheets'
import type { CustomMascotManifest } from './custom-sheets'
import { DEEPY_SHEETS } from './sheets'

test('every state the shared player uses resolves to one of the eight supplied animations', () => {
  expect(Object.keys(CUSTOM_ANIMATIONS).sort()).toEqual(Object.keys(DEEPY_SHEETS).sort())
  expect([...new Set(Object.values(CUSTOM_ANIMATIONS))].sort()).toEqual([
    'conducting', 'error', 'happy', 'idle', 'notification', 'sleeping', 'thinking', 'typing',
  ])
  expect(CUSTOM_ANIMATIONS.compacting).toBe('thinking')
  expect(CUSTOM_ANIMATIONS.waking).toBe('idle')
  expect(CUSTOM_ANIMATIONS['poke-left']).toBe('happy')
  expect(CUSTOM_ANIMATIONS['poke-right']).toBe('happy')
  expect(CUSTOM_ANIMATIONS.drag).toBe('notification')
})

test('aliased states keep their source frame count and still frame at the chosen display size', () => {
  const names = [...new Set(Object.values(CUSTOM_ANIMATIONS))]
  const manifest: CustomMascotManifest = {
    version: 1, columns: 8, frameSize: 256, displaySize: 96, frameMs: 50,
    sheets: Object.fromEntries(names.map((name, index) => [name, {
      file: `${name}.png`, frames: 40 + index, still: index,
    }])) as CustomMascotManifest['sheets'],
  }
  const table = customSheetTable(manifest)
  for (const [state, animation] of Object.entries(CUSTOM_ANIMATIONS)) {
    expect(table[state]).toEqual({
      frames: manifest.sheets[animation].frames,
      still: manifest.sheets[animation].still,
      box: [0, 0, 48, 48],
    })
  }
  manifest.frameSize = 320
  expect(customSheetTable(manifest)).toEqual(table)
})
