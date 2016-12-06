const html = require('choo/html')

const inputUrl = require('./inputUrl')

module.exports = (state, prev, send) => html`
  <form class="container">
    <div class="title padded-more">Settings</div>
    ${state.setting.inputs.map((input, i) => inputUrl(i, input, send))}
    <div class="form-group">
      <button class="btn btn-form btn-primary" type="button" onclick=${(e) => send('setting:addInput')}>Add Url</button>
      <button class="btn btn-form btn-positive" type="button" onclick=${(e) => send('setting:saveUrls')}>Save</button>
    </div>
  </form>
`
