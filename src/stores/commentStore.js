import {
  action,
  observable,
} from 'mobx'
import accountStore from './accountStore'
import feedStore from './feedStore'
import Log from '../utils/debugLog'
import { eosJs } from '../utils/eosJsApi'
import { isExtension } from '../utils/chromeApi'

class CommentStore {
  @observable comment = ''

  @observable loading = false

  @observable result = null

  @observable resultModalOpen = false

  @action submit() {
    this.loading = true
    return this.api.addComment()
      .then(action(({ resp }) => {
        this.result = resp
      }))
      .catch((err) => {
        Log.error('accountStore::readAccount()', err)
      })
      .finally(action(() => {
        this.loading = false
      }))
  }

  @action write(text) {
    this.comment = text
    let resp = ''

    try {
      if (isExtension()) {
        /* eslint-disable */
        chrome.storage.local.get('keyPairs', items => {
          const pairs = items.keyPairs
          Object.keys(pairs).forEach((account) => {
            if (account === accountStore.currentAccount) {
              const eos = eosJs(items.keyPairs[account])

              resp = eos.transact({
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
              })

              Log.info('commentStore::write() - result', resp)
            }
          })
        })
        /* eslint-enable */
      } else {
        const eos = eosJs(JSON.parse(localStorage.getItem('keyPairs'))[localStorage.getItem('currentAccount')])
        resp = eos.transact({
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
        })
      }

      Log.info('commentStore::write() - result', resp)
    } catch (err) {
      Log.error('commentStore::write()', err)
    }

    feedStore.getFeed(feedStore.url)
  }

  @action delete() {
    this.comment = ''
  }
}

const commentStore = new CommentStore()
export default commentStore
