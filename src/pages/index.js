import React from "react"
import { useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../css/styles.scss"

export default props => {
  return (
    <Layout location={props.location} title="Inicio">
      <SEO title="Inicio" />
      <section className="main-banner">
        <div className="columns">
          <div className="column is-12">
            <h1 className="title is-1">Torlavega</h1>
            <h2 className="subtitle is-5">Proyecto colaborativo</h2>
            <p>
              Esta web tratará de recopilar el máximo número de datos
              disponibles para los ciudadanos de Torlavega.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="columns">
          <article className="column">
            <div className="card-basic">
              <header>
                <h1>Most important heading here</h1>
              </header>
              <p>Lorem Ipsum dolor set amet....</p>
              <div className="shadow"></div>
            </div>
          </article>
          <article className="column">
            <div className="card-basic">
              <header>
                <h1>Most important heading here</h1>
              </header>
              <p>Lorem Ipsum dolor set amet....</p>
              <div className="shadow"></div>
            </div>
          </article>

          <article className="column">
            <div className="card-basic">
              <header>
                <h1>Most important heading here</h1>
              </header>
              <p>Lorem Ipsum dolor set amet....</p>
              <div className="shadow"></div>
            </div>
          </article>
        </div>
      </section>
    </Layout>
  )
}
