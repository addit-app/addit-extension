import React from 'react'
import {
  Button,
  Input,
} from 'antd'
import {
  Div,
  P,
  Span,
} from 'glamorous'

const { TextArea } = Input

export default class QuickEditor extends React.Component {
  constructor() {
    super()

    this.state = {
      content: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

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
        <P
          maxWidth='300px'
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
        >
          {localStorage.getItem('url')}
        </P>
        <TextArea
          name='content'
          value={this.state.content}
          rows={3}
          autosize={false}
          onChange={e => this.handleChange(e)}
        />
        <Button
          type='primary'
          style={{
            float: 'right',
            marginTop: '10px',
          }}
          onClick={() => {
            this.props.addComment(this.state.content)
            this.setState({ content: '' })
          }}
        >
          Submit
        </Button>
      </Div>
    )
  }
}
