window.onload = () => {
  console.log('[ Background.js ]')
  /* eslint-disable */
  chrome.tabs.query({
    'active': true,
    'currentWindow': true,
    'lastFocusedWindow': true
  }, (tabs) => {
    localStorage.setItem('url', tabs[0].url)
    localStorage.setItem('tabs', JSON.stringify(tabs))
  })
  /* eslint-enable */
}
