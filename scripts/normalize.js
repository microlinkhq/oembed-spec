'use strict'

module.exports = providers =>
  providers.reduce((acc, item) => {
    const { provider_name: name, provider_url: url, endpoints } = item

    endpoints.forEach(endpoint => {
      const { schemes = [], url: oembedUrl } = endpoint

      acc.push({
        schemes: schemes.map(scheme => scheme.toLowerCase().split(/[*]/g)),
        name,
        url,
        oembedUrl
      })
    })

    return acc
  }, [])
