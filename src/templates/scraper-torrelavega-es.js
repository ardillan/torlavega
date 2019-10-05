import React from "react"

import Layout from "../components/layout"
import { formatDate } from "../utils/helpers"

export default ({ pageContext: { data } }) => {
  const scraperData = data.scraperData
  return (
    <Layout>
      <div className="scraper-page">
        <section>
          <div className="columns">
            <div className="column is-12">
              <h1 className="title">Torlavega</h1>
              <h2 className="subtitle">
                Proyecto web colaborativo que trata de recopilar el máximo
                número de datos disponibles para los ciudadanos de Torlavega
              </h2>
            </div>
          </div>
        </section>

        <section>
          <div className="columns">
            <div className="column is-12">
              <ul>
                {scraperData.map((value, index) => {
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
        </section>
      </div>
    </Layout>
  )
}
