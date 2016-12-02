const isUrl = require('is-url')

module.exports = {
  namespace: 'setting',
  state: {
    inputs: [
      { url: '', error: '' },
      { url: '', error: '' },
      { url: '', error: '' }
    ]
  },
  reducers: {
    updateInputs: (inputs, state) => ({ inputs })
  },
  effects: {
    saveUrls: (data, state, send, done) => {
      if (state.inputs.some((input) => {
        return !input.url || !isUrl(input.url)
      })) {
        const inputs = state.inputs.map((input) => {
          if (!input.url) {
            input.error = 'Empty.'
          } else if (!isUrl(input.url)) {
            input.error = 'Invalid'
          }
          return input
        })
        send('setting:updateInputs', inputs, done)
      } else {
        const saveurls = state.inputs.map(input => input.url)
        send('windows:updateUrls', saveurls, done)
        send('windows:home', null, done)
      }
    },
    inputValue: (data, state, send, done) => {
      send('setting:updateInputs', state.inputs.map((input, i) => {
        if (i === data.index) return { url: data.value, error: '' }
        return input
      }), done)
    }
  }
}
