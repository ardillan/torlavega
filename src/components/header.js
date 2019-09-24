import React from "react"
import { Link } from "gatsby"

export default () => {
  return (
    <header>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/proyecto">El Proyecto</Link>
        <Link to="/enlaces">Enlaces</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>
    </header>
  )
}
