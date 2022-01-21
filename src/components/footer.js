import React from "react"

const Footer = () => (
  <footer>
    <div className="columns">
      <div className="column is-12">
        <strong>{new Date().getFullYear()}</strong>, Hecho con{" "}
        <a href="https://www.gatsbyjs.org/">GatsbyJS</a> desde diferentes
        lugares de Torlavega. Alojado en{" "}
        <a href="https://www.netlify.com">Netlify</a>
        <p>
          Para la gente de internet{`  `}
          <span
            role="img"
            aria-label="Icono de un corazón"
            style={{
              color: "#f83e4b",
              textShadow: "0 0 5px #fff, 0 0 10px #f83e4b",
            }}
          >
            ♥️
          </span>
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
