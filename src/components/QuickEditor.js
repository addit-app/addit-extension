import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  Button,
  Icon,
  Input,
  message,
} from 'antd'
import {
  Div,
} from 'glamorous'
import Log from '../utils/debugLog'

const { TextArea } = Input

@inject('commentStore', 'feedStore')
@observer
class QuickEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      url: localStorage.getItem('url'),
      comment: '',
    }
  }

  updateStoreURL = () => {
    this.props.feedStore.setUrl(this.state.url)
    this.props.feedStore.getFeed(this.state.url)
    Log.info('QuickEditor::updateStoreURL()', this.props)
  }

  handleURL = (e) => {
    if (e.key === 'Enter') {
      this.updateStoreURL()
    } else {
      this.setState({
        url: e.target.value,
      })
    }
  }

  handleComment = (e) => {
    this.setState({
      comment: e.target.value,
    })
  }

  render() {
    Log.info('QuickEditor::render()', this.props, this.state)

    return (
      <Div
        height='220px'
        marginBottom='1rem'
        padding='0.6rem'
      >
        <Input
          name='url'
          value={this.state.url}
          placeholder='URL'
          onChange={e => this.handleURL(e)}
          addonBefore='URL'
          addonAfter={(
            <span role='presentation' onClick={() => this.updateStoreURL()}>
              <Icon type='sync' />
            </span>
          )}
          onPressEnter={() => this.updateStoreURL()}
          style={{
            marginBottom: '0.6rem',
          }}
        />
        <TextArea
          name='comment'
          value={this.state.comment}
          rows={5}
          autosize={false}
          onChange={e => this.handleComment(e)}
          style={{
            resize: 'none',
          }}
        />
        <Button
          type='primary'
          style={{
            float: 'right',
            marginTop: '0.6rem',
          }}
          onClick={() => {
            message.info('Submit')
            this.props.commentStore.write(this.state.comment)
            this.props.feedStore.getFeed(this.state.url)

            this.setState({ comment: '' })
            Log.info('QuickEditor::submit()', this.props, this.state)
          }}
        >
          Submit
        </Button>
      </Div>
    )
  }
}

export default QuickEditor
