import React from 'react'
import {
  Avatar,
  Icon,
  List,
} from 'antd'
import {
  Div,
} from 'glamorous'
import faker from 'faker'
import styled from 'styled-components'
import QuickEditor from '../components/QuickEditor'
import {
  getCurrentTabURL,
} from '../libs/chromeApi'

const UserAvatar = styled(Avatar)`
  margin-right: 10px;
`

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

export default class Feed extends React.Component {
  constructor() {
    super()

    getCurrentTabURL()
  }

  render() {
    const data = []

    for (let index = 1; index <= 20; index++) {
      const item = {
        username: (
          <div>
            <UserAvatar
              src={faker.internet.avatar()}
              shape='circle'
              icon='user'
            />
            <span>{faker.internet.userName()}</span>
          </div>
        ),
        content: faker.lorem.sentence(),
      }

      data.push(item)
    }

    return (
      <Div
        margin='10px'
      >
        <QuickEditor />
        <List
          itemLayout='vertical'
          dataSource={data}
          renderItem={item => (
            <List.Item
              actions={[
                <IconText type='up' text={faker.random.number() % 1000} />,
                <IconText type='down' text={faker.random.number() % 100} />,
                <IconText type='dollar' text={faker.random.number() / 10000} />,
              ]}
            >
              <List.Item.Meta
                avatar={(
                  <Avatar
                    src={faker.internet.avatar()}
                    shape='circle'
                    icon='user'
                  />
                )}
                title={item.username}
                description={item.content}
              />
              {/* <IconText type='dollar' text={faker.random.number() / 10000} /> */}
            </List.Item>
          )}
        />
      </Div>
    )
  }
}
