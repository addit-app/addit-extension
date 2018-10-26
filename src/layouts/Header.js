import React from 'react'
import {
  Icon,
  Layout,
} from 'antd'
import {
  Div,
} from 'glamorous'

const HeaderWrapper = Layout.Header

const Header = (props) => {
  return (
    <HeaderWrapper style={{ background: '#fff', padding: 0 }}>
      <Div
        padding='16px'
        width='44px'
        height='44px'
        display='inline'
        onClick={props.toggle}
      >
        <Icon
          id='sider-trigger'
          className='sider-trigger'
          type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
        />
      </Div>
      <Div
        display='inline'
      >
        this is title
      </Div>
    </HeaderWrapper>
  )
}

export default Header
