const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const moment = require("moment")
const axios = require("axios")
const cheerio = require("cheerio")

const replaceMonth = date => {
  if (date.includes("Enero")) {
    return date.replace("Enero", "January")
  }
  if (date.includes("Febrero")) {
    return date.replace("Febrero", "February")
  }
  if (date.includes("Marzo")) {
    return date.replace("Marzo", "March")
  }
  if (date.includes("Abril")) {
    return date.replace("Abril", "April")
  }
  if (date.includes("Mayo")) {
    return date.replace("Mayo", "May")
  }
  if (date.includes("Junio")) {
    return date.replace("Junio", "June")
  }

  if (date.includes("Julio")) {
    return date.replace("Julio", "July")
  }
  if (date.includes("Agosto")) {
    return date.replace("Agosto", "August")
  }

  if (date.includes("Septiembre")) {
    return date.replace("Septiembre", "September")
  }

  if (date.includes("Octubre")) {
    return date.replace("Octubre", "October")
  }

  if (date.includes("Noviembre")) {
    return date.replace("Noviembre", "November")
  }

  if (date.includes("Diciembre")) {
    return date.replace("Diciembre", "December")
  }

  return date
}

const getData = async () => {
  const response = axios(
    "http://www.torrelavega.es/index.php/ciudad/mas-noticias"
  )
    .then(response => {
      const html = response.data
      const $ = cheerio.load(html)
      const items = $(".latestItemView")
      const data = []
      items.each(function() {
        const date = $(this)
          .find(".latestItemDateCreated")
          .text()

        const title = $(this)
          .find(".latestItemTitle")
          .text()

        const link = $(this)
          .find("a")
          .attr("href")

        data.push({
          title,
          link,
          date: new Date(replaceMonth(date.replace("00:00", "23:00"))),
        })
      })

      return data
    })
    .catch(console.error)

  return response
}

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
