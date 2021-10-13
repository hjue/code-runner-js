'use strict'

// require modules
const ip = require('ip')
const fs = require('fs-extra')
const winston = require('winston')

const express = require('express')
var cors = require('cors')
const config = require('./config')
const runCode = require('./run-code')

// Constants
const PORT = 8000
const app = express()

if (config.LOG) {
  winston.configure({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'server-logs.log' })
    ]
  })
}

runCode.init(winston)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('./dist'))

// root
app.get('/', (req, res) => {
  res.sendFile('./dist/index.html', { root: __dirname })
})

// Error Handling Middleware
app.use((err, req, res, next) => {
  winston.log('error', err.message)
  res.status(500).render('error', {
    message: err.message,
    error: err
  })
})

app.post('/runcode', async (req, res, next) => {
  console.log(req.body)
  const content = req.body['files'][0]['content']
  const name = req.body['files'][0]['name']
  let language = req.body['files'][0]['language']
  if (!language) {
    language = 'java'
  }
  let dirname

  try {
    dirname = await fs.mkdtemp('./run/tmp_')
    winston.log('info', `created directory ${dirname}`)

    await fs.writeFile(`${dirname}/${name}`, content)
    winston.log('info', `created file ${dirname}/${name}`)

    const result = await runCode.run(`${dirname}/${name}`, language)
    res.send(result)
  } catch (e) {
    next(e)
  } finally {
    await fs.remove(dirname)
    winston.log('info', `removed directory ${dirname}`)
  }
})

// Start server
app.listen(PORT, async () => {
  try {
    await fs.mkdir('run')
    console.log(`created run folder`)
  } catch (e) {
    console.log('run directory already exists')
  } finally {
    console.log(`Running on http://${ip.address()}:${PORT}`)
  }
})
