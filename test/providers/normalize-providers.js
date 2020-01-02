'use strict'

const test = require('ava')

const normalizeProviders = require('../../scripts/normalize')

test('create a provider per every scheme', t => {
  t.snapshot(
    normalizeProviders([
      {
        provider_name: 'Facebook',
        provider_url: 'https://www.facebook.com/',
        endpoints: [
          {
            schemes: [
              'https://www.facebook.com/*/posts/*',
              'https://www.facebook.com/photos/*',
              'https://www.facebook.com/*/photos/*',
              'https://www.facebook.com/photo.php*',
              'https://www.facebook.com/photo.php',
              'https://www.facebook.com/*/activity/*',
              'https://www.facebook.com/permalink.php',
              'https://www.facebook.com/media/set?set=*',
              'https://www.facebook.com/questions/*',
              'https://www.facebook.com/notes/*/*/*'
            ],
            url: 'https://www.facebook.com/plugins/post/oembed.json',
            discovery: true
          },
          {
            schemes: [
              'https://www.facebook.com/*/videos/*',
              'https://www.facebook.com/video.php'
            ],
            url: 'https://www.facebook.com/plugins/video/oembed.json',
            discovery: true
          }
        ]
      }
    ])
  )
})
