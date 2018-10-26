import React from 'react'
import {
  Avatar,
  Layout,
  Menu,
  Icon,
  Tag,
  Tooltip,
  message,
} from 'antd'
import {
  Div,
} from 'glamorous'
import Clipboard from 'react-clipboard.js'
import styled from 'styled-components'
import Header from './layouts/Header'
import './assets/css/layout.less'

const {
  Content,
  Footer,
  Sider,
} = Layout

const UpperDiv = styled.div`
  margin-bottom: 10px;
`

const EllipsisTag = styled(Tag)`
  overflow: hidden;
  text-overflow: ellipsis;
  width: fit-content;
  max-width: 160px;
`

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
          // width='220'
        >
          <Div
            textAlign='center'
            padding='20px'
          >
            <Avatar shape='square' size={64} icon='user' />
            <UpperDiv style={{ marginTop: '10px' }}>
              <b>channprj</b>
            </UpperDiv>
            <UpperDiv>
              1000 KLAY
            </UpperDiv>
            <div>
              <Tooltip placement='top' title='asdf'>
                <Clipboard
                  key='1'
                  component='span'
                  data-clipboard-text='asdf'
                  onSuccess={() => message.success('Copied!', 1.5)}
                >
                  <EllipsisTag>0x58BEa8bD7938be0d87B2B235920BDeC828225c5e</EllipsisTag>
                </Clipboard>
              </Tooltip>
            </div>
          </Div>
          <Menu mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1'>
              <Icon type='message' theme='outlined' />
              <span>Comments</span>
            </Menu.Item>
            <Menu.Item key='2'>
              <Icon type='wallet' theme='outlined' />
              <span>Wallet</span>
            </Menu.Item>
            <Menu.Item key='3'>
              <Icon type='tool' />
              <span>Settings</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            collapsed={this.state.collapsed}
            toggle={this.toggleSider}
          />
          <Content>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default App
