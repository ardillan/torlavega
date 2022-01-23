import React from "react"
import { Link } from "gatsby"

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/" activeClassName="active">
          Inicio
        </Link>
        <Link to="/blog" activeClassName="active">
          Blog
        </Link>
        <Link to="/utilidades" activeClassName="active">
          Utilidades
        </Link>
        <Link to="/contacto" activeClassName="active">
          Contacto
        </Link>
        <p className="last-item">VERSIÓN BETA</p>
      </nav>
    </header>
  )
}

export default Header
