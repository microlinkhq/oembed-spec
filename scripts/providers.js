const { providers } = require('../src/providers')

let markdown = ''

providers.forEach(({ name, url }) => {
  if (!markdown.includes(url)) {
    markdown += `\n- [${name}](${url.replace('http://', 'https://')})`
  }
})

console.log(markdown)
