var plugins = [{
      name: 'gatsby-plugin-ghost-manifest',
      plugin: require('/home/jatin/Documents/Github/demo/node_modules/gatsby-theme-try-ghost/plugins/gatsby-plugin-ghost-manifest/gatsby-ssr'),
      options: {"plugins":[],"short_name":"Jamify","start_url":"/","background_color":"#e9e9e9","theme_color":"#15171A","display":"minimal-ui","icon":"static/favicon.png","legacy":true,"query":"\n                    {\n                        allGhostSettings {\n                            edges {\n                                node {\n                                    title\n                                    description\n                                }\n                            }\n                        }\n                    }\n                  "},
    },{
      name: 'gatsby-plugin-feed',
      plugin: require('/home/jatin/Documents/Github/demo/node_modules/gatsby-plugin-feed/gatsby-ssr'),
      options: {"plugins":[],"query":"\n                    {\n                        allGhostSettings {\n                            edges {\n                                node {\n                                    title\n                                    description\n                                    url\n                                }\n                            }\n                        }\n                    }\n                  ","feeds":[{"query":"\n        {\n            allGhostPost(\n                sort: { fields: [featured, published_at], order: [DESC, DESC] }\n            ) {\n                edges {\n                    node {\n                        # Main fields\n                        id\n                        title\n                        slug\n                        featured\n                        feature_image\n\n                        # Dates unformatted\n                        created_at\n                        published_at\n                        updated_at\n\n                        # SEO\n                        excerpt\n                        meta_title\n                        meta_description\n\n                        # Authors\n                        authors {\n                            name\n                        }\n                        primary_author {\n                            name\n                        }\n                        tags {\n                            name\n                            visibility\n                        }\n\n                        # Content\n                        html\n\n                        # Additional fields\n                        url\n                        canonical_url\n\n                        childHtmlRehype {\n                            html\n                        }\n\n                        featureImageSharp {\n                            publicURL\n                        }\n                    }\n                }\n            }\n        }\n  ","output":"/rss","title":"Jamify RSS Feed"}]},
    },{
      name: 'gatsby-plugin-advanced-sitemap',
      plugin: require('/home/jatin/Documents/Github/demo/node_modules/gatsby-plugin-advanced-sitemap/gatsby-ssr'),
      options: {"plugins":[],"query":"\n                    {\n                        allGhostPost {\n                            edges {\n                                node {\n                                    id\n                                    slug\n                                    updated_at\n                                    created_at\n                                    feature_image\n                                }\n                            }\n                        }\n                        allGhostPage {\n                            edges {\n                                node {\n                                    id\n                                    slug\n                                    updated_at\n                                    created_at\n                                    feature_image\n                                }\n                            }\n                        }\n                        allGhostTag {\n                            edges {\n                                node {\n                                    id\n                                    slug\n                                    feature_image\n                                }\n                            }\n                        }\n                        allGhostAuthor {\n                            edges {\n                                node {\n                                    id\n                                    slug\n                                    profile_image\n                                }\n                            }\n                        }\n                    }","mapping":{"allGhostPost":{"sitemap":"posts"},"allGhostTag":{"sitemap":"tags"},"allGhostAuthor":{"sitemap":"authors"},"allGhostPage":{"sitemap":"pages"}},"exclude":["/dev-404-page","/404","/404.html","/offline-plugin-app-shell-fallback"],"createLinkInHead":true,"addUncaughtPages":true},
    },{
      name: 'gatsby-plugin-react-helmet',
      plugin: require('/home/jatin/Documents/Github/demo/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-styled-components',
      plugin: require('/home/jatin/Documents/Github/demo/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[],"displayName":true,"fileName":true,"minify":true,"namespace":"","transpileTemplateLiterals":true,"topLevelImportPaths":[],"pure":false},
    },{
      name: 'gatsby-theme-try-ghost',
      plugin: require('/home/jatin/Documents/Github/demo/node_modules/gatsby-theme-try-ghost/gatsby-ssr'),
      options: {"plugins":[],"ghostConfig":{"development":{"apiUrl":"https://z2b09d6a5-gtw.qovery.io","contentApiKey":"d82ea944a4f038b988c0372014"},"production":{"apiUrl":"https://z2b09d6a5-gtw.qovery.io","contentApiKey":"d82ea944a4f038b988c0372014"}},"siteConfig":{"siteUrl":"https://demo.jamify.org","infiniteScroll":true,"postsPerPage":3,"siteTitleMeta":"Gatsby Starter Ghost CMS","siteDescriptionMeta":"Turn your Ghost blog into a flaring fast static site with Gatsby","shortTitle":"Jamify","siteIcon":"favicon.png","backgroundColor":"#e9e9e9","themeColor":"#15171A","verbose":false,"severity":"info"},"mediaConfig":{"gatsbyImages":true,"gatsbyImageLoading":"lazy","gatsbyImageFadeIn":true},"routes":{"basePath":"/","collections":[]}},
    },{
      name: 'gatsby-theme-ghost-dark-mode',
      plugin: require('/home/jatin/Documents/Github/demo/node_modules/gatsby-theme-ghost-dark-mode/gatsby-ssr'),
      options: {"plugins":[],"defaultModeDark":false,"overrideOS":false},
    }]
/* global plugins */
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

function augmentErrorWithPlugin(plugin, err) {
  if (plugin.name !== `default-site-plugin`) {
    // default-site-plugin is user code and will print proper stack trace,
    // so no point in annotating error message pointing out which plugin is root of the problem
    err.message += ` (from plugin: ${plugin.name})`
  }

  throw err
}

export function apiRunner(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  plugins.forEach(plugin => {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      return
    }

    try {
      const result = apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  })

  return results.length ? results : [defaultReturn]
}

export async function apiRunnerAsync(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  for (const plugin of plugins) {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      continue
    }

    try {
      const result = await apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  }

  return results.length ? results : [defaultReturn]
}
