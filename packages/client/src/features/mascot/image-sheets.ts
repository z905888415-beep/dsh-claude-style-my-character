/**
 * Decode routed character sheets before painting. Aliased states share a load
 * by address, so the eight source animations are decoded once per character.
 */
export function createMascotImageSheets(addresses: Record<string, string>, name: string, property: string, onReady: () => void) {
  const sheets = new Map<string, 'loading' | 'ready' | 'failed'>()
  let alive = true

  function url(key: string) {
    const address = addresses[key]
    if (address === undefined) throw new Error(`dsh-claude-style: ${name} has no sheet for "${key}"`)
    return address
  }

  function ready(key: string) {
    const address = url(key)
    const known = sheets.get(address)
    if (known !== undefined) return known === 'ready'
    sheets.set(address, 'loading')
    const image = new Image()
    image.src = address
    const settle = (ok: boolean) => {
      if (!alive || sheets.get(address) !== 'loading') return
      sheets.set(address, ok ? 'ready' : 'failed')
      if (ok) onReady()
      // A failed sheet is isolated from the rest of the character's states.
      // The host serves it, so an update needs a host restart to expose it.
      else console.warn(`[dsh-claude-style] ${name}'s "${key}" sheet did not load from ${address}; restart the host after an update.`)
    }
    image.decode().then(() => settle(true), () => settle(false))
    return false
  }

  function failed(key: string) {
    return sheets.get(url(key)) === 'failed'
  }

  function paint(style: CSSStyleDeclaration, key: string) {
    style.setProperty(property, `url("${url(key)}")`)
  }

  function dispose() {
    alive = false
    sheets.clear()
  }

  return { ready, failed, paint, dispose }
}
