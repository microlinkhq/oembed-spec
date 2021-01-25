'use strict'

const test = require('ava')

const oEmbed = require('../src')

const { unsupportedUrls, supportedUrls } = require('./helpers/urls')

supportedUrls.forEach(([url, opts]) => {
  test(url, async t => {
    const output = await oEmbed(url, opts)
    t.true(!!output.provider_name)
    t.true(!!output.provider_url)
  })
})

unsupportedUrls.forEach(url => {
  test(JSON.stringify(url), async t => {
    const output = await oEmbed(url)
    t.true(output === undefined)
  })
})

test('pass specific oEmbed parameters', async t => {
  const output = await oEmbed('http://flickr.com/photos/bees/2362225867/', {
    maxwidth: 300,
    maxheight: 75
  })
  t.true(output.height === 75)
})

test('handle camel case keys', async t => {
  t.true(
    (
      await oEmbed('http://flickr.com/photos/bees/2362225867/', {
        maxwidth: 300,
        maxHeight: 75
      })
    ).height === 75
  )
})
