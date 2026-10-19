import { MASCOT_CRAB, MASCOT_CUSTOM, MASCOT_DEEPY, MASCOT_SCOPE_ALL } from '../../constants'
import { readPrefs, resolveMascot } from '../../core/prefs'
import { createMascotCrab } from './crab'
import { createMascotWhale } from './whale'
import { createMascotCustom } from './custom'
import type { HostContext } from '@dsh-claude-style/engine/host'
import type { FeatureUi } from '../../core/feature'
import type manifest from './mascot.manifest'

/**
 * The mascot on the composer: Claude Code's pixel crab
 * (packages/client/src/features/mascot/crab.ts) or Deepy, the DeepSeek brand's pixel whale
 * (packages/client/src/features/mascot/whale.ts), or the user's illustrated
 * character (custom.ts), played by the agent's state
 * (packages/client/src/features/mascot/mascot-player.ts).
 *
 * Which one is out is the mascot preference, resolved onto <body> as
 * MASCOT_ATTR: "follow the brand" puts the crab under Claude and Deepy
 * under DeepSeek, and the reader may pick a character, or none. Where it stands
 * is the "where it appears" preference: the home page alone, or the home
 * page and the conversation. The other character is released, so only one
 * mascot is ever on the page.
 */
export function install(ctx: HostContext, ui: FeatureUi<typeof manifest>) {
  const crab = createMascotCrab(ctx, ui)
  const whale = createMascotWhale(ctx, ui)
  const custom = createMascotCustom(ctx, ui)

  function sync() {
    const prefs = readPrefs()
    const mascot = resolveMascot(prefs)
    const conversation = prefs.mascotScope === MASCOT_SCOPE_ALL
    if (mascot === MASCOT_CRAB) crab.sync(conversation)
    else crab.release()
    if (mascot === MASCOT_DEEPY) whale.sync(conversation)
    else whale.release()
    if (mascot === MASCOT_CUSTOM) custom.sync(conversation)
    else custom.release()
  }

  function onActivity() {
    crab.onActivity()
    whale.onActivity()
    custom.onActivity()
  }

  ui.mascot = { sync, onActivity }

  return () => {
    crab.dispose()
    whale.dispose()
    custom.dispose()
    delete ui.mascot
  }
}
