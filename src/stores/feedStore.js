import {
  action,
  observable,
} from 'mobx'
import Log from '../utils/debugLog'

class FeedStore {
  @observable feedItems = [{
    account: 'initaccount1',
    comment: 'Initial comment',
    upvote: 0,
    downvote: 0,
    blocktime: 1544000496868,
  }]

  @observable loading = false

  @action readAccount() {
    this.loading = true
    return this.api.readAccount()
      .then(action(({ resp }) => {
        this.feedItems = resp
      }))
      .catch((err) => {
        Log.error('accountStore::readAccount()', err)
      })
      .finally(action(() => {
        this.loading = false
      }))
  }

  @action deleteFeed() {
    this.feedItems = []
  }
}

export default new FeedStore()
