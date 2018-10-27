import React from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Feed from '../pages/Feed'
import Wallet from '../pages/Wallet'
import Settings from '../pages/Settings'
import history from '../libs/history'

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <b>{location.pathname}</b></h3>
  </div>
)

export default class IndexRouter extends React.Component {
  signout = () => {
    localStorage.clear()
  }

  render() {
    return (
      <Switch history={history}>
        <Route
          exact
          path='/feed'
          render={() => {
            return <Feed {...this.props} />
          }}
        />
        <Route
          exact
          path='/wallet'
          render={() => {
            return <Wallet {...this.props} />
          }}
        />
        <Route
          exact
          path='/settings'
          render={() => {
            return <Settings {...this.props} />
          }}
        />
        <Route
          exact
          path='/logout'
          render={() => {
            localStorage.clear()
            window.location.replace('/')
            return <Redirect to='/' />
          }}
        />

        {/* Redirect */}
        <Route
          exact
          path='/'
          render={() => {
            window.location.reload()
            return <Redirect to='/feed' />
          }}
        />

        {/* Error */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}
