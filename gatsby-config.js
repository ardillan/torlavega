module.exports = {
  siteMetadata: {
    title: `Torlavega`,
    subtitle: `Proyecto colaborativo`,
    author: `Torlavega`,
    description: `Web que trata de recopilar el máximo número de datos disponibles para los ciudadanos de Torlavega y transformarlos en información útil.`,
    siteUrl: `https://www.torlavega.com/`,
    social: {
      twitter: `datos_torlavega`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: "gatsby-plugin-react-leaflet",
      options: {
        linkStyles: true, // (default: true) Enable/disable loading stylesheets via CDN
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/resources/utilidades`,
        name: `utilidades`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/resources/contenedores-aceite/`,
        name: `contenedores-aceite`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Torlavega: Proyecto colaborativo`,
        short_name: `Torlavega`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/general/torlavega-icon.png`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
