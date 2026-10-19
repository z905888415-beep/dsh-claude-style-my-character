/** Transparent illustrated sheets retain their original RGBA PNG bytes. */
import fs from 'node:fs'
import path from 'node:path'
import Ajv from 'ajv'
import { PNG } from 'pngjs'

export const CUSTOM_MANIFEST = 'mascot/custom/manifest.json'

/** Build-time schema keeps incomplete or mistyped packs out of the bundle. */
function manifestValidator(animations) {
  return new Ajv({ allErrors: true }).compile({
    type: 'object',
    additionalProperties: false,
    required: ['version', 'columns', 'frameSize', 'displaySize', 'frameMs', 'sheets'],
    properties: {
      version: { const: 1 },
      columns: { const: 8 },
      frameSize: { type: 'integer', minimum: 1 },
      displaySize: { type: 'integer', minimum: 2, multipleOf: 2 },
      frameMs: { type: 'integer', minimum: 1 },
      sheets: {
        type: 'object',
        additionalProperties: false,
        required: animations,
        properties: Object.fromEntries(animations.map(name => [name, {
          type: 'object',
          additionalProperties: false,
          required: ['file', 'frames', 'still'],
          properties: {
            file: { const: `${name}.png` },
            frames: { type: 'integer', minimum: 1 },
            still: { type: 'integer', minimum: 0 },
          },
        }])),
      },
    },
  })
}

/** Validate cell dimensions and transparency, then claim the original assets. */
export function loadCustomMascot(assetsDir, plan, claimed, stateAnimations) {
  const file = path.join(assetsDir, CUSTOM_MANIFEST)
  const manifest = JSON.parse(fs.readFileSync(file, 'utf8'))
  const animations = [...new Set(Object.values(stateAnimations))]
  const validate = manifestValidator(animations)
  if (!validate(manifest)) {
    throw new Error(`build: ${CUSTOM_MANIFEST}: ${validate.errors.map(error => `${error.instancePath || '/'} ${error.message}`).join('; ')}`)
  }
  const urls = {}
  for (const name of animations) {
    const sheet = manifest.sheets[name]
    if (sheet.still >= sheet.frames) throw new Error(`build: custom ${name}: still must be smaller than frames`)
    const asset = `mascot/custom/${sheet.file}`
    const entry = plan.entries.get(asset)
    if (entry === undefined) throw new Error(`build: custom ${name}: ${asset} is missing`)
    const image = PNG.sync.read(entry.bytes)
    const width = manifest.frameSize * manifest.columns
    const height = manifest.frameSize * Math.ceil(sheet.frames / manifest.columns)
    if (image.width !== width || image.height !== height) {
      throw new Error(`build: custom ${name}: ${image.width}×${image.height} does not match ${width}×${height}`)
    }
    for (let frame = 0; frame < sheet.frames; frame++) {
      let transparent = false
      let visible = false
      const left = (frame % manifest.columns) * manifest.frameSize
      const top = Math.floor(frame / manifest.columns) * manifest.frameSize
      for (let y = top; y < top + manifest.frameSize && !(transparent && visible); y++) {
        for (let x = left; x < left + manifest.frameSize; x++) {
          const alpha = image.data[(y * image.width + x) * 4 + 3]
          transparent ||= alpha === 0
          visible ||= alpha > 0
          if (transparent && visible) break
        }
      }
      if (!transparent || !visible) throw new Error(`build: custom ${name} frame ${frame}: needs visible character pixels and a transparent background`)
    }
    claimed.add(asset)
    urls[name] = entry.url
  }
  return {
    manifest,
    urls: Object.fromEntries(Object.entries(stateAnimations).map(([state, animation]) => [state, urls[animation]])),
  }
}
