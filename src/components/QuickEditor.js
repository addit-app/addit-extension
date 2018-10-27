import React from 'react'
import {
  Button,
  Input,
} from 'antd'
import {
  Div,
} from 'glamorous'

const { TextArea } = Input

export default class QuickEditor extends React.Component {
  render() {
    return (
      <Div>
        <TextArea rows={4} />
        <Button type='primary'>Submit</Button>
      </Div>
    )
  }
}
