const choo = require('choo')
const persist = require('choo-persist')
const html = require('choo/html')

const header = require('./components/header')
const main = require('./components/main')

const version = require('../package.json').version

const app = choo()

app.model(require('./models/windows'))
app.model(require('./models/setting'))

const mainView = (state, prev, send) => html`
  <div class="window">
    ${header(state, prev, send)}
    ${main(state, prev, send)}
  </div>
`

app.router({ default: '/' }, [
  ['/', mainView]
])

persist({ name: `kyogo-${version}` }, (persist) => {
  app.use(persist)
  const tree = app.start()
  document.getElementById('choo-app').appendChild(tree)
})
