const html = require('choo/html')

const home = require('./home')
const setting = require('./setting')

module.exports = (state, prev, send) => {
  const main = state.windows.isHome ? home : setting

  return html`
    <main class="window-content">
      <div class="pane">
        ${main(state, prev, send)}
      </div>
    </main>
  `
}
