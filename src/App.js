import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <a
            className='App-link'
            href={window.location.href}
            target='_blank'
            rel='noopener noreferrer'
          >
            Open in new tab
          </a>
        </header>
      </div>
    )
  }
}

export default App
