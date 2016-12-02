const html = require('choo/html')

module.exports = (index, input, send) => html`
  <div class="form-group ${input.error ? 'has-error' : ''}">
    <label>Window ${index}</label>
    <input type="url" class="form-control" placeholder="URL" value="${input.url}" oninput=${e => send('setting:inputValue', { index, value: e.target.value })} >
    <span>${input.error}</span>
  </div>
`
