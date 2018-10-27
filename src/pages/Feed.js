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
import QuickEditor from '../components/QuickEditor'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

export default class Feed extends React.Component {
  render() {
    const data = []

    for (let index = 1; index <= 20; index++) {
      const item = {
        username: faker.internet.userName(),
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
          itemLayout='horizontal'
          dataSource={data}
          renderItem={item => (
            <List.Item
              actions={[
                <IconText type='up' text={faker.random.number() % 1000} />,
                <IconText type='down' text={faker.random.number() % 100} />,
              ]}
              // extra={(
              //   <div>
              //     <Icon type='up' theme='outlined' />
              //     <Icon type='down' theme='outlined' />
              //   </div>
              // )}
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
            </List.Item>
          )}
        />
      </Div>
    )
  }
}
