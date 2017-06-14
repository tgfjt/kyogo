const html = require('choo/html')

const home = require('./home')
const settings = require('./settings')

module.exports = (state, emit) => {
  const main = state.screen.isHome ? home : settings

  return html`
    <main class="window-content">
      <div class="pane">
        ${main(state, emit)}
      </div>
    </main>
  `
}
