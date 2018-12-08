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
const MetaIconLink = styled.a`
  margin-right: 8px;
  color: #99aab5;
  transition: none;
`
const UpperDiv = styled.div`
  margin-bottom: 1rem;
`
const Comment = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  font-weight: normal;
  color: black;
`

@inject('accountStore')
@observer
class CardTemplate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 2000)
  }

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
        loading={this.state.loading}
      >
        <UpperDiv>
          <Comment>
            {this.props.comment}
          </Comment>
        </UpperDiv>

        <div>
          <MetaIconLink role='presentation'>
            <Icon type='like' /> {this.props.upvote}
          </MetaIconLink>
          <MetaIconLink role='presentation'>
            <Icon type='dislike' /> {this.props.downvote}
          </MetaIconLink>
        </div>
      </Card>
    )
  }
}

export default CardTemplate
