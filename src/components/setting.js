const html = require('choo/html')

const inputUrl = require('./inputUrl')

module.exports = (state, emit) => html`
  <form class="container">
    <h2 class="title padded-more">Settings</h2>
    <section>
      <h3>URL</h3>
      <div class="padded-horizontally-more">
        ${state.settings.inputs.map((input, i) => inputUrl(i, input, emit))}
        <div class="form-group">
          <button class="btn btn-form btn-primary" type="button" onclick=${(e) => emit('addInput')}>Add Url</button>
          <button class="btn btn-form btn-positive" type="button" onclick=${(e) => emit('saveUrls')}>Save</button>
        </div>
      </div>
    </section>
    <section>
      <h3>UA</h3>
      <div class="padded-horizontally-more">
        <select class="form-control" onchange=${(e) => emit('editUA', e.target.value)}>
          ${state.settings.uas.map((ua, i) => {
            return html`<option value="${ua}" ${(ua === state.screen.ua) ? 'selected' : ''}>${ua}</option>`
          })}
          <option value="custom">Add...</option>
        </select>
      </div>
    </section>
  </form>
`
