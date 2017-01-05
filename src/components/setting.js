const html = require('choo/html')

const inputUrl = require('./inputUrl')

module.exports = (state, prev, send) => html`
  <form class="container">
    <h2 class="title padded-more">Settings</h2>
    <section>
      <h3>URL</h3>
      <div class="padded-horizontally-more">
        ${state.setting.inputs.map((input, i) => inputUrl(i, input, send))}
        <div class="form-group">
          <button class="btn btn-form btn-primary" type="button" onclick=${(e) => send('setting:addInput')}>Add Url</button>
          <button class="btn btn-form btn-positive" type="button" onclick=${(e) => send('setting:saveUrls')}>Save</button>
        </div>
      </div>
    </section>
    <section>
      <h3>UA</h3>
      <div class="padded-horizontally-more">
        <select class="form-control" onchange=${(e) => send('setting:editUA', e.target.value)}>
          ${state.setting.uas.map((ua, i) => {
            return html`<option value="${ua}" ${(ua === state.windows.ua) ? 'selected' : ''}>${ua}</option>`
          })}
          <option value="custom">Add...</option>
        </select>
      </div>
    </section>
  </form>
`
