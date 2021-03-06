import { getData } from "./src/utils/scraper-torrelavega-es"
import { tweetData } from "./src/utils/twitter-bot"
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const scraper = await getData().then(response => {
    return response
  })

  const scraperData = {
    data: scraper,
    time: new Date().getTime(),
  }

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  const scraperTemplate = path.resolve(
    `./src/templates/scraper-torrelavega-es.js`
  )
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // Crea página de enlaces
  createPage({
    path: `/datos-del-ayuntamiento`,
    component: scraperTemplate,
    context: { data: { scraperData } },
  })

  // Añade los datos en Twitter
  tweetData({ scraperData })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
