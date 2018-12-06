import React from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  Div,
} from 'glamorous'
import history from '../utils/history'
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
@observer
class RootRouter extends React.Component {
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
            return <Redirect to='/' />
          }}
        />

        {/* Redirect */}
        <Route
          exact
          path='/'
          render={() => {
            // window.location.reload()
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
