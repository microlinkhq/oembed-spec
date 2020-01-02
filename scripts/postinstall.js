'use strict'

const PROVIDERS_URL = 'https://oembed.com/providers.json'

const { writeFile } = require('fs').promises
const path = require('path')
const got = require('got')

const normalizeProviders = require('./normalize')

const fetch = url => got(url, { json: true }).then(res => res.body)

fetch(PROVIDERS_URL)
  .then(json =>
    writeFile(
      path.resolve(__dirname, '../src/providers.json'),
      JSON.stringify(normalizeProviders(json), null, 2)
    )
  )
  .catch(err => console.error(err) && process.exit(1))
