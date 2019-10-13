import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => (
  <Layout>
    <SEO title="El proyecto"></SEO>
    <section>
      <div className="columns">
        <div className="column">
          <h1>El proyecto</h1>
          <h4>
            Torlavega.com es un proyecto colaborativo con el que se quiere
            recolectar la máxima cantidad de datos para ponerlos a disposición
            de todo el mundo.
          </h4>
          <p>
            Hoy en día el proceso de digitalización del que estamos siendo
            testigos es imparable: la lista de la compra, la cita del médico, el
            callejero de tu ciudad... la inmensa mayoría se encuentra disponible
            desde nuestro teléfono móvil.
          </p>

          <p>
            Es un proceso que tiene ventajas e incovenientes. Este breve
            artículo titulado{" "}
            <a href="https://blog.virgulilla.com/2018/07/24/alfabetización-digital/">
              "Alfabetización digital"
            </a>{" "}
            amplía esta idea sobre cómo hay que reflexionar en esta adopción de
            digitalización.
          </p>

          <p>
            Este proyecto quiere poner en alza uno los valores que tiene la
            digitalización: la <strong>reutilización de datos</strong> y su
            puesta al servicio los ciudadanos. En este caso de nuestra ciudad,
            <a href="https://es.wikipedia.org/wiki/Torrelavega">Torrelavega</a>.
            Por ello, el{" "}
            <a href="https://github.com/ardillan/torlavega">
              código de esta web es abierto
            </a>{" "}
            y está disponible para toda aquella persona que quiera participar.
          </p>
        </div>
      </div>
      <hr />
    </section>
  </Layout>
)
