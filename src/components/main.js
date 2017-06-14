const html = require('choo/html')

const home = require('./home')
const setting = require('./setting')

module.exports = (state, emit) => {
  const main = state.screen.isHome ? home : setting

  return html`
    <main class="window-content">
      <div class="pane">
        ${main(state, emit)}
      </div>
    </main>
  `
}
