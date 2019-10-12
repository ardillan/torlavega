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
          <Link to="/datos-del-ayuntamiento">
            <div className="column is-10 is-offset-1">
              <h1>Datos del ayuntamiento</h1>
              <h2>Proyecto colaborativo independiente</h2>
              <p>
                Página donde se muestran las últimas noticias publicadas por el
                ayuntamiento
              </p>
            </div>
          </Link>
        </div>
      </section>
      <hr className="separator" />
      <section>
        <div className="columns">
          <div className="column is-flex">
            <Link to="/proyecto" className="button">
              El proyecto
            </Link>
          </div>
          <div className="column is-flex">
            <a href="/" className="button">
              Motivación
            </a>
          </div>
          <div className="column is-flex">
            <a
              href="https://github.com/ardillan/torlavega/issues"
              className="button"
            >
              Quiero colaborar
            </a>
          </div>
        </div>
      </section>
      <hr className="separator" />

      <section>
        <div className="columns">
          {posts.slice(0, 3).map(post => (
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
