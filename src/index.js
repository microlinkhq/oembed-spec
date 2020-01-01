'use strict'

const { URL } = require('url')
const got = require('got')

const findProvider = require('./find-provider')

const RE_FORMAT = /\{format\}/g

const fetchProvider = async (provider, opts) => {
  const oembedUrl = new URL(provider.oembedUrl.replace(RE_FORMAT, 'json'))

  Object.keys(opts).forEach(key =>
    oembedUrl.searchParams.append(key, opts[key])
  )

  const { body } = await got(oembedUrl.toString(), { json: true })

  body.provider_name = provider.name
  body.provider_url = provider.url

  return body
}

module.exports = async (url, opts = {}) => {
  const provider = findProvider(url)
  return provider !== undefined
    ? fetchProvider(provider, { ...opts, url, format: 'json' })
    : undefined
}

module.exports.findProvider = findProvider
module.exports.fetchProvider = fetchProvider
