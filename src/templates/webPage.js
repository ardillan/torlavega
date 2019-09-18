import React from "react"

// import Bio from "../components/bio"
import Layout from "../components/layout"
// import SEO from "../components/seo"
import { formatDate } from "../utils/helpers"

export default ({ pageContext: { webData } }) => {
  const data = webData.webInfo
  console.log(data[499])
  return (
    <Layout>
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Torlavega</h1>
            <h2 className="subtitle">
              Proyecto web colaborativo que trata de recopilar el máximo número
              de datos disponibles para los ciudadanos de Torlavega
            </h2>
            <span className="tag is-primary">Light</span>
          </div>
        </div>
      </section>

      <section className="hero">
        <div className="container">
          <ul>
            {data.map((value, index) => (
              <li key={index}>
                {" "}
                <a
                  href={`http://www.torrelavega.es${value.link}`}
                  target="_blank"
                  title={value.title}
                  rel="noopener noreferrer"
                >
                  {value.title}
                </a>
                <time dateTime={value.date}>{formatDate(value.date)}</time>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}
