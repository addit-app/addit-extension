import createHistory from 'history/createBrowserHistory'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-130291307-1', {
  // debug: false,
  debug: true,
  // titleCase: false,
  // gaOptions: {
  //   userId: 123,
  // },
  gaAddress: 'https://ssl.google-analytics.com/ga.js',
})

const history = createHistory()
// history.listen(() => {
//   window.location.hash.substring(2)
history.listen((location) => {
  ReactGA.pageview(location.hash.substring(1))
})

export default history
