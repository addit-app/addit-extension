import React from 'react'
import {
  Button,
  Input,
} from 'antd'
import {
  Div,
  Span,
} from 'glamorous'

const { TextArea } = Input

export default class QuickEditor extends React.Component {
  render() {
    return (
      <Div
        height='160px'
      >
        <Span
          fontWeight='bold'
          marginRight='10px'
        >
          URL
        </Span>
        <Span
          maxWidth='400px'
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
        >
          {localStorage.getItem('url')}
        </Span>
        <TextArea rows={4} />
        <Button
          type='primary'
          style={{
            float: 'right',
            marginTop: '10px',
          }}
        >
          Submit
        </Button>
      </Div>
    )
  }
}
