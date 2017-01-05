const isUrl = require('is-url')

module.exports = {
  namespace: 'setting',
  state: {
    inputs: [
      { url: 'https://github.com/tgfjt/kyogo', error: '' }
    ]
  },
  reducers: {
    updateInputs: (state, inputs) => ({ inputs })
  },
  effects: {
    addInput: (state, data, send, done) => {
      send('setting:updateInputs', state.inputs.concat({ url: '', error: ''}), done)
    },
    saveUrls: (state, data, send, done) => {
      if (state.inputs.some((input) => {
        return !input.url || !isUrl(input.url)
      })) {
        const inputs = state.inputs.map((input) => {
          if (!input.url) {
            input.error = 'Oh it\'s empty...'
          } else if (!isUrl(input.url)) {
            input.error = 'Uh-oh it\'s invalid URL.'
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
    inputValue: (state, data, send, done) => {
      send('setting:updateInputs', state.inputs.map((input, i) => {
        if (i === data.index) return { url: data.value, error: '' }
        return input
      }), done)
    },
    removeUrl: (state, data, send, done) => {
      send('setting:updateInputs', state.inputs.filter((input, i) => i !== data.index), done)
    }
  }
}
