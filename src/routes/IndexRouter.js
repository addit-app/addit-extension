/* global chrome */
import React from 'react'

export default class IndexRouter extends React.Component {
  render() {
    let tab = null
    let url = null
    localStorage.setItem('nickname', 'channprj')
    localStorage.setItem('address', '0x58BEa8bD7938be0d87B2B235920BDeC828225c5e')
    localStorage.setItem('privateKey', 'channprj')

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
