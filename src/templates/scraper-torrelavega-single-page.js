import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { formatDate } from "../utils/helpers"

export default ({ pageContext }) => {
  const post = pageContext.post

  return (
    <Layout>
      <SEO
        title="Scraper de Torrelavega.es"
        description="Pequeña utilidad que recoge los datos de la web del ayuntamiento de Torrelavega, los muestra y realiza un pequeño análisis."
      />
      <h1>{post.title}</h1>
      <p>{formatDate(post.publishedDate, "Readable")}</p>
      <section>
        <div
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
      </section>
    </Layout>
  )
}
