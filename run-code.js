'use strict'

// require modules
const config = require('./config')
const exec = require('child-process-promise').exec
const path = require('path')

const runCode = {}

runCode.init = (logger) => {
  if (logger) {
    this.logger = logger
  } else {
    this.logger = require('winston')
  }
}

var runCommand = (filename, language) => {
  let command = ''
  switch (language.toLowerCase()) {
    case 'java':
      const runFile = path.parse(filename, '.java').name
      const sourceFile = path.parse(filename, '.java').base
      const dir = path.parse(filename, '.java').dir
      command = `ulimit -t ${config.TIMEOUT};cd ${dir};javac ${sourceFile} && java -Xmx128M -Xms16M  ${runFile}`
      break
    case 'python':
      command = `ulimit -t ${config.TIMEOUT};python ${filename} `
      break
    case 'javascript':
      command = `ulimit -t ${config.TIMEOUT};node  ${filename}`
      break
    case 'sql':
      command = `ulimit -t ${config.TIMEOUT};mysql -uroot test <  ${filename}`

      break
    default:
      break
  }
  return command
}
runCode.run = async (filename, language) => {
  try {
    let command = runCommand(filename, language)
    this.logger.log('info', `executed command:  ` + command)
    const result = await exec(command)
    return {
      success: true,
      output: result.stdout + result.stderr
    }
  } catch (err) {
    console.log(err)
    return {
      success: false,
      output: err.stdout + err.stderr
    }
  }
}

module.exports = runCode
