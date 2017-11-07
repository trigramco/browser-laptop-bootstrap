const path = require('path')
const config = require('../lib/config')
const util = require('../lib/util')

const start = (buildConfig = config.defaultBuildConfig, options) => {
  config.buildConfig = buildConfig
  config.update(options)

  const braveArgs = [
    '--user-data-dir-name=' + options.user_data_dir_name,
    '--enable-logging',
    '--debug=5858',
    '--source-root=' + path.join(__dirname, '..', 'src', 'browser-laptop'),
    '--v=' + options.v,
  ]
  if (options.no_sandbox) {
    braveArgs.push('--no-sandbox')
  }
  braveArgs.push(path.join(config.projects.browser_laptop.dir))

  let cmdOptions = {
    env: Object.assign(process.env, {
      npm_package_config_port: 8080,
      NODE_ENV: options.node_env
    }),
    stdio: 'inherit',
    shell: true
  }

  let cmd
  if (process.platform === 'darwin') {
    cmd = path.join(config.outputDir, 'Brave.app', 'Contents', 'MacOS', 'Brave')
  } else if (process.platform === 'win32') {
    cmd = path.join(config.outputDir, 'brave.exe')
  } else {
    cmd = path.join(config.outputDir, 'brave')
  }

  let args = braveArgs
  if (options.gdb) {
    args = ['--args', cmd, ...braveArgs]
    cmd = 'gdb'
  } else if (options.lldb) {
    args = ['--', cmd, ...braveArgs]
    cmd = 'lldb'
  }

  util.run(cmd, args, cmdOptions)
}

module.exports = start
