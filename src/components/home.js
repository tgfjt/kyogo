const html = require('choo/html')

const ondomready = require('../lib/webview-domready')

module.exports = (state, prev, send) => html`
  <div>
    ${state.windows.urls.length === 0 ? 'Nothing to show you !' : ''}
    ${state.windows.urls.map((u, i) => {
      const webview = html`<webview
        id="window${i}"
        src="${u}"
        useragent="${state.windows.ua}"
        style="width:${(100 / state.windows.urls.length).toPrecision(4)}vw">
      </webview>`

      ondomready(webview, () => {
        if (!state.windows.autoreloadEnabled || !state.windows.isHome) return;

        setTimeout(() => {
          console.log('setTimeout')
          webview.reload()
        }, state.windows.autoreloadInterval * 100)
      })
      return webview
    })}
  </div>
`
