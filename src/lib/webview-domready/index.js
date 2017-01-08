module.exports = function ondomready (webview, handler) {
  handler = handler || function () {}
  webview.addEventListener('dom-ready', handler)

  return webview
}
