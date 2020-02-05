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
          Puedes contactar usando el siguiente formulario de contacto o bien
          mediante un mensaje a la cuenta de Twitter de{" "}
          <a href="https://twitter.com/datos_torlavega">Torlavega</a>
        </p>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          action="/formulario-recibido"
        >
          <p>
            <label>
              Tu nombre
              <input
                type="text"
                placeholder="José Luis Hidalgo"
                name="name"
                required
              />
            </label>
          </p>
          <p>
            <label>Mensaje</label>
            <textarea
              placeholder="Me gustaría colaborar en el proyecto"
              name="comment"
              required
            />
          </p>
          <button type="submit">Enviar</button>
          <input type="hidden" name="form-name" value="contact" />
        </form>
      </section>
    </Layout>
  )
}

export default Contacto
