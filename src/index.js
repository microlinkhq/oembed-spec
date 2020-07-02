'use strict'

const { URL } = require('url')
const got = require('got')

const findProvider = require('./find-provider')

const RE_FORMAT = /\{format\}/g

const fetchProvider = async (provider, url, opts = {}, gotOpts = {}) => {
  const oembedUrl = new URL(provider.oembedUrl.replace(RE_FORMAT, 'json'))
  oembedUrl.searchParams.append('format', 'json')
  oembedUrl.searchParams.append('url', url)
  Object.keys(opts).forEach(key =>
    oembedUrl.searchParams.append(key.toLowerCase(), opts[key])
  )
  const body = await got(oembedUrl.toString(), gotOpts).json()
  body.provider_name = provider.name
  body.provider_url = provider.url
  return body
}

module.exports = async (url, opts) => {
  const provider = findProvider(url)
  return provider !== undefined ? fetchProvider(provider, url, opts) : undefined
}

module.exports.findProvider = findProvider
module.exports.fetchProvider = fetchProvider
