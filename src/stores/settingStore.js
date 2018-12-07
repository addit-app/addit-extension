import {
  action,
  observable,
  // runInAction,
  // spy,
} from 'mobx'
import {
  setPassword as extensionSetPassword,
  getPassword as extensionGetPassword,
  setStatus as extensionSetStatus,
  getStatus as extensionGetStatus,
} from '../utils/chromeApi'
import Log from '../utils/debugLog'

const mainnetChainID = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'

class SettingStore {
  @observable loading = false

  @observable updating = false

  @observable currentMenu = '/'

  @observable currentNetwork = 'Offline'

  @observable title = 'Addit'

  @observable status = null

  @observable password = null

  @observable endpoints = [
    {
      id: 0,
      title: 'Mainnet - EOS Newyork',
      endpoint: 'https://api.eosnewyork.io',
      port: 443,
      type: 'mainnet',
      chainID: mainnetChainID,
      ping: -1,
    },
    {
      id: 1,
      endpoint: 'https://jungle2.cryptolions.io',
      port: 443,
      type: 'testnet',
      chainID: mainnetChainID,
      ping: -1,
    },
  ]

  @observable password = ''

  @action updateCurrentMenu(menu) {
    this.currentMenu = menu
    this.title = menu.charAt(1).toUpperCase() + menu.slice(2)
  }

  @action addEndpoint(endpoint) {
    this.updating = true
    try {
      this.endpoints.push(endpoint)
    } catch (err) {
      Log.err('settingStore::addEndpoint()', err)
    } finally {
      this.updating = false
    }
  }

  @action deleteEndpoint(endpointId) {
    this.updating = true
    try {
      this.endpoints = this.endpoints.filter(item => item.id !== endpointId)
    } catch (err) {
      Log.err('settingStore::deleteEndpoint()', err)
    } finally {
      this.updating = false
    }
  }

  @action setPassword(password) {
    extensionSetPassword(password)
    this.password = password
  }

  @action getPasswordFromBrowser(storeObj) {
    extensionGetPassword(storeObj)
  }

  @action setStatus(status) {
    extensionSetStatus(status)
    this.status = status
  }

  @action getStatusFromBrowser(storeObj) {
    extensionGetStatus(storeObj)
  }
}

// spy((event) => {
//   if (event.type === 'action') {
//     Log.info('MobX::settingStore::action', `${event.name} with args: ${event.arguments}`)
//   }
// })

export default new SettingStore()
