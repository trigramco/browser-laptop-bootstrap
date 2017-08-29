const config = require('../lib/config')
const util = require('../lib/util')

const build = (buildConfig = config.defaultBuildConfig, options) => {
  config.buildConfig = buildConfig
  config.update(options)

  if (options.sign_widevine) {
    config.sign_widevine = true
  }

  if (options.sign_widevine_passphrase) {
    config.sign_widevine_passphrase = options.sign_widevine_passphrase
  }

  if (options.sign_widevine_key) {
    config.sign_widevine_key = options.sign_widevine_key
  }

  if (options.sign_widevine_cert) {
    config.sign_widevine_cert = options.sign_widevine_cert
  }

  if (!options.no_branding_update) {
    util.updateBranding()
  }

  if (!options.muon) {
    util.buildNode()
  }

  if (!options.node) {
    util.buildMuon()
  }
}

module.exports = build
