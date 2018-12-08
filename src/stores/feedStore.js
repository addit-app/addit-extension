import {
  action,
  observable,
} from 'mobx'
import Log from '../utils/debugLog'

class FeedStore {
  @observable feedItems = [
    {
      id: 0,
      account: 'sampleaccount0',
      comment: 'Comment 0',
      upvote: 0,
      downvote: 0,
      blocktime: 0,
      reward: 0,
    },
    {
      id: 1,
      account: 'sampleaccount1',
      comment: 'Comment 1',
      upvote: 0,
      downvote: 0,
      blocktime: 0,
      reward: 0,
    },
    {
      id: 2,
      account: 'sampleaccount2',
      comment: 'Comment 2',
      upvote: 0,
      downvote: 0,
      blocktime: 0,
      reward: 0,
    },
    {
      id: 3,
      account: 'sampleaccount3',
      comment: 'Comment 3',
      upvote: 0,
      downvote: 0,
      blocktime: 0,
      reward: 0,
    },
    {
      id: 4,
      account: 'sampleaccount4',
      comment: 'Comment 4',
      upvote: 0,
      downvote: 0,
      blocktime: 0,
      reward: 0,
    },
  ]

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
