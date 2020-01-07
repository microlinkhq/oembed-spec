'use strict'

const RE_TOKENIZE = /[^\w]+/g
module.exports = string =>
  string
    .split(RE_TOKENIZE)
    .filter(token => token !== 'http' && token !== 'https' && token !== 'www')
