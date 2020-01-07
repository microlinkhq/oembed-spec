const Benchmark = require('benchmark')
const chalk = require('chalk')

const { supportedUrls } = require('../test/helpers/urls')

function bench (name, args, fn) {
  const suite = new Benchmark.Suite()
  suite
    .add(name, () => fn(args))
    .on('cycle', event => {
      console.log(
        `+ ${chalk.bold(name)} ${Math.floor(
          event.target.hz * args.length
        )} ops/second`
      )
    })
    .run({ async: false })
}

function main () {
  {
    const oEmbedSpec = require('../')
    bench('oembed-spec', supportedUrls, urls => {
      for (let i = 0; i < urls.length; i += 1) {
        oEmbedSpec.findProvider(urls[i])
      }
    })
  }

  {
    const oEmbedParser = require('oembed-parser')
    bench('oembed-parser', supportedUrls, urls => {
      for (let i = 0; i < urls.length; i += 1) {
        oEmbedParser.hasProvider(urls[i])
      }
    })
  }
}

main()
