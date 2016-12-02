
module.exports = {
  namespace: 'windows',
  state: {
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1',
    isHome: true,
    isSetting: false,
    urls: []
  },
  reducers: {
    home: () => ({ isHome: true, isSetting: false }),
    setting: () => ({ isHome: false, isSetting: true }),
    updateUrls: urls => ({ urls })
  }
}
