'use strict'

const { getDomainWithoutSuffix } = require('tldts')

const { providers, index } = require('./providers.json')
const tokenize = require('./tokenize')

const RE_NORMALIZE_URL = /^\/\/|^https?:\/\/(?:www\.)?/

const matchSchemes = (url, schemes) => {
  for (let i = 0; i < schemes.length; i += 1) {
    const scheme = schemes[i]

    if (scheme.length === 0) {
      continue
    }

    // First part should match start of URL
    const [firstPart] = scheme
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

const matchProvider = (url, provider) => {
  const {
    schemes,
    domainWithoutSuffixOfOembedUrl,
    domainWithoutSuffixOfUrl
  } = provider

  if (schemes.length !== 0) {
    return matchSchemes(url, schemes) === true ? provider : undefined
  }

  // Since the URL doesn't have an scheme to match, try to match over oEmbed/url
  // domain. These are pre-computed during postinstall so that no redundant work
  // is needed.
  const domain = getDomainWithoutSuffix(url)
  if (
    domain !== null &&
    (domain === domainWithoutSuffixOfUrl ||
      domain === domainWithoutSuffixOfOembedUrl)
  ) {
    return provider
  }

  return undefined
}

const findProvider = (candidates, url) => {
  for (let i = 0; i < candidates.length; i += 1) {
    if (matchProvider(url, candidates[i])) {
      return candidates[i]
    }
  }

  return undefined
}

module.exports = url => {
  // Build up a list of URL variations to test against because the oembed
  // providers list is not always up to date with scheme or www vs non-www
  const baseUrl = url.toLowerCase().replace(RE_NORMALIZE_URL, '')

  // Instead of iterating through all providers in our database, we first use
  // `index` to identify a very small subset of candidates which are likely to
  // match our `url`. In the best case, no candidate is found and no further
  // work is needed. In case of a match, we usually have a list of one or two
  // candidates, which is very quick to match against.
  //
  // For more details about `index`, see documentation in `scripts/postinstall.js`.
  const indicesOfCandidates = new Set()
  for (const token of tokenize(baseUrl)) {
    const providersForToken = index[token]
    if (providersForToken !== undefined) {
      for (const providerIndex of providersForToken) {
        indicesOfCandidates.add(providerIndex)
      }
    }
  }

  // Set `indicesOfCandidates` contains numbers which correspond to indices of
  // providers in the `providers` array. This indirection allows to not
  // duplicate providers in `index` since they can be indexed multiple times.
  const candidates = []
  for (const indexOfCandidate of indicesOfCandidates) {
    candidates.push(providers[indexOfCandidate])
  }

  // Priorize https over http intentionally
  return (
    findProvider(candidates, `https://${baseUrl}`) ||
    findProvider(candidates, `https://www.${baseUrl}`) ||
    findProvider(candidates, `http://${baseUrl}`) ||
    findProvider(candidates, `http://www.${baseUrl}`)
  )
}
