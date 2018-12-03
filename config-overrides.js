/* eslint-disable */
const path = require('path')
const { injectBabelPlugin } = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')

module.exports = function override(config, env) {
  config = injectBabelPlugin(['@babel/plugin-proposal-decorators', { legacy:true }], config)
  config = injectBabelPlugin(['import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }],
    config,
  )

  config = rewireLess.withLoaderOptions({
    modifyVars: {
      // '@primary-color': '#303030',
    },
    javascriptEnabled: true,
  })(config, env)

  return config
}
