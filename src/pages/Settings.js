import React from 'react'
import {
  NavLink,
} from 'react-router-dom'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  Button,
  Col,
  Row,
  message,
} from 'antd'
import styled from 'styled-components'
import Log from '../utils/debugLog'
import {
  resetExtension,
} from '../utils/chromeApi'

const FlexRow = styled(Row)`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  @media (max-width: 700px) {
    max-width: 100%;
    margin: 0 auto !important;
  }
`
const FlexCol = styled(Col)`
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
  text-align: center;
  @media (max-width: 700px) {
    max-width: 100%;
    padding: 0 !important;
  }
`

@inject('settingStore')
@observer
class Settings extends React.Component {
  factoryReset = () => {
    if (window.confirm('Do you want to reset wallet? This action cannot be undone!')) {
      try {
        resetExtension(this.props.settingStore)
      } catch (error) {
        Log.error('Settings::factoryReset()', error)
      }
      message.success('Wallet has been reset successfully.')
    } else {
      message.warning('Cancelled')
    }
  }

  render() {
    return (
      <div>
        <FlexRow
          gutter={16}
          type='flex'
          justify='center'
        >
          <FlexCol>
            <Button>
              <NavLink
                to='/logout'
                onClick={() => {
                  this.props.settingStore.setStatus('locked')
                }}
              >
                Logout
              </NavLink>
            </Button>
          </FlexCol>
        </FlexRow>
        <FlexRow
          gutter={16}
          type='flex'
          justify='center'
        >
          <FlexCol>
            <Button
              type='danger'
              onClick={() => this.factoryReset()}
            >
              Reset Wallet
            </Button>
          </FlexCol>
        </FlexRow>
      </div>
    )
  }
}

export default Settings
