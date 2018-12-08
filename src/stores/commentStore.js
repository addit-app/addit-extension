import {
  action,
  observable,
} from 'mobx'
import Log from '../utils/debugLog'

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
  }

  @action delete() {
    this.comment = ''
  }
}

export default new CommentStore()
