import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => (
  <Layout>
    <SEO title="El proyecto"></SEO>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Torlavega</h1>
          <h2 class="subtitle">
            Proyecto web colaborativo que trata de recopilar el máximo número de
            datos disponibles para los ciudadanos de Torlavega
          </h2>
        </div>
      </div>
    </section>
  </Layout>
)
