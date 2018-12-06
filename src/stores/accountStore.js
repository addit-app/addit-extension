import {
  action,
  observable,
} from 'mobx'
import Log from '../utils/debugLog'

class AccountStore {
  @observable account = 'channproject'

  @observable nickname = 'CHANN'

  @observable bio = 'I turn coffee into <code />'

  @observable avatar = 'https://avatars0.githubusercontent.com/u/1831308?s=460&v=4'

  @observable loading = false

  @observable updating = false

  @action setAccount(account) {
    try {
      this.account = account
    } catch (error) {
      Log.error('accountStore::createAccount()', error)
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

export default new AccountStore()
