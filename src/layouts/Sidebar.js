import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  observable,
} from 'mobx'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  // message,
  // Tag,
  // Tooltip,
  Avatar,
  Icon,
  Menu,
} from 'antd'
import {
  Div,
} from 'glamorous'
import styled from 'styled-components'
import {
  newWindow,
} from '../utils/chromeApi'
import Log from '../utils/debugLog'


const UpperDiv = styled.div`
  margin-bottom: 10px;
`
const LogoutMenuItem = styled(Menu.Item)`
  &:hover {
    background-color: red;
  }
`
const LogoutNavLink = styled(NavLink)`
  &:hover {
    color: white !important;
  }
`
const BottomBtn = styled.div`
  bottom: 0;
  position: absolute;
  width: 100%;
  text-align: center;
  height: 44px;
`
// const EllipsisTag = styled(Tag)`
//   overflow: hidden;
//   text-overflow: ellipsis;
//   width: fit-content;
//   max-width: 160px;
// `

const TitleIcon = styled(Icon)`
margin-right: 10px;
`

@inject('settingStore', 'accountStore')
@observer
class SidebarMenu extends React.Component {
  @observable selectedMenu = window.location.href.split('#')[1]

  constructor(props) {
    super(props)

    if (window.location.href.split('#')[1] === '/') {
      this.selectedMenu = '/feed'
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    Log.info('Sidebar::getDerivedStateFromProps()', { nextProps, prevState })

    if (nextProps) {
      if (window.location.href.split('#')[1] === '/') {
        nextProps.settingStore.updateCurrentMenu('/feed')
      } else {
        nextProps.settingStore.updateCurrentMenu(window.location.href.split('#')[1])
      }
    }

    return null
  }

  render() {
    Log.info('Sidebar::render()', JSON.stringify(this.props))

    return (
      <Div>
        <Div
          textAlign='center'
          padding='20px'
        >
          <Avatar
            src={`https://avatars.dicebear.com/v2/identicon/${this.props.accountStore.account}.svg`}
            shape='circle'
            size={52}
            icon='user'
          />
          <UpperDiv style={{ marginTop: '10px' }}>
            <b>{this.props.accountStore.account}</b>
          </UpperDiv>
          {/* <UpperDiv>
            {accountBalance}
          </UpperDiv> */}
          <div>
            {/* <Tooltip placement='top' title='Copy address'>
              <Clipboard
                key='1'
                component='span'
                data-clipboard-text='0x58BEa8bD7938be0d87B2B235920BDeC828225c5e'
                onSuccess={() => message.success('Copied!', 1.5)}
              >
                <EllipsisTag>0x58BEa8bD7938be0d87B2B235920BDeC828225c5e</EllipsisTag>
              </Clipboard>
            </Tooltip> */}
          </div>
        </Div>
        <Menu
          mode='inline'
          selectedKeys={[this.selectedMenu]}
        >
          <Menu.Item
            key='/feed'
            onClick={(item) => {
              this.selectedMenu = item.key
              this.props.closeSidebar()
            }}
          >
            <NavLink to='/feed'>
              <Icon type='pic-center' theme='outlined' />
              <span>Feed</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key='/wallet'
            onClick={(item) => {
              this.selectedMenu = item.key
              this.props.closeSidebar()
            }}
          >
            <NavLink to='/wallet'>
              <Icon type='wallet' theme='outlined' />
              <span>Wallet</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key='/settings'
            onClick={(item) => {
              this.selectedMenu = item.key
              this.props.closeSidebar()
            }}
          >
            <NavLink to='/settings'>
              <Icon type='tool' theme='outlined' />
              <span>Settings</span>
            </NavLink>
          </Menu.Item>
          <LogoutMenuItem
            key='/logout'
            onClick={() => {
              this.props.closeSidebar()
            }}
          >
            <LogoutNavLink
              to='/logout'
              onClick={() => {
                this.props.settingStore.setStatus('locked')
                this.props.settingStore.updateCurrentMenu('/feed')
              }}
            >
              <Icon type='logout' theme='outlined' />
              <span>Logout</span>
            </LogoutNavLink>
          </LogoutMenuItem>
        </Menu>
        {
          (window.name)
            ? ''
            : (
              <BottomBtn>
                <a
                  id='open-newtab'
                  href='/#'
                  rel='noopener noreferrer'
                  onClick={() => {
                    newWindow()
                    window.close()
                  }}
                >
                  <TitleIcon type='export' theme='outlined' />
                  <span>Open in a new tab</span>
                </a>
              </BottomBtn>
            )
        }
      </Div>
    )
  }
}

export default SidebarMenu
