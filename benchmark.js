const bench = require('nanobench')

const { supportedUrls } = require('./test/helpers/urls')

const oEmbedParser = require('oembed-parser')
const oEmbedSpec = require('./')

bench('oembed-parser', bench => {
  bench.start()
  supportedUrls.forEach(url => oEmbedParser.hasProvider(url))
  bench.end()
})

bench('oembed-spec', bench => {
  bench.start()
  supportedUrls.forEach(url => oEmbedSpec.findProvider(url) !== undefined)
  bench.end()
})
