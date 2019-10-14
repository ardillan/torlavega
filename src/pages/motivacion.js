import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => (
  <Layout>
    <SEO title="Motivación"></SEO>
    <section className="page-layout">
      <div className="columns">
        <div className="column">
          <h1>Motivación</h1>
          <h4>
            El reto de poder filtrar y beneficiarse de los datos públicos nos
            abre un mundo de posibilidades.
          </h4>
          <p>
            Son muchas las motivaciones que han llevado a crear este proyecto:
            aprender cómo recoger y analizar datos, crear un sitio web accesible
            y útil, disponer información al alcance todos, crear una comunidad
            que sirva como punto de referencia desde un punto independiente...
          </p>

          <p>
            Estas premisas son las que han motivado y han hecho que sea posible
            la página por la que estás navegando ahora mismo.
          </p>
          <p>
            Si tú también quieres colaborar, puedes{" "}
            <a href="https://github.com/ardillan/torlavega/issues">
              crear una propuesta
            </a>{" "}
            dentro del repositorio oficial, o bien clonarlo y proponer cambios
            para que sean implementados.
          </p>
        </div>
      </div>
      <hr />
    </section>
  </Layout>
)
