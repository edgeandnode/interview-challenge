const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

require('dotenv').config()

module.exports = (phase, { defaultConfig }) => {
  const config = {
    ...withBundleAnalyzer({
      webpack: (config) => {
        return config
      },
      env: {
        NETWORK_HTTP_URI: 'https://api.thegraph.com/subgraphs/name/graphprotocol/graph-network-mainnet'
      },
      exportPathMap: async function (defaultPathMap) {
        return defaultPathMap
      },
    }),
  }

  return config
}
