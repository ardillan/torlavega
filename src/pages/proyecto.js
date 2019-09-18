import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => (
  <Layout>
    <SEO title="El proyecto"></SEO>
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Torlavega</h1>
          <h2 className="subtitle">
            Proyecto web colaborativo que trata de recopilar el máximo número de
            datos disponibles para los ciudadanos de Torlavega
          </h2>
        </div>
      </div>
    </section>
  </Layout>
)
