import {
  // action,
  observable,
} from 'mobx'
import Log from '../utils/debugLog'

class AccountStore {
  @observable currentAccount = ''

  @observable nickname = ''

  @observable bio = ''

  @observable avatar = ''

  @observable loading = false

  @observable updating = false

  constructor() {
    Log.info('accountStore::constructor()')
  }
}

const accountStore = new AccountStore()
export default accountStore
