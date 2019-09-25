import React from "react"
import moment from "moment"

// import Bio from "../components/bio"
import Layout from "../components/layout"
// import SEO from "../components/seo"
import { formatDate } from "../utils/helpers"

export default ({ pageContext: { webData } }) => {
  const data = webData.webInfo
  moment.locale("es-ES")
  return (
    <Layout>
      <section>
        <div className="container">
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <h1 className="title">Torlavega</h1>
              <h2 className="subtitle">
                Proyecto web colaborativo que trata de recopilar el máximo
                número de datos disponibles para los ciudadanos de Torlavega
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <ul>
                {data.map((value, index) => {
                  return (
                    <li key={index}>
                      <a
                        href={`http://www.torrelavega.es${value.link}`}
                        target="_blank"
                        title={value.title}
                        rel="noopener noreferrer"
                      >
                        {value.title}
                      </a>
                      <br />
                      <time dateTime={value.date}>
                        {formatDate(value.date, "Readable")}
                      </time>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
