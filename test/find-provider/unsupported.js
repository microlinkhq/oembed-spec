'use strict'

const test = require('ava')

const findProvider = require('../../src/find-provider')

const { unsupportedUrls } = require('../helpers/urls')

unsupportedUrls.forEach((url, index) => {
  test(`case ${index} (${String(url)})`, t => {
    t.true(findProvider(url) === undefined)
  })
})
