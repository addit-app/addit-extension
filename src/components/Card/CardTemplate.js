import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  Badge,
  Card,
  Icon,
  Progress,
  Tooltip,
} from 'antd'
import styled from 'styled-components'
import bytes from 'bytes'

const colors = {
  'primary': '#1890ff',
  'success': '#52c41a',
  'warning': '#fadb14',
  'error': '#f5222d',
}
const TitleIcon = styled(Icon)`
  margin-left: 8px;
  margin-right: 8px;
`
const TitleBadge = styled(Badge)`
  margin-left: 8px;
  margin-right: 8px;
  vertical-align: inherit;
`

const TitleLink = styled.a`
  margin-right: 8px;
`

const UpperDiv = styled.div`
  margin-bottom: 1rem;
`
const Label = styled.span`
  font-size: 1rem;
  font-weight: 500;
  margin-right: 1rem;
  display: block;
`
const Data = styled.span`
  font-size: 1.8rem;
  font-weight: normal;
  color: black;
`
const SubDiv = styled.div`
  line-height: 0.8;
`
const SubLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  margin-left: 1rem;
  margin-right: 1rem;
  display: inline;
`
const SubData = styled.span`
  font-size: 0.8rem;
  font-weight: normal;
  line-height: 0.8;
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
            <TitleIcon type='info-circle' />
            Sample Card Template
          </span>
          )}
        type='inner'
        extra={(
          <div>
            <TitleIcon type='sync' spin />
            <Tooltip title='Update every 5s'>
              <TitleBadge
                status='processing'
                text='Live'
              />
            </Tooltip>
            <TitleLink>More</TitleLink>
          </div>
        )}
        loading={this.state.loading}
      >
        <UpperDiv>
          <Label>Label</Label>
          <Data>Data Here</Data>
        </UpperDiv>
        <UpperDiv>
          <Progress
            type='line'
            percent={20}
            strokeColor={colors.primary}
            format={() => 'CPU'}
          />
          <Progress
            type='line'
            percent={40}
            strokeColor={colors.warning}
            format={() => 'NET'}
          />
          <Progress
            type='line'
            percent={80}
            strokeColor={colors.error}
            format={() => 'RAM'}
          />
          <Progress
            type='circle'
            percent={90}
            format={() => 'Custom Text'}
          />
          <Progress
            type='dashboard'
            percent={90}
            format={() => 'Custom Text'}
          />
        </UpperDiv>
        <UpperDiv>
          <Label>CPU</Label>
          <Data>
            <SubDiv>
              <SubLabel>Quota</SubLabel>
              <SubData>{ bytes(123123123, { unitSeparator: ' ' }) }</SubData>
            </SubDiv>
            <SubDiv>
              <SubLabel>Used</SubLabel>
              <SubData>{ bytes(123123123, { unitSeparator: ' ' }) }</SubData>
            </SubDiv>
            <SubDiv>
              <SubLabel>Available</SubLabel>
              <SubData>{ bytes(123123123, { unitSeparator: ' ' }) }</SubData>
            </SubDiv>
          </Data>
        </UpperDiv>

        <div>
          Bottom div
        </div>
      </Card>
    )
  }
}

export default CardTemplate
