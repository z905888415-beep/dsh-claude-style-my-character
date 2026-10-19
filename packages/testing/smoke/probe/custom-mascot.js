/** The supplied character's eight raster sheets, through the actual player. */
(function () {
  var probe = window.__dshSmokeProbe
  probe.step(async function () {
    await probe.onlyFor(['custom-mascot'], async function () {
      var report = { animations: {} }
      probe.report.custom = report
      var driver = window.__deepy
      var read = function () { return probe.mascotState('custom') }
      async function play(name) {
        var shown = await probe.until(read, function (all) {
          var last = all[all.length - 1]
          return last !== null && last.ready && last.animation === name
        }, 'custom character playing ' + name)
        var first = shown[shown.length - 1]
        var moving = await probe.until(read, function (all) {
          var last = all[all.length - 1]
          return last !== null && last.animation === name && last.frame !== first.frame
        }, 'custom character advancing ' + name)
        var after = moving[moving.length - 1]
        report.animations[name] = { first: first, after: after }
        return after
      }

      var hero = document.createElement('div')
      hero.setAttribute('data-phase', 'hero')
      document.body.appendChild(hero)
      report.light = await play('idle')
      report.brand = document.body.getAttribute('data-dsh-claude-brand')
      report.mascot = document.body.getAttribute('data-dsh-claude-mascot')
      report.otherMascots = document.querySelectorAll('.dsh-claude-crab, .dsh-claude-deepy').length
      document.body.setAttribute('data-ds-dark-theme', '')
      report.dark = read()
      document.body.removeAttribute('data-ds-dark-theme')

      hero.remove()
      var conversation = document.createElement('div')
      conversation.setAttribute('data-phase', 'active')
      conversation.setAttribute('data-conversation-scroll', '')
      conversation.innerHTML = '<div data-conversation-content data-conversation-session="smoke-deepy"><div data-composer-seat><div class="_composerStack_x_1"><div class="_inputBar_x_1">input</div></div></div></div>'
      document.body.appendChild(conversation)
      await probe.until(read, function (all) {
        var last = all[all.length - 1]
        return last !== null && last.place === 'stack'
      }, 'custom character standing in the conversation')
      driver.setStatus('smoke-deepy', { running: true })
      driver.setTurn('reasoning')
      await play('thinking')
      driver.setTurn('text')
      await play('typing')
      driver.setSubagents(['custom-child-one', 'custom-child-two'])
      driver.setStatus('custom-child-one', { running: true })
      driver.setStatus('custom-child-two', { running: true })
      await play('conducting')
      driver.setStatus('smoke-deepy', { running: true, pendingInteraction: { kind: 'approval', key: 'custom' } })
      await play('notification')
      driver.emit({ type: 'tool/result', seq: 1, time: Date.now(), data: { turn: 1, step: 1, message: { isError: true } } })
      await play('error')

      // Expire the short result moments and the quiet minute through the same
      // event-driven refresh the existing mascot walk uses.
      var clock = Date.now
      var ahead = 6000
      Date.now = function () { return clock.call(Date) + ahead }
      try {
        driver.setStatus('smoke-deepy', { running: false })
        driver.setStatus('custom-child-one', { running: false })
        driver.setStatus('custom-child-two', { running: false })
        driver.setTurn(null)
        driver.emit({ type: 'turn/end', seq: 2, time: Date.now(), data: { reason: { kind: 'completed' } } })
        await play('happy')
        ahead += 6000
        driver.setStatus('smoke-deepy', { running: false })
        await probe.until(read, function (all) {
          var last = all[all.length - 1]
          return last !== null && last.animation === 'idle'
        }, 'custom character returning to idle')
        ahead += 61000
        driver.setStatus('smoke-deepy', { running: false })
        await play('sleeping')
        window.__pushForm({ motion: 'reduced' })
        await probe.sleep(150)
        report.still = { before: read() }
        await probe.sleep(150)
        report.still.after = read()
      } finally {
        Date.now = clock
      }
      window.__pushForm({ mascot: 'off' })
      await probe.until(read, function (all) { return all[all.length - 1] === null }, 'custom character removed by Off')
      report.off = read()
      report.anchors = document.querySelectorAll('[data-dsh-claude-custom-anchor]').length
      conversation.remove()
    })
  })
})()
