'use strict'

const { getDomainWithoutSuffix } = require('tldts')

const RE_NORMALIZE_URL = /^\/\/|^https?:\/\/(?:www\.)?/

const providers = require('./providers')

const findProvider = url => {
  return providers.find(provider => {
    const { schemes, oembedUrl, url: providerUrl } = provider
    if (schemes.length !== 0) return schemes.some(scheme => scheme.test(url))
    const domain = getDomainWithoutSuffix(url)
    // since the URL doesn't have an scheme to match, try
    // to match over oEmbed/url domain.
    return (
      domain === getDomainWithoutSuffix(oembedUrl) ||
      domain === getDomainWithoutSuffix(providerUrl)
    )
  })
}

module.exports = url => {
  let provider
  // build up a list of URL variations to test against because the oembed
  // providers list is not always up to date with scheme or www vs non-www
  const baseUrl = url.replace(RE_NORMALIZE_URL, '')

  // priorize https over http intentionally
  const testUrls = [
    `https://${baseUrl}`,
    `https://www.${baseUrl}`,
    `http://${baseUrl}`,
    `http://www.${baseUrl}`
  ]

  testUrls.find(testUrl => (provider = findProvider(testUrl)))
  return provider
}
