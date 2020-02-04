import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => (
  <Layout>
    <SEO title="Formulario recibido"></SEO>
    <section className="page-layout">
      <div className="columns">
        <div className="column">
          <h1>¡Gracias!</h1>
          <h2>
            Se ha recibido tu solicitud con éxito{" "}
            <span role="img" aria-label="Cara agradecida">
              😊
            </span>
          </h2>
        </div>
      </div>
      <hr />
    </section>
  </Layout>
)
