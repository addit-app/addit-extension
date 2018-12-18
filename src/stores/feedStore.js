import {
  action,
  observable,
} from 'mobx'
import accountStore from './accountStore'
import Log from '../utils/debugLog'
import {
  eosApi,
  eosJs,
} from '../utils/eosJsApi'
import {
  isExtension,
} from '../utils/chromeApi'

class FeedStore {
  @observable feedItems = []

  @observable start = 0

  @observable end = -1

  @observable more = false

  @observable moreURL = false

  @observable url = ''

  @observable indexURL = -1

  @observable loading = true

  @observable voteLoading = false

  @observable voteResult = {}

  @observable voteResultModalOpen = false

  @action getFeed(url = this.url) {
    Log.info(`feedStore::getFeed(${url})`)

    eosApi.getTableRows(
      true, // json
      'eosadditapps', // contract
      'eosadditapps', // scope
      'domain', // table
      0, // key
      this.start, // start
      this.end, // end
      10000, // limit - MUSTFIX
    ).then((respURL) => {
      for (let index = 0; index < respURL.rows.length; index++) {
        if (respURL.rows[index].url === url) {
          this.indexURL = respURL.rows[index].index
          eosApi.getTableRows(
            true, // json
            'eosadditapps', // contract
            respURL.rows[index].index, // scope
            'comments', // table
            '', // key, deprecated
            this.start, // start
            this.end, // end
            100, // limit
          ).then((respComment) => {
            Log.info(`feedStore::getFeed(${url})`, { url, respComment })
            this.feedItems = respComment.rows.reverse()
            this.more = respComment.more
            this.loading = false
          }).catch((err) => {
            Log.error(`feedStore::getFeed(${url}) - EOS API`, err)
          })

          break
        } else {
          this.indexURL = -1
          this.feedItems = []
          this.loading = false
        }
      }
    }).catch((err) => {
      Log.error('feedStore::getFeed() - EOS API', err)
      this.loading = false
      this.deleteFeed()
    })
  }

  @action deleteFeed() {
    this.feedItems = []
  }

  @action setUrl(url) {
    this.url = url
  }

  @action vote(type = 1, commentId = null) {
    Log.info('feedStore::vote()', { type, commentId })
    this.voteLoading = true

    try {
      if (isExtension()) {
        /* eslint-disable */
        chrome.storage.local.get('keyPairs', items => {
          const pairs = items.keyPairs
          Object.keys(pairs).forEach((account) => {
            if (account === accountStore.currentAccount && commentId !== null) {
              const eos = eosJs(items.keyPairs[account])

              eos.transact({
                // vote
                actions: [{
                  account: 'eosadditapps',
                  name: 'vote',
                  authorization: [{
                    actor: accountStore.currentAccount,
                    permission: 'active',
                  }],
                  data: {
                    account: accountStore.currentAccount,
                    iopinion: this.indexURL,
                    icomment: commentId,
                    vote: type,
                  },
                }],
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              }).then((resp) => {
                this.voteLoading = false
                this.voteResult = resp
                this.voteResultModalOpen = true
                accountStore.getBalance()
                this.getFeed(this.url)
                Log.info('feedStore::write()::then', { voteResult: this.voteResult, type: typeof this.voteResult })
              }).catch((err) => {
                Log.error('feedStore::transact', err)
              })

              Log.info('feedStore::write() - voteResult', this.voteResult)
            } else {
              this.voteLoading = false
              this.voteResult = {
                'message': 'Some values are missing or incorrect.',
                type,
                commentId,
                iopinion: this.indexURL,
                url: this.url,
              }
              this.voteResultModalOpen = true
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
            name: 'vote',
            authorization: [{
              actor: accountStore.currentAccount,
              permission: 'active',
            }],
            data: {
              account: accountStore.currentAccount,
              iopinion: this.indexURL,
              icomment: commentId,
              vote: type,
            },
          }],
        }, {
          blocksBehind: 3,
          expireSeconds: 30,
        }).then((resp) => {
          this.voteLoading = false
          this.voteResult = resp
          this.voteResultModalOpen = true
          accountStore.getBalance()
          this.getFeed(this.url)
          Log.info('feedStore::vote()::eos - then', { voteResult: this.voteResult, type: typeof this.voteResult })
        }).catch((err) => {
          this.voteLoading = false
          this.voteResult = { error: err }
          this.voteResultModalOpen = true
          Log.error('feedStore::vote()::eos - err', err)
        })
      }
    } catch (err) {
      this.voteLoading = false
      Log.error('feedStore::vote() - err', err)
    }
  }
}

const feedStore = new FeedStore()
export default feedStore
