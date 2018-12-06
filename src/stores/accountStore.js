import {
  action,
  observable,
} from 'mobx'
import Log from '../utils/debugLog'

class AccountStore {
  @observable currentAccount = 'channproject'

  @observable nickname = 'CHANN'

  @observable bio = 'I turn coffee into <code />'

  @observable avatar = 'https://avatars0.githubusercontent.com/u/1831308?s=460&v=4'

  @observable loading = false

  @observable updating = false

  @action createAccount() {
    this.loading = false
    Log.error('accountStore::createAccount()', 'Create user cannot support')
    return false
  }

  @action readAccount() {
    this.loading = true
    return this.api.auth.current()
      .then(action(({ resp }) => {
        this.currentAccount = resp
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
        this.currentAccount = resp
      }))
      .catch((err) => {
        Log.error('accountStore::updateAccount()', err)
      })
      .finally(action(() => {
        this.updating = false
      }))
  }

  @action deleteAccount() {
    this.currentAccount = undefined
  }
}

export default new AccountStore()
