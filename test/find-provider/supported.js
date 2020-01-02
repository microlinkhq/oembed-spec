'use strict'

const test = require('ava')

const findProvider = require('../../src/find-provider')

const { supportedUrls } = require('../helpers/urls')

supportedUrls.forEach(url => {
  const baseUrl = url.replace(/^\/\/|^https?:\/\/(?:www\.)?/, '')

  const variationsUrls = [
    `http://${baseUrl}`,
    `https://${baseUrl}`,
    `http://www.${baseUrl}`,
    `https://www.${baseUrl}`
  ]

  variationsUrls.forEach(url => {
    test(url, t => {
      t.true(findProvider(url) !== undefined)
    })
  })
})

test('suffix variation', t => {
  const url = 'https://gloria.pro/video/FRqEWoz7GfGt1pfhD4krcgyqC'
  t.true(findProvider(url) !== undefined)
})

test('case insensitive', t => {
  const url = 'https://Youtu.BE/I8u2NdWuaYs'
  t.true(findProvider(url) !== undefined)
})
