import React from "react"

export default () => (
  <footer className="footer">
    <div className="content has-text-centered is-dark">
      <strong>{new Date().getFullYear()}</strong>, Hecho con{" "}
      <a href="https://www.gatsbyjs.org/">GatsbyJS</a>
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
          ♥
        </span>
        ️
      </p>
    </div>
  </footer>
)
