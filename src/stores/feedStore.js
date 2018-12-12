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

  @observable scopeURL = 0

  @observable loading = false

  @action getFeed(url) {
    Log.info('feedStore::getFeed()')
    this.loading = true
    eosApi.getTableRows(
      true, // json
      'eosadditapps', // contract
      'eosadditapps', // scope
      'opinion', // table
      0, // key
      this.start, // start
      this.end, // end
      10000, // limit - MUSTFIX
    ).then((respURL) => {
      for (let index = 0; index < respURL.rows.length; index++) {
        if (respURL.rows[index].url === url) {
          this.scopeURL = respURL.rows[index].index
          eosApi.getTableRows(
            true, // json
            'eosadditapps', // contract
            respURL.rows[index].index, // scope
            'comments', // table
            0, // key
            this.start, // start
            this.end, // end
            10, // limit
          ).then((respComment) => {
            Log.info('feedStore::getFeed(URL)', { url, respComment })
            this.feedItems = respComment.rows
            this.more = respComment.more
          }).catch((err) => {
            Log.error('feedStore::getFeed()', err)
          })
        } else {
          this.scopeURL = 0
        }
      }
    }).catch((err) => {
      Log.error('feedStore::getFeed()', err)
    })

    this.loading = false
  }

  @action deleteFeed() {
    this.feedItems = []
  }
}

export const feedStore = new FeedStore()
export default feedStore
