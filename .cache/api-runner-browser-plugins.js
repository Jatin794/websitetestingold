module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-preact/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-catch-links/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-theme-try-ghost/gatsby-browser.js'),
      options: {"plugins":[],"ghostConfig":{"development":{"apiUrl":"https://z2b09d6a5-gtw.qovery.io","contentApiKey":"d82ea944a4f038b988c0372014"},"production":{"apiUrl":"https://z2b09d6a5-gtw.qovery.io","contentApiKey":"d82ea944a4f038b988c0372014"}},"siteConfig":{"siteUrl":"https://demo.jamify.org","infiniteScroll":true,"postsPerPage":3,"siteTitleMeta":"Gatsby Starter Ghost CMS","siteDescriptionMeta":"Turn your Ghost blog into a flaring fast static site with Gatsby","shortTitle":"Jamify","siteIcon":"favicon.png","backgroundColor":"#e9e9e9","themeColor":"#15171A","verbose":false,"severity":"info"},"mediaConfig":{"gatsbyImages":true,"gatsbyImageLoading":"lazy","gatsbyImageFadeIn":true},"routes":{"basePath":"/","collections":[]}},
    },{
      plugin: require('../node_modules/gatsby-theme-ghost-dark-mode/gatsby-browser.js'),
      options: {"plugins":[],"defaultModeDark":false,"overrideOS":false},
    },{
      plugin: require('../node_modules/gatsby-plugin-gatsby-cloud/gatsby-browser.js'),
      options: {"plugins":[]},
    }]
