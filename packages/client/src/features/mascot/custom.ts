import { CUSTOM_MASCOT } from 'virtual:dsh-claude-style/generated'
import { createMascotImageSheets } from './image-sheets'
import { createMascotPlayer } from './mascot-player'
import { customSheetTable } from './custom-sheets'
import type { HostContext } from '@dsh-claude-style/engine/host'
import type { FeatureUi } from '../../core/feature'
import type manifest from './mascot.manifest'

/** The user's illustrated character, drawn from transparent raster sheets. */
export function createMascotCustom(ctx: HostContext, ui: FeatureUi<typeof manifest>) {
  return createMascotPlayer(ctx, ui, {
    name: 'custom',
    sheets: customSheetTable(CUSTOM_MASCOT.manifest),
    frameMs: CUSTOM_MASCOT.manifest.frameMs,
    displaySize: CUSTOM_MASCOT.manifest.displaySize,
    extras: ['idle-look', 'idle-spout'],
    createSheets(onReady) {
      return createMascotImageSheets(CUSTOM_MASCOT.urls, 'My Character', '--dsh-claude-custom-sheet', onReady)
    },
  })
}
