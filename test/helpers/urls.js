'use strict'

const demoLinks = Object.keys(require('@microlink/demo-links')).reduce(
  (acc, key) => {
    const value = require('@microlink/demo-links')[key]
    if (value.iframe) acc.push(value.url)
    return acc
  },
  []
)

const falsyValues = Array.from(new Set(require('big-list-of-naughty-strings')))

const validUrls = [
  'http://fav.me/dcx5286',
  'https://flic.kr/p/5QEkmq',
  'https://twitter.com/NetflixDE/status/1133310428476530688',
  'https://twitter.com/officialmcafee/status/1133280322039291905',
  'https://twitter.com/tribandtweets/status/1133308311917481984',
  'https://www.deviantart.com/joeyjazz/art/SP-Ocean-Eclipse-781257606',
  'https://www.facebook.com/alternate.de/photos/a.391014166661/10156375231596662/?type=3&theater',
  'https://www.facebook.com/RocketBeansTV/videos/364684367488603/',
  // 'https://www.instagram.com/farid_rueda/p/Bx-0nVPCe2c/?igshid=18g4fpv1khfug',
  'https://www.instagram.com/p/Bx9h8mdpMPF/?utm_source=ig_web_button_share_sheet',
  'https://www.ted.com/talks/monique_w_morris_why_black_girls_are_targeted_for_punishment_at_school_and_how_to_change_that?utm_campaign=tedspread&utm_medium=referral&utm_source=tedcomshare',
  'https://www.youtube.com/watch?v=8jPQjjsBbIc',
  'https://youtu.be/I8u2NdWuaYs'
]

const invalidUrls = [
  'fantasticfreefoodforyou.de',
  'google.com',
  'https://microlink.io'
]

const supportedUrls = [...validUrls, ...demoLinks]

const unsupportedUrls = [...invalidUrls, ...falsyValues]

module.exports.supportedUrls = supportedUrls
module.exports.unsupportedUrls = unsupportedUrls
