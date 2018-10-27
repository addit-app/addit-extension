import React from 'react'
import {
  Card,
  Form,
  Input,
  List,
  Icon,
  Avatar,
  Button,
} from 'antd';
import {
  Div,
  H2,
} from 'glamorous'
import faker from 'faker'
import styled from 'styled-components'

const FormItem = Form.Item;
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

const UpperDiv = styled(Div)`
  margin-bottom: 1rem;
`
const AlignText = styled(H2)`
  text-align: center;
`

const tabListNoTitle = [{
  key: 'KLAY',
  tab: 'KLAY',
}, {
  key: 'ADDIT',
  tab: 'ADDIT',
}];

const contentListNoTitle = {
  KLAY: <AlignText>1000 KLAY</AlignText>,
  ADDIT: <AlignText>10 ADDIT</AlignText>,
};

export default class Feed extends React.Component {
  constructor() {
    super()
    this.state = {
      noTitleKey: 'KLAY',
    }
  }

  onTabChange = (key, type) => {
    this.setState({
      [type]: key,
    });
  }


  handleSelectChange = (value) => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  }

  render() {
    const data = []
    faker.seed(1123)
    for (let index = 1; index <= 5; index++) {
      const item = {
        username: '0x55a6f3603ffceedaa46bb545bb28699559dc8460',
        content: faker.random.number(100),
      }

      data.push(item)
    }

    return (
      <Div
        margin='10px'
      >
        <UpperDiv>
          <Card
            style={{ width: '100%' }}
            tabList={tabListNoTitle}
            activeTabKey={this.state.noTitleKey}
            onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}
          >
            {contentListNoTitle[this.state.noTitleKey]}
          </Card>
        </UpperDiv>
        <UpperDiv>
          <Form>
            <FormItem
              label='Receiver'
            >
              <Input placeholder='0 KLAY' />
            </FormItem>
            <FormItem
              label='Fee'
            >
              <Input placeholder='0 KLAY' />
            </FormItem>
            <FormItem
              wrapperCol={{ span: 24, offset: 9 }}
            >
              <Button type='primary' htmlType='submit'>
                Send
              </Button>
            </FormItem>
          </Form>
        </UpperDiv>
        <Div>
          <List
            itemLayout='horizontal'
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.username}
                  description={item.content + ' KLAY'}
                />
              </List.Item>
            )}
          />
        </Div>
      </Div>
    )
  }
}
