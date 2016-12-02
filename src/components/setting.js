const html = require('choo/html')

const inputUrl = require('./inputUrl')

module.exports = (state, prev, send) => html`
  <form class="container">
    <div class="title padded-more">Settings</div>
    ${state.setting.inputs.map((input, i) => inputUrl(i, input, send))}
    <div class="form-group">
      <button class="btn btn-large btn-default" type="button" onclick=${(e) => send('windows:home')}>Cancel</button>
      <button class="btn btn-large btn-primary" type="button" onclick=${(e) => send('setting:saveUrls')}>Save</button>
    </div>
  </form>
`
