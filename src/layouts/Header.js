import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  Badge,
  Icon,
  Layout,
} from 'antd'
import styled from 'styled-components'
import Log from '../utils/debugLog'

const HeaderDiv = styled.div`
  padding: 16px;
  display: inline;
`
const H1 = styled.h1`
  display: inline;
  font-size: 16px;

  &:first-letter {
    text-transform: capitalize;
  }
`

const HeaderWrapper = Layout.Header

const status = {
  'online': 'success',
  'offline': 'error',
  'warning': 'warning',
  'processing': 'processing',
  'unset': 'default',
}

const Header = inject('settingStore')(observer((props) => {
  Log.info('Header::settingStore', props.settingStore)

  return (
    <HeaderWrapper style={{ background: '#fff', padding: 0 }}>
      <HeaderDiv
        padding='16px'
        width='44px'
        height='44px'
        display='inline'
        onClick={props.toggle}
      >
        <Icon
          id='sider-trigger'
          className='sider-trigger'
          type='menu'
        />
      </HeaderDiv>
      <HeaderDiv
        display='inline'
      >
        <H1>{props.settingStore.title}</H1>
      </HeaderDiv>
      <Badge
        status={status[props.settingStore.status]}
        text={props.settingStore.currentNetwork}
        style={{
          float: 'right',
          padding: '0 20px',
        }}
      />
    </HeaderWrapper>
  )
}))

export default Header
