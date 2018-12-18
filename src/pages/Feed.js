import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  Alert,
  Button,
  Col,
  Icon,
  List,
  Modal,
  Row,
  // Spin,
  message,
} from 'antd'
import ReactJson from 'react-json-view'
import styled from 'styled-components'
import QuickEditor from '../components/QuickEditor'
import CommentCard from '../components/card/CommentCard'
import Log from '../utils/debugLog'

const FlexRow = styled(Row)`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  @media (max-width: 700px) {
    max-width: 100%;
    margin: 0 auto !important;
  }
`
const FlexCol = styled(Col)`
  width: 100%;
  max-width: 520px;
  margin-top: 1rem;
  @media (max-width: 700px) {
    max-width: 100%;
    padding: 0 !important;
  }
`

@inject('feedStore', 'commentStore')
@observer
class Feed extends React.Component {
  fetching = false

  constructor(props) {
    super(props)

    this.props.feedStore.getFeed(this.props.feedStore.url)
  }

  componentDidMount() {
    this.fetching = setInterval(() => this.props.feedStore.getFeed(this.props.feedStore.url), 5000)
  }

  componentWillUnmount() {
    clearInterval(this.fetching)
    message.destroy()
  }

  render() {
    Log.info('Feed::render()', this.props)

    return (
      <div>
        <FlexRow
          gutter={16}
          type='flex'
          justify='center'
        >
          <FlexCol>
            <Alert
              message='Private Beta'
              description='Addit is still under the development. Stay tuned!'
              type='info'
              showIcon
              style={{
                margin: '1rem',
              }}
            />
            <QuickEditor />
            <List
              grid={{
                gutter: 1,
              }}
              dataSource={this.props.feedStore.feedItems}
              renderItem={comment => (
                <List.Item>
                  <CommentCard {...comment} />
                </List.Item>
              )}
              loading={{
                spinning: this.props.feedStore.loading,
                indicator: (<Icon type='loading' style={{ fontSize: '3rem' }} spin />),
              }}
              locale={{
                emptyText: 'Leave first opinion. :)',
              }}
            />
          </FlexCol>
        </FlexRow>
        <Modal
          title='Action Results'
          visible={this.props.feedStore.voteResultModalOpen}
          onCancel={() => {
            this.props.feedStore.voteResultModalOpen = false
          }}
          footer={[
            <Button
              key='ok'
              onClick={() => {
                this.props.feedStore.voteResultModalOpen = false
              }}
            >
              Return
            </Button>,
          ]}
          maskClosable
        >
          <ReactJson
            src={this.props.feedStore.voteResult}
            style={{
              overflow: 'scroll',
            }}
          />
          {/* {JSON.stringify(this.props.feedStore.voteResult)} */}
        </Modal>

      </div>
    )
  }
}

export default Feed
