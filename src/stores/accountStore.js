import {
  action,
  observable,
} from 'mobx'
import Log from '../utils/debugLog'
import { eosJs } from '../utils/eosJsApi'

class AccountStore {
  @observable account = 'channproject'

  @observable nickname = 'CHANN'

  @observable bio = 'I turn coffee into <code />'

  @observable avatar = 'https://avatars0.githubusercontent.com/u/1831308?s=460&v=4'

  @observable loading = false

  @observable updating = false

  @action createAccount(account) {
    this.account = account
    const eos = eosJs('5JUNYmkJ5wVmtVY8x9A1KKzYe9UWLZ4Fq1hzGZxfwfzJB8jkw6u')
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

  @action readAccount() {
    this.loading = true
    return this.api.auth.current()
      .then(action(({ resp }) => {
        this.account = resp
      }))
      .catch((err) => {
        Log.error('accountStore::readAccount()', err)
      })
      .finally(action(() => {
        this.loading = false
      }))
  }

  @action updateAccount(account) {
    this.updating = true
    return this.api.auth.save(account)
      .then(action(({ resp }) => {
        this.account = resp
      }))
      .catch((err) => {
        Log.error('accountStore::updateAccount()', err)
      })
      .finally(action(() => {
        this.updating = false
      }))
  }

  @action deleteAccount() {
    this.account = undefined
  }
}

export const accountStore = new AccountStore()
export default accountStore
