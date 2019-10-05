const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

import { getData } from "./src/utils/scraper-torrelavega-es"
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const webInfo = await getData().then(response => {
    return response
  })

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const webInfoPage = path.resolve(`./src/templates/webPage.js`)
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
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // Crea página de enlaces
  createPage({
    path: `/torrelavega`,
    component: webInfoPage,
    context: { webData: { webInfo } },
  })
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
