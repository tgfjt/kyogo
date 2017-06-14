module.exports = (state, emitter) => {
  state.screen = Object.assign({
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1',
    isHome: false,
    isSetting: true,
    urls: []
  }, state.screen);

  emitter.on('home', () => {
    state.screen.isHome = true
    state.screen.isSetting = false
    emitter.emit('render')
  })
  emitter.on('setting', () => {
    state.screen.isHome = false
    state.screen.isSetting = true
    emitter.emit('render')
  })
  emitter.on('updateUrls', (urls) => {
    state.screen.urls = urls
  })
  emitter.on('updateUA', (ua) => {
    state.screen.ua = ua
  })
}
