const choo = require('choo')
const persist = require('choo-persist')
const html = require('choo/html')

const app = choo()

const header = require('./components/header')
const main = require('./components/main')

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

persist({ name: 'kyogo' }, (persist) => {
  app.use(persist)
  const tree = app.start()
  document.getElementById('choo-app').appendChild(tree)
})
