import { MASCOT_BRAND, MASCOT_CRAB, MASCOT_CUSTOM, MASCOT_DEEPY } from '../../constants'
import type { FeatureManifest } from '../../core/feature'

export default {
  id: 'mascot',
  order: 40,
  load: 'deferred',
  reads: ['composer'],
  contracts: ['chat.think-running', 'composer.fallback-panel', 'composer.seat', 'composer.stack', 'conversation.session', 'conversation.session-attribute'],
  pref: 'mascot',
  prefValues: [MASCOT_BRAND, MASCOT_CRAB, MASCOT_DEEPY, MASCOT_CUSTOM],
  stylesheets: [
    { file: 'crab.css', rank: 350 },
    { file: 'whale.css', rank: 360 },
    { file: 'custom.css', rank: 365 },
  ],
  settingsRows: [{
    tab: 'appearance',
    rank: 30,
    pref: 'mascot',
    title: 'mascotTitle',
    desc: 'mascotDesc',
    choiceLabels: { brand: 'mascotBrand', crab: 'mascotCrab', deepy: 'mascotDeepy', custom: 'mascotCustom', off: 'mascotOff' },
  }, {
    // It belongs to the mascot switch above it.
    tab: 'appearance',
    rank: 40,
    pref: 'mascotScope',
    parent: 'mascot',
    title: 'mascotScopeTitle',
    choiceLabels: { home: 'mascotScopeHome', all: 'mascotScopeAll' },
  }],
  cases: ['crab-states', 'deepy', 'custom-mascot', 'hero', 'studio']
} satisfies FeatureManifest
