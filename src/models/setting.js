const isUrl = require('is-url')
const dialogs = require('dialogs')()

module.exports = {
  namespace: 'setting',
  state: {
    inputs: [
      { url: 'https://github.com/tgfjt/kyogo', error: '' }
    ],
    uas: [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 10_2 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Version/10.0 Mobile/14C92 Safari/602.1',
      'Mozilla/5.0 (Linux; Android 7.1.1; Nexus 5X Build/NMF26F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36'
    ]
  },
  reducers: {
    updateInputs: (state, inputs) => ({ inputs }),
    updateUAs: (state, uas) => ({ uas })
  },
  effects: {
    editUA: (state, data, send, done) => {
      if (data === 'custom') {
        dialogs.prompt('Enter your UserAgent!', '', (newUA) => {
          if (newUA !== null && newUA.replace(/^\s/, '') !== '') {
            send('setting:updateUAs', state.uas.concat(newUA), done)
            send('windows:updateUA', newUA, done)
            send('setting:saveUrls', null, done)
          }
        });
      } else {
        send('windows:updateUA', data, done)
        send('setting:saveUrls', null, done)
      }
    },
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
