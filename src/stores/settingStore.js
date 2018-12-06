import {
  action,
  observable,
} from 'mobx'
import Log from '../utils/debugLog'

const mainnetChainID = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'

class SettingStore {
  @observable loading = false

  @observable updating = false

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
}

export default new SettingStore()
