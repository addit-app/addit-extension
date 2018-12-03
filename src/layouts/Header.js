import React from 'react'
import {
  // inject,
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
  /* width: 44px; */
  /* height: 44px; */
  padding: 16px;
  display: inline;
`

const HeaderWrapper = Layout.Header

const status = {
  'online': 'success',
  'offline': 'error',
  'warning': 'warning',
  'processing': 'processing',
  'unset': 'default',
}

// const Header = inject('accountStore')(observer((props) => {
const Header = observer((props) => {
  Log.info('Header::accountStore', props.accountStore)

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
        {/* <H1 display='inline' fontSize='16px'>OWDIN Wallet</H1> */}
      </HeaderDiv>
      <Badge
        status={status.online}
        // text={props.network}
        text='JungleNet'
        style={{
          float: 'right',
          padding: '0 20px',
        }}
      />
    </HeaderWrapper>
  )
})

export default Header
