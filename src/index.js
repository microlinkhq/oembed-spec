'use strict'

const { URL } = require('url')
const got = require('got')

const findProvider = require('./find-provider')

const RE_FORMAT = /\{format\}/g

module.exports = async (url, opts = {}) => {
  const provider = findProvider(url)
  if (provider === undefined) return undefined

  const oembedUrl = new URL(provider.oembedUrl.replace(RE_FORMAT, 'json'))

  oembedUrl.searchParams.append('format', 'json')
  oembedUrl.searchParams.append('url', url)

  Object.keys(opts).forEach(key =>
    oembedUrl.searchParams.append(key, opts[key])
  )

  const { body } = await got(oembedUrl.toString(), { json: true })

  body.provider_name = provider.name
  body.provider_url = provider.url

  return body
}

module.exports.findProvider = findProvider
