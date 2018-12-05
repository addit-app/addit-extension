import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { configure as MobXConfig } from 'mobx'
import './assets/css/index.less'
import App from './App'
import * as serviceWorker from './serviceWorker'

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('debug', 'addit-extension:*')
}

MobXConfig({
  // don't allow state modifications outside actions
  enforceActions: 'always',
})

// live debug mode
localStorage.setItem('debug', 'addit-extension:*')

ReactDOM.render((
  <Provider>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
), document.getElementById('root'))

serviceWorker.unregister()
