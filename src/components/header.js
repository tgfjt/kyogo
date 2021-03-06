const html = require('choo/html')
const classNames = require('classnames')

module.exports = (state, emit) => {
  const home = classNames('btn', 'btn-large', 'btn-default', { 'active': state.screen.isHome })
  const setting = classNames('btn', 'btn-large', 'btn-default', { 'active': state.screen.isSetting })

  return html`
    <header class="toolbar toolbar-header">
      <h1 class="title">競合</h1>
      <div class="toolbar-actions">
        <div class="btn-group pull-right">
          <button class="${home}" type="button" onclick=${(e) => emit('home')}>
            <span class="icon icon-window"></span>
          </button>
          <button class="${setting}" type="button" onclick=${(e) => emit('setting')}>
            <span class="icon icon-cog"></span>
          </button>
        </div>
      </div>
    </header>
  `
}
