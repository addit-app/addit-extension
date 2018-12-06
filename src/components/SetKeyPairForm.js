import React from 'react'
import {
  Form,
  Icon,
  Input,
} from 'antd'
import styled from 'styled-components'
import {
  getAccountsByPubKey,
  privToPub,
} from '../utils/eosJsApi'
import Log from '../utils/debugLog'

const FormItem = Form.Item

const InputIcon = styled(Icon)`
  color: rgba(0,0,0,.25);
`

class SetKeyPairForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      account: this.props.account || '',
      publicKey: this.props.publicKey || '',
      privateKey: this.props.privateKey || '',
      accountCheck: '',
      accountHelpMsg: '',
      privateKeyCheck: '',
      privateKeyHelpMsg: '',
    }
  }


  componentDidMount() {
    if (this.state.publicKey.length !== 0) {
      this.checkAccountExist(this.state.publicKey)
    }
  }

  checkAccountExist = (publicKey) => {
    // check private key is valid
    if (this.state.account === '') {
      this.setState({
        accountCheck: 'validating',
        accountHelpMsg: 'Checking...',
      }, async () => {
        const accountList = await getAccountsByPubKey(publicKey)

        if (accountList !== false) {
          this.setState({
            account: accountList[0],
            accountCheck: 'success',
            accountHelpMsg: 'Found!',
            privateKeyCheck: 'success',
            privateKeyHelpMsg: 'Confirmed!',
          }, () => {
            this.props.setKeyPair(this.state.account, this.state.privateKey)
            this.props.allowNext(true)
          })
        } else {
          this.setState({
            account: 'No Accounts Found',
            accountCheck: 'error',
            accountHelpMsg: 'No accounts were found connected to this private key. Make sure there is an EOS account linked to this public key on the EOS network.',
          })
        }
      })
    } else {
      this.setState({
        account: '',
        accountCheck: '',
        accountHelpMsg: '',
        publicKey: '',
        privateKeyCheck: 'error',
        privateKeyHelpMsg: 'Invalid Private Key.',
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      Log.info('SetKeyPairForm::handleChange()', this.state)
      // check private key
      if (this.state.privateKey.length === 0) {
        this.setState({
          account: '',
          accountCheck: '',
          accountHelpMsg: '',
          publicKey: '',
          privateKeyCheck: '',
          privateKeyHelpMsg: '',
        })
      } else if (this.state.privateKey.length !== 51) {
        this.setState({
          account: '',
          accountCheck: '',
          accountHelpMsg: '',
          publicKey: '',
          privateKeyCheck: 'error',
          privateKeyHelpMsg: 'Invalid Private Key.',
        }, () => {
          this.props.setKeyPair(this.state.account, '')
          this.props.allowNext(false)
        })
      } else {
        const privKey = this.state.privateKey
        this.setState({
          accountCheck: 'validating',
          accountHelpMsg: 'Checking...',
          publicKey: privToPub(privKey),
        }, () => {
          // check account exist
          this.checkAccountExist(this.state.publicKey)
        })
      }
    })
  }

  render() {
    return (
      <div>
        <Form>
          <FormItem
            validateStatus={this.state.accountCheck}
            hasFeedback={this.state.accountCheck !== ''}
            help={this.state.accountHelpMsg}
          >
            <Input
              prefix={(
                <InputIcon type='user' />
              )}
              type='text'
              id='account'
              name='account'
              value={this.state.account}
              placeholder='EOS Account'
              readOnly
              disabled
            />
          </FormItem>
          <FormItem>
            <Input
              prefix={(
                <InputIcon type='unlock' />
              )}
              type='text'
              id='publicKey'
              name='publicKey'
              value={this.state.publicKey}
              placeholder='Public Key'
              readOnly
              disabled
            />
          </FormItem>
          <FormItem
            validateStatus={this.state.privateKeyCheck}
            hasFeedback={this.state.privateKeyCheck.length > 0}
            help={this.state.privateKeyHelpMsg}
          >
            <Input
              prefix={(
                <InputIcon type='lock' />
              )}
              type='password'
              id='privateKey'
              name='privateKey'
              value={this.state.privateKey}
              placeholder='Private Key'
              onChange={e => this.handleChange(e)}
              autoComplete='false'
            />
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default SetKeyPairForm
