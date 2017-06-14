const html = require('choo/html')

module.exports = (index, input, emit) => html`
  <div class="form-group ${input.error ? 'has-error' : ''}">
    <label>
      <button type="button" onclick=${(e) => emit('removeUrl', { index })} title="remove this url">
        <span class="icon icon-cancel-circled"></span>
      </button> Window: ${index + 1}
    </label>
    <input type="url" class="form-control" placeholder="URL" value="${input.url}" oninput=${e => emit('inputValue', { index, value: e.target.value })} >
    <span>${input.error}</span>
  </div>
`
