'use strict'

const test = require('ava')

const findProvider = require('../../src/find-provider')

const { unsupportedUrls } = require('../helpers/urls')

unsupportedUrls.forEach(url => {
  test(JSON.stringify(url), t => {
    t.true(findProvider(url) === undefined)
  })
})
