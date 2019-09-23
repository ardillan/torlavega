import React from "react"
import { Link } from "gatsby"

export default () => {
  return (
    <header>
      <nav>
        <div className="columns">
          <Link className="column is-1" to="/">
            Inicio
          </Link>
          <Link className="column is-1" to="/blog">
            Blog
          </Link>
          <Link className="column is-1" to="/proyecto">
            El Proyecto
          </Link>
          <Link className="column is-1" to="/enlaces">
            Enlaces
          </Link>
          <Link className="column is-1" to="/contacto">
            Contacto
          </Link>
        </div>
      </nav>
    </header>
  )
}
