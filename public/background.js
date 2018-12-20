window.onload = () => {
  console.log('[ background.js ]')
  /* eslint-disable */
  chrome.tabs.query({
    'active': true,
    'currentWindow': true,
    'lastFocusedWindow': true
  }, (tabs) => {
    localStorage.setItem('url', tabs[0].url)
    localStorage.setItem('tabs', JSON.stringify(tabs))
    console.log(`[ background.js ] - ${tabs[0]} - ${tabs}`)
  })
  /* eslint-enable */
}
