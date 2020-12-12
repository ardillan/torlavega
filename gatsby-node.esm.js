import { getData } from "./src/utils/scraper-torrelavega-es"
// import { createData } from "./src/utils/scraper-torrelavega-es-2020"
import { tweetData } from "./src/utils/twitter-bot"
import { slugify } from "./src/utils/helpers"
// import datosDelAyuntamientoDataOriginal from "./content/resources/scraper-data/ayuntamiento.json"

const fs = require("fs")
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Actualizamos el JSON de ayuntamiento.json
  // 1. - Leemos la información del JSON que hay y añadimos los datos que faltan
  // 2. - Creamos la página de enlaces y las páginas individuales de cada enlace
  // 3. - Se publica en Twitter los datos que no se han publicado

  // await createData().then(res => res)

  const scraper = await getData().then(response => {
    return response
  })

  const scraperData = {
    data: scraper,
    time: new Date().getTime(),
  }

  // const datosDelAyuntamientoDataUpdated = []

  // scraperData.data.map(post => {
  //   datosDelAyuntamientoDataUpdated.push({
  //     id: post.link
  //       .replace("/index.php/ciudad/mas-noticias/item/", "")
  //       .slice(0, 4), // Añade el ID único al objeto
  //     link: slugify(post.link)
  //       .replace("/index.php/ciudad/mas-noticias/item/", "")
  //       .substring(5), // Crea un slug único
  //     originalLink: `http://www.torrelavega.es${post.link}`,
  //     publishedDate: post.date,
  //     title: post.title,
  //     publishedOnTwitter: false,
  //   })
  // })

  // const datosNuevos = { ...datosDelAyuntamientoDataOriginal }

  // function pushToArray(arr, obj) {
  //   const index = arr.findIndex(e => e.id === obj.id)
  //   if (index === -1) {
  //     arr.push(obj)
  //   }
  // }

  // datosDelAyuntamientoDataUpdated.map(obj => {
  //   pushToArray(datosNuevos.data, obj)
  // })

  // Write data in 'Output.txt' .
  // fs.writeFile(
  //   "./content/resources/scraper-data/ayuntamiento.json",
  //   JSON.stringify(datosNuevos),
  //   err => {
  //     // In case of a error throw err.
  //     if (err) throw err
  //   }
  // )

  // Crea página de enlaces de torrelavega.es
  createPage({
    path: `/datos-del-ayuntamiento`,
    component: path.resolve(
      "./src/templates/scraper-torrelavega-single-page.js"
    ),
    context: { data: { scraperData } },
  })

  // ToDo - Crea páginas individuales  de torrelavega.es
  // scraperData.data.forEach(post => {
  //   createPage({
  //     path: `/datos-del-ayuntamiento/${slugify(post.link)
  //       .replace("/index.php/ciudad/mas-noticias/item/", "")
  //       .substring(5)}`,
  //     component: path.resolve(
  //       "./src/templates/scraper-torrelavega-single-page.js"
  //     ),
  //     context: post,
  //   })
  // })

  // 🔥 Añade los datos en Twitter
  // tweetData({ scraperData })

  // 🔥  Crea las páginas del blog

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
      component: path.resolve("./src/templates/blog-post.js"),
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const singlePageTemplate = path.resolve(
    `src/templates/scraper-torrelavega-single-page.js`
  )
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(
    `
      {
        scraperDataJson {
          data {
            id
            slug
            publishedOnTwitter
            publishedDate
            originalLink
            title
            hits
            categories
            content
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog post pages.
    result.data.scraperDataJson.data.forEach(edge => {
      createPage({
        path: `/datos-ayuntamiento/${edge.slug}`,
        component: singlePageTemplate,
        context: {
          post: edge,
        },
      })
    })
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
