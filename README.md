<div align="center">
  <img src="https://cdn.microlink.io/logo/banner.png" alt="microlink logo">
</div>

![Last version](https://img.shields.io/github/tag/microlinkhq/oembed-spec.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/microlinkhq/oembed-spec.svg?style=flat-square)](https://coveralls.io/github/microlinkhq/oembed-spec)
[![NPM Status](https://img.shields.io/npm/dm/oembed-spec.svg?style=flat-square)](https://www.npmjs.org/package/oembed-spec)

> A parser for oEmbed specification.

## Features

- Always on sync with [oEmbed providers](https://oembed.com/providers.json) (as npm postinstall hook).
- Handle http/https & www/non-www URLs variations.
- Ability to pass extra oEmbed parameters.
- Built for speed (see [benchmarks](benchmarks/README.md)).

## Install

```bash
$ npm install oembed-spec --save
```

## Usage

```js
const oEmbed = require('oembed-spec')

// Just pass the URL
oEmbed('https://youtu.be/I8u2NdWuaYs')
// {
//   provider_name: 'YouTube',
//   author_url: 'https://www.youtube.com/user/mirandaskiss'
//   html: '<iframe width="480" height="270" src="https://www.youtube.com/embed/I8u2NdWuaYs?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
// }

// http/https and www/non-www are handled
oEmbed('http://www.youtu.be/I8u2NdWuaYs')
// {
//   provider_name: 'YouTube',
//   author_url: 'https://www.youtube.com/user/mirandaskiss'
//   html: '<iframe width="480" height="270" src="https://www.youtube.com/embed/I8u2NdWuaYs?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
// }

// Pass specific oEmbed options as second parameter
oEmbed('http://www.youtu.be/I8u2NdWuaYs', { maxheight: 612 })
// {
//   provider_name: 'YouTube',
//   author_url: 'https://www.youtube.com/user/mirandaskiss'
//   html: '<iframe width="480" height="270" src="https://www.youtube.com/embed/I8u2NdWuaYs?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
// }
```

## API

### oEmbed(input, [options], [gotOpts])

#### input

_Required_<br>
Type: `string`

A valid WHATWG URL.

#### options

Any option present will be passed against the consumer request (see [oembed.com](https://oembed.com) section 2.2).

#### gotOpts

Any option present will be passed to [got](https://github.com/sindresorhus/got).

### .findProvider(url)

Standalone method for finding a provider.

### .fetchProvider(provider, url, [opts], [gotOpts])

Standalone method for fetching an specific provider.

## License

**oembed-spec** © [microlink.io](https://microlink.io), released under the [MIT](https://github.com/microlinkhq/oembed-spec/blob/master/LICENSE) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/microlinkhq/oembed-spec/contributors).

> [microlink.io](https://microlink.io) · GitHub [microlink.io](https://github.com/microlinkhq) · Twitter [@microlinkhq](https://twitter.com/microlinkhq)
