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

      <section className="main-banner">
        <div className="columns">
          <Link to={"proyecto"}>
            <div className="column is-10 is-offset-1">
              <h1>Test site</h1>
              <h2>
                Proyecto colaborativo independiente para la ciudad de Torlavega
              </h2>
              <p>
                Esta web tratará de recopilar el máximo número de datos
                disponibles para los ciudadanos de Torlavega.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="container">
        <div className="columns">
          <div className="column is-flex">
            <Link to="" className="button">
              Quiero colaborar
            </Link>
          </div>
          <div className="column is-flex">
            <Link to="" className="button">
              Quiero colaborar
            </Link>
          </div>
          <div className="column is-flex">
            <Link to="" className="button">
              Quiero colaborar
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="columns">
          {posts.map(post => (
            <article className="column" key={post.node.id}>
              <div className="card-basic">
                <Link to={post.node.fields.slug}>
                  <header>
                    <h1>{post.node.frontmatter.title}</h1>
                  </header>
                  <div className="shadow"></div>
                  <footer>
                    <p className="meta">{post.node.frontmatter.category}</p>
                    <time dateTime="DD/MM/YYYY">
                      {formatDate(post.node.frontmatter.date, "DD/MM/YYYY")}
                    </time>
                  </footer>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
