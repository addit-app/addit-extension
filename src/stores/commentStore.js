import {
  action,
  observable,
  // runInAction,
} from 'mobx'
import accountStore from './accountStore'
import feedStore from './feedStore'
import Log from '../utils/debugLog'
import { eosJs } from '../utils/eosJsApi'
import { isExtension } from '../utils/chromeApi'

class CommentStore {
  @observable comment = ''

  @observable loading = false

  @observable result = {}

  @observable resultModalOpen = false

  @action write(text) {
    this.comment = text
    this.loading = true

    try {
      if (isExtension()) {
        /* eslint-disable */
        chrome.storage.local.get('keyPairs', items => {
          const pairs = items.keyPairs
          Object.keys(pairs).forEach((account) => {
            if (account === accountStore.currentAccount) {
              const eos = eosJs(items.keyPairs[account])

              eos.transact({
                // add new opinion
                actions: [{
                  account: 'eosadditapps',
                  name: 'addit',
                  authorization: [{
                    actor: accountStore.currentAccount,
                    permission: 'active',
                  }],
                  data: {
                    account: accountStore.currentAccount,
                    iopinion: feedStore.indexURL,
                    url: feedStore.url,
                    comment: this.comment,
                  },
                }],
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              }).then((resp) => {
                this.loading = false
                this.result = resp
                this.resultModalOpen = true
                accountStore.getBalance()
                feedStore.getFeed(feedStore.url)
                Log.info('commentStore::write()::then', { result: this.result, type: typeof this.result })
              }).catch((err) => {
                Log.error('commentStore::transact', err)
              })

              Log.info('commentStore::write() - result', this.result)
            }
          })
        })
        /* eslint-enable */
      } else {
        const eos = eosJs(JSON.parse(localStorage.getItem('keyPairs'))[localStorage.getItem('currentAccount')])
        eos.transact({
          // add new opinion
          actions: [{
            account: 'eosadditapps',
            name: 'addit',
            authorization: [{
              actor: accountStore.currentAccount,
              permission: 'active',
            }],
            data: {
              account: accountStore.currentAccount,
              iopinion: feedStore.indexURL,
              url: feedStore.url,
              comment: this.comment,
            },
          }],
        }, {
          blocksBehind: 3,
          expireSeconds: 30,
        }).then((resp) => {
          this.loading = false
          this.result = resp
          this.resultModalOpen = true
          feedStore.getFeed(feedStore.url)
          Log.info('commentStore::write()::then', { result: this.result, type: typeof this.result })
        }).catch((err) => {
          Log.error('commentStore::transact', err)
        })
      }
      // runInAction(() => {
      //   Log.info('commentStore::write()::runInAction', result)
      // })
      Log.info('commentStore::write() - result', this.result)
    } catch (err) {
      Log.error('commentStore::write()', err)
    }
  }

  @action delete() {
    this.comment = ''
  }
}

const commentStore = new CommentStore()
export default commentStore
