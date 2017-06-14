const html = require('choo/html')

module.exports = (state, emit) => html`
  <div>
    ${state.screen.urls.length === 0 ? 'Nothing to show you !' : ''}
    ${state.screen.urls.map((u, i) => {
      return html`<webview id="window${i}" src="${u}" useragent="${state.screen.ua}" style="width:${(100 / state.screen.urls.length).toPrecision(4)}vw"></webview>`
    })}
  </div>
`
