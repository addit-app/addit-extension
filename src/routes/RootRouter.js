import React from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import {
  inject,
} from 'mobx-react'
import {
  Div,
} from 'glamorous'
import history from '../utils/history'
import Log from '../utils/debugLog'
import Feed from '../pages/Feed'
import Wallet from '../pages/Wallet'
import Settings from '../pages/Settings'

const Error404 = ({ location }) => (
  <Div
    margin='20px'
  >
    <h3>Page does not exist. <b>{location.pathname}</b></h3>
  </Div>
)

@inject('settingStore')
class RootRouter extends React.Component {
  render() {
    Log.info('RootRouter()::render()', this.props)

    return (
      <Switch history={history}>
        <Route
          exact
          path='/feed'
          render={() => {
            return <Feed />
          }}
        />
        <Route
          exact
          path='/wallet'
          render={() => {
            return <Wallet />
          }}
        />
        <Route
          exact
          path='/settings'
          render={() => {
            return <Settings />
          }}
        />
        <Route
          exact
          path='/logout'
          render={() => {
            this.props.settingStore.setStatus('locked')
            return <Redirect to='/' />
          }}
        />

        {/* Redirect */}
        <Route
          exact
          path='/'
          render={() => {
            return <Redirect to='/feed' />
          }}
        />

        {/* Error */}
        <Route component={Error404} />
      </Switch>
    )
  }
}

export default RootRouter
