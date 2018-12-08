import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  Button,
  Input,
  message,
} from 'antd'
import {
  Div,
  Span,
} from 'glamorous'
import Log from '../utils/debugLog'

const { TextArea } = Input

@inject('commentStore')
@observer
class QuickEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      comment: '',
    }
  }

  editComment = (e) => {
    this.setState({
      comment: e.target.value,
    })
  }

  render() {
    Log.info('QuickEditor::render()', this.props, this.state)

    return (
      <Div
        height='220px'
        marginBottom='1rem'
        padding='0.6rem'
      >
        <Div
          height='1.8rem'
        >
          <Span
            fontWeight='bold'
            marginRight='10px'
            float='left'
          >
            URL
          </Span>
          <Span
            maxWidth='360px'
            whiteSpace='nowrap'
            overflow='hidden'
            textOverflow='ellipsis'
            float='left'
            display='inline-block'
          >
            {this.props.commentStore.comment || localStorage.getItem('url')}
          </Span>
        </Div>
        <TextArea
          name='comment'
          value={this.state.comment}
          rows={5}
          autosize={false}
          onChange={e => this.editComment(e)}
        />
        <Button
          type='primary'
          style={{
            float: 'right',
            marginTop: '1rem',
            marginRight: '1rem',
          }}
          onClick={() => {
            message.info('Submit')
            this.props.commentStore.write(this.state.comment)
            Log.info('QuickEditor::submit()', this.props, this.state)
          }}
        >
          Submit
        </Button>
      </Div>
    )
  }
}

export default QuickEditor
