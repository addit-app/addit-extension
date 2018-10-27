/* global chrome */

export function getCurrentTabURL() {
  /* eslint-disable */
  try {
    chrome.tabs.query({
      'active': true,
      'currentWindow': true,
      'lastFocusedWindow': true
    }, (tabs) => {
      localStorage.setItem('url', tabs[0].url)
      localStorage.setItem('tabs', JSON.stringify(tabs))
      return tabs[0].url
    })
  } catch (error) {
    console.log('chrome property is not available: ', error)
  }
  /* eslint-enable */
}

export default getCurrentTabURL
