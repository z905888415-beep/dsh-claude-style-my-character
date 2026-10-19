import type { MascotSheet } from './mascot-player'

/** Each player state names one of the eight supplied character animations. */
export const CUSTOM_ANIMATIONS = {
  idle: 'idle',
  'idle-look': 'idle',
  'idle-spout': 'idle',
  thinking: 'thinking',
  typing: 'typing',
  music: 'conducting',
  conducting: 'conducting',
  building: 'typing',
  error: 'error',
  happy: 'happy',
  notification: 'notification',
  compacting: 'thinking',
  sleeping: 'sleeping',
  waking: 'idle',
  'poke-left': 'happy',
  'poke-right': 'happy',
  tickle: 'happy',
  drag: 'notification',
} as const

export type CustomAnimation = typeof CUSTOM_ANIMATIONS[keyof typeof CUSTOM_ANIMATIONS]

export interface CustomMascotManifest {
  version: 1
  columns: 8
  frameSize: number
  displaySize: number
  frameMs: number
  sheets: Record<CustomAnimation, { file: string, frames: number, still: number }>
}

/** The player draws one logical unit at 2px, independent of source resolution. */
export function customSheetTable(manifest: CustomMascotManifest): Record<string, MascotSheet> {
  const size = manifest.displaySize / 2
  return Object.fromEntries(Object.entries(CUSTOM_ANIMATIONS).map(([state, animation]) => {
    const sheet = manifest.sheets[animation]
    return [state, { frames: sheet.frames, still: sheet.still, box: [0, 0, size, size] }]
  }))
}
