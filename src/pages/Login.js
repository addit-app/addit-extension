import React from 'react'
import { Redirect } from 'react-router-dom'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  Button,
  Form,
  Icon,
  Input,
  message,
} from 'antd'
import {
  Div,
  H1,
  Img,
} from 'glamorous'
import {
  newWindow,
} from '../utils/chromeApi'
import AppIcon from '../assets/img/app-icon.svg'
import Log from '../utils/debugLog'

const FormItem = Form.Item

@inject('settingStore')
@observer
class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isValid: false,
      passphrase: '',
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    const isValid = true

    if (isValid) {
      this.props.settingStore.setStatus('online')
    } else {
      message.error('Invalid passphrase. Try Again.')
    }

    this.setState({
      passphrase: '',
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    Log.info('Login::render()')

    if (this.state.isValid) {
      return <Redirect to='/index.html#/feed' />
    }

    return (
      <Div
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <Div
          width='100%'
          display='flex'
          alignItems='center'
          flexDirection='column'
        >
          <Img
            src={AppIcon}
            alt='OWDIN Wallet Icon'
            width='52px'
            height='52px'
          />
          <H1
            marginTop='10px'
          >
            OWDIN Wallet
          </H1>
          {
          (window.name)
            ? ''
            : (
              <span id='open-popup' role='presentation' onClick={() => newWindow()}>
                {/* <a id='open-newtab' href={window.location.href} target='_blank' rel='noopener noreferrer'> */}
                <Button>Open in a new Popup Window</Button>
                {/* </a> */}
              </span>
            )
          }
        </Div>
        <Div>
          <Form
            onSubmit={this.onSubmit}
            style={{
              width: '280px',
              margin: '0 auto',
              marginTop: '40px',
            }}
          >
            <FormItem>
              <Input
                id='passphrase'
                name='passphrase'
                type='password'
                value={this.state.passphrase}
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='Passphrase'
                onChange={e => this.handleChange(e)}
              />
            </FormItem>
            <FormItem
              style={{
                textAlign: 'center',
              }}
            >
              <Button type='primary' htmlType='submit'>
                Unlock
              </Button>
              <div>
                <a href='https://eos.io' target='_blank' rel='noopener noreferrer'>Restore your accout</a>
              </div>
            </FormItem>
          </Form>
        </Div>
      </Div>
    )
  }
}

export default Login
