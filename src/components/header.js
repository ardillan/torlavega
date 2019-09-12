import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

export default () => {
  const data = useStaticQuery(graphql`
    query getLogoQuery {
      avatar: file(absolutePath: { regex: "/logotipo.png/" }) {
        name
        extension
        childImageSharp {
          fixed(width: 45, height: 45) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <header>
      <nav class="navbar is-transparent">
        <div class="navbar-brand">
          <Link to="">
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt="Logotipo"
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
          </Link>
          <div
            class="navbar-burger burger"
            data-target="navbarExampleTransparentExample"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
          <div class="navbar-start">
            <Link to="/blog" className="navbar-item">
              ✏️ Blog
            </Link>
            <Link to="/proyecto" className="navbar-item">
              ⚪️ El Proyecto
            </Link>
            <Link to="/enlaces" className="navbar-item">
              📌 Enlaces
            </Link>
            <Link to="/contacto" className="navbar-item">
              ✉️ Contacto
            </Link>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <a
                    class="bd-tw-button button"
                    data-social-network="Twitter"
                    data-social-action="tweet"
                    data-social-target="http://localhost:4000"
                    target="_blank"
                    href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=http://localhost:4000&amp;via=jgthms"
                  >
                    <span class="icon">
                      <i class="fab fa-twitter"></i>
                    </span>
                    <span>Tweet</span>
                  </a>
                </p>
                <p class="control">
                  <a
                    class="button is-primary"
                    href="https://github.com/jgthms/bulma/releases/download/0.7.5/bulma-0.7.5.zip"
                  >
                    <span class="icon">
                      <i class="fas fa-download"></i>
                    </span>
                    <span>Download</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
