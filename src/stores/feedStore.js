import {
  action,
  observable,
} from 'mobx'
import Log from '../utils/debugLog'
import { eosApi } from '../utils/eosJsApi'

class FeedStore {
  @observable feedItems = []

  @observable start = 0

  @observable end = -1

  @observable more = false

  @observable moreURL = false

  @observable url = ''

  @observable indexURL = -1

  @observable loading = true

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

  @action vote(type = 1, commentId = 0) {
    Log.info('feedStore::vote()', { type, commentId })
  }
}

const feedStore = new FeedStore()
export default feedStore
