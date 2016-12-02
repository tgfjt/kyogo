const html = require('choo/html')

module.exports = (state, prev, send) => html`
  <div>
    ${state.windows.urls.length === 0 ? 'Nothing to show you !' : ''}
    ${state.windows.urls.map((u, i) => {
      return html`<webview id="window${i}" src="${u}" useragent="${state.windows.ua}"></webview>`
    })}
  </div>
`
