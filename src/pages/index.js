import React from "react"
import { Link } from "gatsby"
import { getPosts } from "../hooks/get-posts"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { formatDate } from "../utils/helpers"

import "../css/styles.scss"

export default props => {
  const posts = getPosts()
  console.log(posts)
  return (
    <Layout location={props.location} title="Inicio">
      <SEO title="Inicio" />

      <section className="columns main-banner">
        <div className="column is-12">
          <h1>Torlavega</h1>
          <h2>Proyecto colaborativo</h2>
          <p>
            Esta web tratará de recopilar el máximo número de datos disponibles
            para los ciudadanos de Torlavega.
          </p>
        </div>
      </section>

      <section>
        <div className="columns">
          {posts.map(post => (
            <article className="column">
              <div className="card-basic">
                <header>
                  <Link to={post.node.fields.slug}>
                    <h1>{post.node.frontmatter.title}</h1>
                  </Link>
                </header>
                <div className="shadow"></div>
                <footer>
                  <time dateTime="">
                    {formatDate(post.node.frontmatter.date, "DD/MM/YYYY")}
                  </time>
                  <p>{post.node.frontmatter.category}</p>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
