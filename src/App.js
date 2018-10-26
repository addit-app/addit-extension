import React from 'react'
import {
  Layout,
} from 'antd'
import Header from './layouts/Header'
import './assets/css/layout.less'

const {
  Content,
  Footer,
  Sider,
} = Layout

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: false,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  toggleSider = () => {
    const isCollapsed = this.state.collapsed;
    this.setState({
      collapsed: !isCollapsed,
    })
  }

  resize = () => {
    if (window.innerWidth <= 576) {
      this.setState({
        collapsed: true,
      })
    }
    if (window.innerWidth >= 1200) {
      this.setState({
        collapsed: false,
      })
    }
  }

  render() {
    return (
      <Layout>
        <Sider
          breakpoint='sm'
          collapsedWidth='0'
          theme='light'
          collapsed={this.state.collapsed}
        >
          asdfasd
        </Sider>
        <Layout>
          <Header
            collapsed={this.state.collapsed}
            toggle={this.toggleSider}
          />
          <Content>
            Content
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default App
