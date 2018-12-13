import {
  action,
  observable,
} from 'mobx'
import Log from '../utils/debugLog'
import { eosJs } from '../utils/eosJsApi'

class AccountStore {
  @observable currentAccount = ''

  @observable nickname = ''

  @observable bio = ''

  @observable avatar = ''

  @observable loading = false

  @observable updating = false

  @action createAccount(account) {
    this.currentAccount = account
    const eos = eosJs('5JaXNBaps36EsupVMcWpex672rJSawg8YKeU6quynSTXdq5naAX')
    try {
      const resp = eos.transact({
        actions: [{
          account: 'eosadditapps',
          name: 'signup',
          authorization: [{
            actor: account,
            permission: 'active',
          }],
          data: {
            account,
            nickname: account,
            avatar: '',
            memo: '',
          },
        }],
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      })
      Log.info('accountStore::createAccount() - result', resp)
    } catch (err) {
      Log.error('accountStore::createAccount()', err)
    }
  }

  constructor() {
    Log.info('accountStore::constructor()')
  }
}

const accountStore = new AccountStore()
export default accountStore
