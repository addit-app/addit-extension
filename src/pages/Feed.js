import React from 'react'
import {
  Alert,
  List,
  Col,
  Row,
} from 'antd'
import styled from 'styled-components'
import CommentCard from '../components/Card/CommentCard'

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

const data = [
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
  {
    id: 5,
    account: 'sampleaccount5',
    comment: 'Comment 5',
    upvote: 0,
    downvote: 0,
    blocktime: 0,
    reward: 0,
  },
]

class Feed extends React.Component {
  render() {
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
                marginBottom: '1rem',
              }}
            />
            <List
              grid={{
                gutter: 1,
              }}
              dataSource={data}
              renderItem={comment => (
                <List.Item>
                  <CommentCard {...comment} />
                </List.Item>
              )}
            />
          </FlexCol>
        </FlexRow>
      </div>
    )
  }
}

export default Feed
