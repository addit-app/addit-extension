import React from 'react'
import {
  Alert,
  Form,
  Icon,
  Input,
} from 'antd'
import styled from 'styled-components'

const FormItem = Form.Item

const InputIcon = styled(Icon)`
  color: rgba(0,0,0,.25);
`

const AlertBox = styled(Alert)`
  margin-bottom: 20px !important;
`

class SetPassword extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      password1: this.props.password || '',
      password2: this.props.password || '',
      alertStatus: '',
      checkStatus: '',
      checkConfirmStatus: '',
      helpMessage: '',
      helpConfirmMessage: '',
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      if (this.state.password1.length <= 0) {
        this.setState({
          checkStatus: '',
          helpMessage: '',
        })
      } else if (this.state.password1.length < 8) {
        this.setState({
          checkStatus: 'warning',
          helpMessage: 'It must be longer than 8 characters.',
        })
      } else {
        this.setState({
          helpMessage: '',
          checkStatus: 'success',
        })

        if (this.state.password2.length > 0 && this.state.password2 !== this.state.password1) {
          this.setState({
            checkConfirmStatus: 'error',
            helpConfirmMessage: 'Password does not match each other.',
          }, () => {
            this.props.setPassword('')
            this.props.allowNext(false)
          })
        } else if (this.state.password2.length === 0) {
          this.setState({
            checkConfirmStatus: '',
            helpConfirmMessage: '',
          })
        } else {
          this.setState({
            checkConfirmStatus: 'success',
            helpConfirmMessage: 'Confirmed!',
          }, () => {
            this.props.setPassword(this.state.password2)
            this.props.allowNext(true)
          })
        }
      }
    })
  }

  render() {
    return (
      <div>
        {
          this.state.alertStatus ? (
            <AlertBox
              message='Detailed description and advices about error.'
              type={this.state.alertStatus}
              showIcon
            />
          ) : ''
        }
        <Form>
          <FormItem
            validateStatus={this.state.checkStatus}
            hasFeedback={this.state.password1.length > 0}
            help={this.state.helpMessage}
          >
            <Input
              prefix={(
                <InputIcon type='lock' />
              )}
              type='password'
              id='password1'
              name='password1'
              value={this.state.password1}
              placeholder='Password'
              onChange={e => this.handleChange(e)}
            />
          </FormItem>
          <FormItem
            validateStatus={this.state.checkConfirmStatus}
            hasFeedback={this.state.password2.length > 0}
            help={this.state.helpConfirmMessage}
          >
            <Input
              prefix={(
                <InputIcon type='lock' />
              )}
              type='password'
              id='password2'
              name='password2'
              value={this.state.password2}
              placeholder='Confirm Password'
              onChange={e => this.handleChange(e)}
            />
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default SetPassword
