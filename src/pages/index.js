import React from "react"
import { Link } from "gatsby"
import { useGetPosts } from "../hooks/get-posts"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { formatDate } from "../utils/helpers"

export default props => {
  const posts = useGetPosts()

  return (
    <Layout location={props.location} title="Inicio">
      <SEO title="Inicio" />
      <Link to="/datos-del-ayuntamiento">
        <section className="main-banner">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h1>Datos del ayuntamiento</h1>
              <h2>Proyecto colaborativo independiente</h2>
              <p>
                Página donde se muestran las últimas noticias publicadas por el
                ayuntamiento
              </p>
              <button>Ver página</button>
            </div>
          </div>
        </section>
      </Link>
      <hr className="separator" />
      <section>
        <div className="columns">
          <div className="column is-flex">
            <Link to="/proyecto" className="button">
              El proyecto
            </Link>
          </div>
          <div className="column is-flex">
            <Link to="/motivacion" className="button">
              Motivación
            </Link>
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
