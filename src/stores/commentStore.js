import {
  action,
  observable,
} from 'mobx'
import Log from '../utils/debugLog'

class CommentStore {
  @observable comment = [{
    account: 'initaccount1',
    comment: 'Initial comment',
    upvote: 0,
    downvote: 0,
    blocktime: 1544000496868,
  }]

  @observable loading = false

  @observable result

  @action addComment() {
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

  @action deleteComment() {
    this.loading = true
    return this.deleteComment()
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
}

export default new CommentStore()
