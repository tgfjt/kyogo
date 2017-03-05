const html = require('choo/html')

const inputUrl = require('./inputUrl')

module.exports = (state, prev, send) => html`
  <form class="container">
    <h2 class="title padded-more">Settings</h2>
    <section>
      <h3 class="padded-top-more">URL <span class="icon icon-globe"></span></h3>
      <div class="padded-horizontally-more">
        ${state.setting.inputs.map((input, i) => inputUrl(i, input, send))}
        <div class="form-group">
          <button class="btn btn-form btn-primary" type="button" onclick=${(e) => send('setting:addInput')}>Add Url</button>
          <button class="btn btn-form btn-positive" type="button" onclick=${(e) => send('setting:saveUrls')}>Save</button>
        </div>
      </div>
    </section>
    <section>
      <h3 class="padded-top-more">UA <span class="icon icon-mobile"></span></h3>
      <div class="padded-horizontally-more">
        <select class="form-control" onchange=${(e) => send('setting:editUA', e.target.value)}>
          ${state.setting.uas.map((ua, i) => {
            return html`<option value="${ua}" ${(ua === state.windows.ua) ? 'selected' : ''}>${ua}</option>`
          })}
          <option value="custom">Add...</option>
        </select>
      </div>
    </section>
    <section>
      <h3 class="padded-top-more">Auto Reload <span class="icon icon-arrows-ccw"></span></h3>
      <div class="padded-horizontally-more">
        <div class="checkbox">
          <label>
            <input type="checkbox" name="enabled" onchange=${(e) => send('setting:autoReloadEnabled', e.target.checked)} ${(state.windows.autoreloadEnabled) ? 'checked' : ''} /> Enabled
          </label>
        </div>
        <div class="form-group">
          <label>Interval</label>
          <div>
            <input
              type="number"
              placeholder="600"
              value="${state.windows.autoreloadInterval}"
              min="60"
              onchange=${(e) => send('setting:autoReloadInterval', e.target.value)} /> seconds
          </div>
        </div>
      </div>
    </section>
  </form>
`
