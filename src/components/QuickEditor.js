import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  Button,
  Icon,
  Input,
  Modal,
  message,
} from 'antd'
import ReactJson from 'react-json-view'
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
      disabled: true,
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
    }, () => {
      if (this.state.comment.length > 0) {
        this.setState({
          disabled: false,
        })
      } else {
        this.setState({
          disabled: true,
        })
      }
    })
  }

  render() {
    Log.info('QuickEditor::render()', this.props, this.state)

    if (this.props.commentStore.loading === false) {
      message.destroy()
    }

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
            message.loading('Submitting...')
            this.props.commentStore.write(this.state.comment)
            this.props.feedStore.getFeed(this.state.url)

            this.setState({ comment: '' })
            Log.info('QuickEditor::submit()', this.props, this.state)
          }}
          disabled={this.state.disabled}
        >
          Submit
        </Button>
        <Modal
          title='Action Results'
          visible={this.props.commentStore.resultModalOpen}
          onCancel={() => {
            this.props.commentStore.resultModalOpen = false
          }}
          footer={[
            <Button
              key='ok'
              onClick={() => {
                this.props.commentStore.resultModalOpen = false
              }}
            >
              Return
            </Button>,
          ]}
          maskClosable
        >
          <ReactJson
            src={this.props.commentStore.result}
            style={{
              overflow: 'scroll',
            }}
          />
          {/* {JSON.stringify(this.props.commentStore.result)} */}
        </Modal>
      </Div>
    )
  }
}

export default QuickEditor
