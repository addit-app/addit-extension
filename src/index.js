import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.less'
import App from './App'
import * as serviceWorker from './serviceWorker'

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('debug', 'addit-extension:*')
}

// live debug mode
localStorage.setItem('debug', 'addit-extension:*')

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
