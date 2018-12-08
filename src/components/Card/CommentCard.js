import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  Avatar,
  Button,
  Card,
  Icon,
  Tooltip,
} from 'antd'
import styled from 'styled-components'

// const colors = {
//   'primary': '#1890ff',
//   'success': '#52c41a',
//   'warning': '#fadb14',
//   'error': '#f5222d',
// }
const TitleAvatar = styled(Avatar)`
  margin-right: 0.6rem !important;
`
const UpperDiv = styled.div`
  margin-bottom: 1rem;
`
const Timestamp = styled.span`
  color: #888;
  font-style: italic;
`
const Comment = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  font-weight: normal;
  color: black;
`
const MetaDiv = styled.div`
  width: 50%;
  float: left;
`
const RewardDiv = styled.div`
  width: 50%;
  float: right;
  text-align: right;
`
const MetaIconLink = styled.a`
  margin-right: 8px;
  color: #99aab5;
  transition: none;
`

@inject('accountStore')
@observer
class CardTemplate extends React.Component {
  render() {
    return (
      <Card
        title={(
          <span>
            <TitleAvatar
              src={`https://avatars.dicebear.com/v2/identicon/${this.props.account}.svg`}
              shape='circle'
              icon='user'
            />
            {this.props.account}
            <Timestamp> - BlockTime : {this.props.blocktime}</Timestamp>
          </span>
          )}
        type='inner'
        extra={(
          <div>
            <Tooltip title='Work in Progress...'>
              <Button>More</Button>
            </Tooltip>
          </div>
        )}
      >
        <UpperDiv>
          <Comment>
            {this.props.comment}
          </Comment>
        </UpperDiv>

        <MetaDiv>
          <MetaIconLink role='presentation'>
            <Icon type='like' /> {this.props.upvote}
          </MetaIconLink>
          <MetaIconLink role='presentation'>
            <Icon type='dislike' /> {this.props.downvote}
          </MetaIconLink>
        </MetaDiv>
        <RewardDiv>
          <MetaIconLink role='presentation'>
            <Icon type='dollar' /> {this.props.reward}
          </MetaIconLink>
        </RewardDiv>
      </Card>
    )
  }
}

export default CardTemplate
