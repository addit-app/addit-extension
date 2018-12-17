import {
  action,
  observable,
} from 'mobx'
import Log from '../utils/debugLog'
import { eosApi } from '../utils/eosJsApi'

class AccountStore {
  @observable currentAccount = ''

  @observable nickname = ''

  @observable bio = ''

  @observable avatar = ''

  @observable loading = false

  @observable updating = false

  @observable balance = ''

  @action getBalance() {
    this.loading = true

    eosApi.getCurrencyBalance(
      'eosadditapps', // code
      this.currentAccount, // account
      'ADDIT', // symbol
    ).then((resp) => {
      Log.info('accountStore::getBalance() - EOS API', resp)
      this.balance = resp[0]
      this.loading = false
    }).catch((err) => {
      Log.error('accountStore::getBalance() - EOS API', err)
      this.loading = false
    })
  }

  constructor() {
    Log.info('accountStore::constructor()')
  }
}

const accountStore = new AccountStore()
export default accountStore
