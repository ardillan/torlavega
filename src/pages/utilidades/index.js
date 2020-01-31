import React from "react"
import { getUtilities } from "../../hooks/get-utilities"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

export default () => {
  const utilities = getUtilities()
  return (
    <Layout>
      <SEO title="Utilidades" />
      <section>
        <div className="columns is-multiline">
          <div className="column is-12">
            <h1>Utilidades</h1>
            <p>Esta página recoge un listado de utilidades.</p>
          </div>
          {utilities.map((value, index) => {
            return (
              <article className="column is-6" key={index}>
                <div className="card-basic">
                  <Link to={value.path}>
                    <header>
                      <h1>{value.name}</h1>
                    </header>
                    <p>{value.description}</p>
                    <div
                      style={{
                        backgroundImage: `url("${value.background}")`,
                        backgroundColor: "white",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "80%",
                        right: "10px",
                        width: "40px",
                        height: "40px",
                        position: "absolute",
                        top: 0,
                      }}
                    ></div>
                    <div className="shadow"></div>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </Layout>
  )
}
