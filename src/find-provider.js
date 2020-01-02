'use strict'

const { getDomainWithoutSuffix } = require('tldts-experimental')

const RE_NORMALIZE_URL = /^\/\/|^https?:\/\/(?:www\.)?/

const providers = require('./providers.json')

const matchSchemes = (url, schemes) => {
  for (let i = 0; i < schemes.length; i += 1) {
    const scheme = schemes[i]

    if (scheme.length === 0) {
      continue
    }

    // First part should match start of URL
    const firstPart = scheme[0]
    if (url.startsWith(firstPart) === false) {
      continue
    }

    if (scheme.length === 1) {
      continue
    }

    // Last part should match end of URL
    const lastPart = scheme[scheme.length - 1]
    if (lastPart.length !== 0 && url.endsWith(lastPart) === false) {
      continue
    }

    // Parts in the middle should start anywhere and appear in order
    let index = firstPart.length
    for (let j = 1; j < scheme.length - 1; j += 1) {
      index = url.indexOf(scheme[j], index)
      if (index === -1) {
        break
      }
      index += scheme[j].length
    }

    if (index !== -1) {
      return true
    }
  }

  return false
}

const matchProvider = (url, domain, provider) => {
  const { schemes, oembedUrl, url: providerUrl } = provider

  if (schemes.length !== 0) {
    return matchSchemes(url, schemes) ? provider : undefined
  }

  if (domain === undefined) {
    return undefined
  }

  // since the URL doesn't have an scheme to match, try
  // to match over oEmbed/url domain.
  if (
    domain === getDomainWithoutSuffix(oembedUrl) ||
    domain === getDomainWithoutSuffix(providerUrl)
  ) {
    // console.log('???? 2', domain, getDomainWithoutSuffix(oembedUrl), getDomainWithoutSuffix(providerUrl))
    return provider
  }

  return undefined
}

const findProvider = url => {
  const domain = getDomainWithoutSuffix(url)

  for (let i = 0; i < providers.length; i += 1) {
    if (matchProvider(url, domain, providers[i])) {
      return providers[i]
    }
  }

  return undefined
}

module.exports = url => {
  // TODO - here we could tokenize the `url` first and check if there is any
  // provider candidate before building the list of test URLs. This would mean
  // we pay the cost only if there is a chance to match.

  // 1. tokenize URL
  // 2. check each token in the index
  // 3. stop if we find one provider matching

  // build up a list of URL variations to test against because the oembed
  // providers list is not always up to date with scheme or www vs non-www
  const baseUrl = url.toLowerCase().replace(RE_NORMALIZE_URL, '')

  // priorize https over http intentionally
  return (
    findProvider(`https://${baseUrl}`) ||
    findProvider(`https://www.${baseUrl}`) ||
    findProvider(`http://${baseUrl}`) ||
    findProvider(`http://www.${baseUrl}`)
  )
}
