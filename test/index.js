'use strict'

const test = require('ava')

const oEmbed = require('../src')

const { unsupportedUrls, supportedUrls } = require('./helpers/urls')

supportedUrls.forEach(url => {
  test(url, async t => {
    const output = await oEmbed(url)
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
  const output = await oEmbed('https://youtu.be/I8u2NdWuaYs', { maxwidth: 612 })
  t.true(output.width === 612)
})

test('handle camel case keys', async t => {
  const output = await oEmbed('https://youtu.be/I8u2NdWuaYs', { maxWidth: 612 })
  t.true(output.width === 612)
})
