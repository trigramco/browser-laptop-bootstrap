const config = require('../lib/config')
const util = require('../lib/util')

const versions = (buildConfig = config.defaultBuildConfig, options = {}) => {
  config.buildConfig = buildConfig
  config.update(options)

  console.log('chrome ' + config.getProjectRef('chrome'))
  console.log('muon ' + config.getProjectRef('muon'))
  console.log('canopy ' + config.getProjectRef('canopy'))
}

module.exports = versions
