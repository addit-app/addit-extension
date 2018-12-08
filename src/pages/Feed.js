import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  Alert,
  List,
  Col,
  Row,
} from 'antd'
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

@inject('feedStore')
@observer
class Feed extends React.Component {
  render() {
    Log.info('Feed::render()')
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
              loading={this.props.feedStore.loading}
            />
          </FlexCol>
        </FlexRow>
      </div>
    )
  }
}

export default Feed
