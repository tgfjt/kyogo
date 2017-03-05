
module.exports = {
  namespace: 'windows',
  state: {
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_2 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Version/10.0 Mobile/14C92 Safari/602.1',
    isHome: false,
    isSetting: true,
    urls: [],
    autoreloadEnabled: false,
    autoreloadInterval: 60 * 1,
    reloadTimer: null,
  },
  reducers: {
    showHome: () => ({ isHome: true, isSetting: false }),
    showSetting: () => ({ isHome: false, isSetting: true }),
    updateUrls: (state, urls) => ({ urls }),
    updateUA: (state, ua) => ({ ua }),
    updateAutoreloadEnabled: (state, autoreloadEnabled) => ({ autoreloadEnabled }),
    updateAutoreloadInterval: (state, autoreloadInterval) => ({ autoreloadInterval }),
    setReloadTimer: (state, reloadTimer) => ({ reloadTimer }),
  },
  effects: {
    home: (state, data, send, done) => {
      clearTimeout(state.setReloadTimer)
      send('windows:showHome', null, done)
    },
    setting: (state, data, send, done) => {
      send('windows:showSetting', null, done)
    },
    reloadTimer: (state, data, send, done) => {
      send('windows:setReloadTimer', data, done)
    }
  }
}
