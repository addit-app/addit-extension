import React from 'react'
import {
  HashRouter,
  Switch,
  Route,
} from 'react-router-dom'
import {
  Provider,
  observer,
} from 'mobx-react'
import {
  Layout,
} from 'antd'
import Sidebar from 'react-sidebar'
import history from './utils/history'
import Log from './utils/debugLog'
import Header from './layouts/Header'
import SidebarMenu from './layouts/Sidebar'
import Footer from './layouts/Footer'
import RootRouter from './routes/RootRouter'
import Login from './pages/Login'
import Setup from './pages/Setup'
import './assets/css/layout.less'

const {
  Content,
} = Layout

const mql = window.matchMedia('(min-width: 576px)')

@observer
class App extends React.Component {
  constructor() {
    super()

    // getAccountList(accountStore)

    this.state = {
      open: false,
      docked: mql.matches,
    }
  }

  async componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this))
    this.resize()
  }

  toggleSidebar = () => {
    const isOpen = this.state.open
    const isDocked = this.state.docked

    if (window.innerWidth <= 576) {
      this.setState({
        open: !isOpen,
      })
    } else {
      this.setState({
        docked: !isDocked,
      })
    }
  }

  closeSidebar = () => {
    if (this.state.docked === false) {
      this.setState({
        open: false,
      })
    }
  }

  resize = () => {
    if (window.innerWidth <= 576) {
      if (this.state.docked === true) {
        this.setState({
          open: false,
          docked: false,
        })
      }
    }

    if (window.innerWidth >= 1200) {
      if (this.state.docked === false) {
        this.setState({
          open: false,
          docked: true,
        })
      }
    }
  }

  componentDidCatch(error, info) {
    Log.error(error, info)
  }

  render() {
    Log.info('App', 'render()')
    // const status = getStatus(accountStore)
    const status = 'online'

    switch (status) {
      case 'online':
      case 'offline':
        return (
          // <Provider accountStore={accountStore}>
          <Provider>
            <HashRouter>
              <Layout
                style={{
                  minHeight: '100vh',
                }}
              >
                <Sidebar
                  sidebar={(
                    <SidebarMenu
                      closeSidebar={this.closeSidebar}
                    />
                  )}
                  open={this.state.open}
                  onSetOpen={this.toggleSidebar}
                  docked={this.state.docked}
                  styles={{
                    sidebar: {
                      background: 'white',
                      width: '220px',
                    },
                  }}
                >
                  <Header
                    open={this.state.open}
                    toggle={this.toggleSidebar}
                  />
                  <Content>
                    <RootRouter />
                  </Content>
                  <Footer />
                </Sidebar>
              </Layout>
            </HashRouter>
          </Provider>
        )
      case 'locked':
        return (
          // <Provider accountStore={accountStore}>
          <Provider>
            <HashRouter>
              <Switch history={history}>
                <Route render={() => <Login />} />
              </Switch>
            </HashRouter>
          </Provider>
        )
      default:
        break;
    }

    return (
      <HashRouter>
        <Switch history={history}>
          <Route component={Setup} />
        </Switch>
      </HashRouter>
    )
  }
}

export default App
