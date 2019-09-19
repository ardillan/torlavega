import React from "react"
import { useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "gatsby-image"

import banner from "../images/general/banner_index.png"
import "../css/styles.scss"

export default props => {
  return (
    <Layout location={props.location} title="Inicio">
      <SEO title="Inicio" />
      <section className="hero is-medium">
        <div
          className="hero-body"
          style={{ backgroundImage: `url("${banner}")` }}
        >
          <div className="container">
            <h1 className="title is-1">Torlavega</h1>
            <h2 className="subtitle is-5">Proyecto colaborativo</h2>
            <p>
              Esta web tratará de recopilar el máximo número de datos
              disponibles para los ciudadanos de Torlavega.
            </p>
          </div>
        </div>
      </section>

      <section className="hero is-white is-small">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-half is-multiline">
                <h2 className="title is-3">¿Qué es?</h2>
                <p className="subtitle">
                  Lorem Ipsum es simplemente el texto de relleno de las de
                  relleno estándar de las industrias desde el año 1500, cuando
                  un impresor (N. del T. persona que se dedica a la imprenta)
                  desconocido usó una galería de textos y los mezcló el cual
                  incluye versiones de Lorem Ipsum.
                </p>
              </div>
              <div className="column is-half is-multiline">
                <h2 className="title is-3">¿Cómo puedo colaborar?</h2>
                <p className="subtitle">
                  Recientemente con software de autoedición, como por ejemplo
                  Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero is-white is-small">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-half is-multiline">
                <h2 className="title is-3">Últimas entradas</h2>
                <p className="subtitle">Lorem Ipsum es simplemente el texto</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
