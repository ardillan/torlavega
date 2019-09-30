import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => (
  <Layout>
    <SEO title="El proyecto"></SEO>
    <section>
      <div className="columns">
        <div className="column is-12">
          <h1>DESARROLLANDO UNA CIUDAD</h1>
          <h2
            style={{
              fontFamily: "Inter",
              textTransform: "none",
              fontSize: 21,
              lineHeigh: 27,
              fontWeight: "initial",
            }}
          >
            Para que este proyecto adopte un buen camino será necesario recoger
            la máxima cantidad ideas posible. Para ello puedes enviar un correo
            electrónico o bien contactar vía Twitter.
          </h2>
          <p>
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y
            archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar
            de las industrias desde el año 1500, cuando un impresor (N. del T.
            persona que se dedica a la imprenta) desconocido usó una galería de
            textos y los mezcló de tal manera que logró hacer un libro de textos
            especimen. No sólo sobrevivió 500 años, sino que tambien ingresó
            como texto de relleno en documentos electrónicos, quedando
            esencialmente igual al original. Fue popularizado en los 60s con la
            creación de las hojas "Letraset", las cuales contenian pasajes de
            Lorem Ipsum, y más recientemente con software de autoedición, como
            por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem
            Ipsum.
          </p>
        </div>
      </div>
      <hr />
    </section>
  </Layout>
)
