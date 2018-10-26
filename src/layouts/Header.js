import React from 'react'
import {
  Badge,
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
      <Badge
        status='success'
        text='Aspen Network'
        style={{
          float: 'right',
          padding: '0 20px',
        }}
      />
    </HeaderWrapper>
  )
}

export default Header
