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
  getPassword,
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
      password: '',
    }

    getPassword()
  }

  onSubmit = () => {
    Log.info('Login::onSubmit()', [this.props.settingStore.password, this.state.password])

    if (this.props.settingStore.password === this.state.password) {
      this.props.settingStore.setStatus('online')
      message.success('Unlocked.')
    } else {
      message.error('Invalid password. Try Again.')
    }

    this.setState({
      password: '',
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    Log.info('Login::render()', this.props)

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
            alt='Addit Extension Icon'
            width='52px'
            height='52px'
          />
          <H1
            marginTop='10px'
          >
            Addit Extension
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
            onSubmit={() => this.onSubmit()}
            style={{
              width: '280px',
              margin: '0 auto',
              marginTop: '4rem',
            }}
          >
            <FormItem>
              <Input
                id='password'
                name='password'
                type='password'
                value={this.state.password}
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='password'
                onChange={e => this.handleChange(e)}
              />
            </FormItem>
            <FormItem
              style={{
                textAlign: 'center',
              }}
            >
              <div>
                <Button
                  type='primary'
                  htmlType='submit'
                >
                  Unlock
                </Button>
              </div>
              <div>
                <Button
                  type='danger'
                  style={{
                    marginTop: '0.6rem',
                  }}
                >
                  Reset settings
                </Button>
              </div>
            </FormItem>
          </Form>
        </Div>
      </Div>
    )
  }
}

export default Login
