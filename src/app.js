const choo = require('choo')
const html = require('choo/html')
const persist = require('choo-persist')
const log = require('choo-log')
const expose = require('choo-expose')

const header = require('./components/header')
const main = require('./components/main')

const version = require('../package.json').version

const app = choo()

app.use(persist({ name: `kyogo-${version}` }))

if (process.env.NODE_ENV !== 'production') {
  app.use(log())
  app.use(expose())
}

app.use(require('./models/screen'))
app.use(require('./models/settings'))

function mainView (state, emit) {
  return html`
    <div class="window">
      ${header(state, emit)}
      ${main(state, emit)}
    </div>
  `
}

app.route('/', mainView)

app.mount('#choo-app')
