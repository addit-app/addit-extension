import {
  action,
  observable,
} from 'mobx'
import Log from '../utils/debugLog'
import { eosJs } from '../utils/eosJsApi'

class CommentStore {
  @observable url = ''

  @observable comment = ''

  @observable loading = false

  @observable result = null

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

  @action setUrl(url) {
    this.url = url
  }

  @action write(text) {
    this.comment = text
    try {
      /* eslint-disable */
      chrome.storage.local.get('keyPairs', items => {
        const pairs = items.keyPairs
        Object.keys(pairs).forEach((account) => {
          if (account === 'MUSTFIX') {
            // MUSTFIX
          }
        })
      })
      /* eslint-enable */

      const eos = eosJs('5JUNYmkJ5wVmtVY8x9A1KKzYe9UWLZ4Fq1hzGZxfwfzJB8jkw6u')
      const resp = eos.transact({
        // add new account
        // actions: [{
        //   account: 'eosadditapps',
        //   name: 'signup',
        //   authorization: [{
        //     actor: 'parkheechann',
        //     permission: 'active',
        //   }],
        //   data: {
        //     account: 'parkheechann',
        //     nickname: 'parkheechann',
        //     avatar: '',
        //     memo: 'Genesis Account',
        //   },
        // }],
        // add new opinion
        actions: [{
          account: 'eosadditapps',
          name: 'addit',
          authorization: [{
            actor: 'parkheechann',
            permission: 'active',
          }],
          data: {
            account: 'parkheechann',
            iopinion: -1,
            url: this.url,
            comment: this.comment,
          },
        }],
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      })
      Log.info('commentStore::write() - result', resp)
    } catch (err) {
      Log.error('commentStore::write()', err)
    }
  }

  @action delete() {
    this.comment = ''
  }
}

export const commentStore = new CommentStore()
export default commentStore
