import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { formatDate } from "../utils/helpers"

export default ({ pageContext: post }) => {
  console.log("Página individual", post)
  return (
    <Layout>
      <SEO
        title="Scraper de Torrelavega.es"
        description="Pequeña utilidad que recoge los datos de la web del ayuntamiento de Torrelavega, los muestra y realiza un pequeño análisis."
      />
      <h1>{post.title}</h1>
      <p>{formatDate(post.date, "Readable")}</p>
      <section>
        <p>Contenido de la noticia</p>
      </section>
    </Layout>
  )
}
