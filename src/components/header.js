import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import github from "../images/general/github_icon.svg"
import twitter from "../images/general/twitter_icon.svg"

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
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
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
            className="navbar-burger burger"
            data-target="navbarExampleTransparentExample"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/blog" className="navbar-item">
              <span role="img" aria-label="Icono de un lápiz">
                ✏️
              </span>{" "}
              Blog
            </Link>
            <Link to="/proyecto" className="navbar-item">
              <span role="img" aria-label="Icono de un círculo">
                ⚪️
              </span>{" "}
              El Proyecto
            </Link>
            <Link to="/enlaces" className="navbar-item">
              <span role="img" aria-label="Icono de una chincheta">
                📌
              </span>{" "}
              Enlaces
            </Link>
            <Link to="/contacto" className="navbar-item">
              <span role="img" aria-label="Icono de un sobre">
                {" "}
                ✉️
              </span>{" "}
              Contacto
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <a
                    className="button is-primary is-outlined"
                    data-social-network="Twitter"
                    data-social-action="Twitter"
                    data-social-target="http://localhost:4000"
                    target="_blank"
                    href="https://twitter.com/datos.torlavega"
                    rel="noopener noreferrer"
                  >
                    <span className="icon">
                      <i>
                        <img src={twitter} />
                      </i>
                    </span>
                    <span>Twitter</span>
                  </a>
                </p>
                <p className="control">
                  <a
                    className="button is-primary is-outlined"
                    href="https://github.com/ardillan/torlavega"
                  >
                    <span className="icon">
                      <i>
                        <img src={github} />
                      </i>
                    </span>
                    <span>Colabora</span>
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
