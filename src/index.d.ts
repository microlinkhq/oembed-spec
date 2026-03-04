'use strict'

interface Provider {
  name: string
  url: string
  oembedUrl: string
}

interface OembedOptions {
  maxwidth?: number
  maxheight?: number
  [key: string]: string | number | undefined
}

interface OembedResponse {
  type: string
  version: string
  title?: string
  author_name?: string
  author_url?: string
  provider_name?: string
  provider_url?: string
  cache_age?: number
  thumbnail_url?: string
  thumbnail_width?: number
  thumbnail_height?: number
  html?: string
  width?: number
  height?: number
  url?: string
}

/**
 * oembed-spec - A parser for oEmbed specification
 * 
 * @param url - The URL to get oembed data for
 * @param opts - Optional oembed parameters
 * @param gotOpts - Optional got library options for HTTP requests
 * @returns Promise resolving to oembed response data, or undefined if no provider found
 */
declare function oembed(
  url: string,
  opts?: OembedOptions,
  gotOpts?: Record<string, any>
): Promise<OembedResponse | undefined>

declare namespace oembed {
  /**
   * Find an oEmbed provider for a given URL
   */
  function findProvider(url: string): Provider | undefined

  /**
   * Fetch oEmbed data from a specific provider
   */
  function fetchProvider(
    provider: Provider,
    url: string,
    opts?: OembedOptions,
    gotOpts?: Record<string, any>
  ): Promise<OembedResponse>
}

export = oembed
