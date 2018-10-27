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

export default class IndexRouter extends React.Component {
  render() {
    return (
      <Switch history={history}>
        <Route
          exact
          path='/feed'
          render={() => {
            // this.props.setTitle('Dashboard')
            return <Feed {...this.props} />
          }}
        />
        <Route
          exact
          path='/wallet'
          render={() => {
            // this.props.setTitle('Dashboard')
            return <Wallet {...this.props} />
          }}
        />
        <Route
          exact
          path='/settings'
          render={() => {
            // this.props.setTitle('Dashboard')
            return <Settings {...this.props} />
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
      </Switch>

    )
  }
}
