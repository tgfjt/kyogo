const isUrl = require('is-url')
const dialogs = require('dialogs')()

module.exports = (state, emitter) => {
  state.settings = Object.assign({
    inputs: [
      { url: 'https://github.com/tgfjt/kyogo', error: '' }
    ],
    uas: [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 10_2 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Version/10.0 Mobile/14C92 Safari/602.1',
      'Mozilla/5.0 (Linux; Android 7.1.1; Nexus 5X Build/NMF26F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36'
    ]
  }, state.settings);

  emitter.on('updateInputs', (inputs) => {
    state.settings.inputs = inputs
  })
  emitter.on('updateUAs', (uas) => {
    state.settings.uas = uas
  })
  emitter.on('editUA', () => {
    if (data === 'custom') {
      dialogs.prompt('Enter your UserAgent!', '', (newUA) => {
        if (newUA !== null && newUA.replace(/^\s/, '') !== '') {
          emitter.emit('updateUAs', state.settings.uas.concat(newUA))
          emitter.emit('updateUA', newUA)
          emitter.emit('saveUrls', null)
          emitter.emit('render')
        }
      });
    } else {
      emitter.emit('updateUA', data)
      emitter.emit('saveUrls', null)
      emitter.emit('render')
    }
  })
  emitter.on('addInput', () => {
    emitter.emit('updateInputs', state.settings.inputs.concat({ url: '', error: ''}))
    emitter.emit('render')
  })
  emitter.on('saveUrls', () => {
    if (state.settings.inputs.some(input => !input.url || !isUrl(input.url))) {
      const inputs = state.settings.inputs.map((input) => {
        if (!input.url) {
          input.error = 'Oh it\'s empty...'
        } else if (!isUrl(input.url)) {
          input.error = 'Uh-oh it\'s invalid URL.'
        }
        return input
      })
      emitter.emit('updateInputs', inputs)
      emitter.emit('render')
    } else {
      const saveurls = state.settings.inputs.map(input => input.url)
      emitter.emit('updateUrls', saveurls)
      emitter.emit('home', null)
      emitter.emit('render')
    }
  })
  emitter.on('inputValue', (params) => {
    emitter.emit('updateInputs', state.settings.inputs.map((input, i) => {
      if (i === params.index) return { url: params.value, error: '' }
      return input
    }))
    emitter.emit('render')
  })
  emitter.on('removeUrl', (params) => {
    emitter.emit('updateInputs', state.settings.inputs.filter((input, i) => i !== params.index))
    emitter.emit('render')
  })
}
