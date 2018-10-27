import React from 'react'

export default class IndexRouter extends React.Component {
  render() {
    let tab = null
    let url = null

    /* eslint-disable */
    if (typeof chrome.tabs === 'undefined') {
      console.log('the property is not available...');
    } else {
      chrome.tabs.query({
        active: true,
        currentWindow: true,
      }, (tabs) => {
        tab = tabs[0]
        url = tabs.url
      })
    }
    /* eslint-enable */

    return (
      <div>
        IndexRouter
        <div>tab: {tab}</div>
        <div>url: {url}</div>
      </div>
    )
  }
}
