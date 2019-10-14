import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Contacto = () => {
  return (
    <Layout>
      <SEO title="Contacto"></SEO>
      <section className="page-layout">
        <h1>Contacto</h1>
        <p>
          Puedes contactar mediante un mensaje a la cuenta de Twitter de
          <a href="https://twitter.com/datos_torlavega"> Torlavega</a>
        </p>
      </section>
    </Layout>
  )
}

export default Contacto
