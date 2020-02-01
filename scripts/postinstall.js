'use strict'

const PROVIDERS_URL = 'https://oembed.com/providers.json'

const { writeFile } = require('fs').promises
const path = require('path')
const got = require('got')

const normalizeProviders = require('./normalize')
const tokenize = require('../src/tokenize')

const fetch = url => got(url).json()

// Implement a simple 'counter' abstraction over an instance of `Map`. This
// allows to implement our histogram building logic in a nicer way (see below).
class Counter {
  constructor () {
    this.map = new Map()
  }

  update (string) {
    for (const token of tokenize(string)) {
      this.incr(token)
    }
  }

  incr (token) {
    this.map.set(token, this.get(token) + 1)
  }

  get (token) {
    return this.map.get(token) || 0
  }
}

function buildIndex (providers) {
  // In order to speed-up finding of providers given a URL, we implement a small
  // reverse index data structure which allows to quickly identify a small
  // subset of candidates by looking at tokens (alphanumeric substrings) found
  // in both providers and input URLs.
  //
  // To build this index we proceed in two steps:
  //
  // 1. Each provider's used for matching a URL is tokenize (i.e. schemes, url
  // and oembed url), and an histogram is created to count the number of
  // occurrences of each tokens.
  //
  // 2. We then index each provider once for each scheme, url and oembed url
  // that is specified in its metadata (the json), using the token that was
  // least seen globally (which we can identify using our histogram from step 1).
  //
  // Finding a provider given an input URL uses the same process but in reverse.
  // We first tokenize the URL using the same tokenization logic (extracting
  // alphanumeric substrings), then lookup the index with each of them to
  // identify candidate providers having a common token in their description
  // (which means they have a chance to match). This yields a very small list of
  // 0, 1, or 2 candidates (0 in the case where there is no match).

  // Step 1: tokenize all providers and compute histogram of tokens
  const histogram = new Counter()
  for (const { schemes, url, oembedUrl } of providers) {
    for (const scheme of schemes) {
      for (const part of scheme) {
        histogram.update(part)
      }
    }
    histogram.update(url)
    histogram.update(oembedUrl)
  }

  // Step 2: index providers using least seen tokens
  const index = {}
  const indexProviderWith = (providerIndex, ...strings) => {
    // Collect all unique tokens for this provider
    const tokens = new Set()
    for (const string of strings) {
      for (const token of tokenize(string)) {
        tokens.add(token)
      }
    }

    // Select best token for provider
    let bestToken = null
    let bestScore = Number.MAX_SAFE_INTEGER
    for (const token of tokens) {
      const score = histogram.get(token)
      if (score < bestScore) {
        bestScore = score
        bestToken = token
      }
    }

    let providersForToken = index[bestToken]
    if (providersForToken === undefined) {
      providersForToken = []
      index[bestToken] = providersForToken
    }

    if (providersForToken.includes(providerIndex) === false) {
      providersForToken.push(providerIndex)
    }
  }

  // Index maps token to array of providers indices
  for (let i = 0; i < providers.length; i += 1) {
    const { schemes, url, oembedUrl } = providers[i]
    for (const scheme of schemes) {
      indexProviderWith(i, ...scheme)
    }
    indexProviderWith(i, url)
    indexProviderWith(i, oembedUrl)
  }

  return {
    providers,
    index
  }
}

fetch(PROVIDERS_URL)
  .then(json =>
    writeFile(
      path.resolve(__dirname, '../src/providers.json'),
      JSON.stringify(buildIndex(normalizeProviders(json)), null, 2)
    )
  )
  .catch(err => console.error(err) && process.exit(1))
