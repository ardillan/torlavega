import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { formatDate } from "../utils/helpers"

export default ({ pageContext: { data } }) => {
  const scraperData = data.scraperData
  let currentMonth = ""

  const getMonth = date =>
    new Date(date).toLocaleDateString("es-ES", {
      month: "long",
    })

  const showMonth = date => {
    let nextMonth = getMonth(date)
    if (currentMonth === nextMonth) {
      return ""
    } else {
      currentMonth = nextMonth
      return nextMonth
    }
  }

  const calculateTotalMonthNews = (currentMonth, lastYearNews) => {
    let totalMonthNews = 0
    currentMonth = getMonth(currentMonth)
    lastYearNews.map((value, index) => {
      if (index !== lastYearNews.length - 1) {
        if (currentMonth === getMonth(lastYearNews[index + 1].date)) {
          totalMonthNews++
        }
      }
    })
    return totalMonthNews
  }

  // console.log(scraperData.slice(15, 80)
  // return <p>saturday superhouse</p>
  return (
    <Layout>
      <SEO
        title="Scraper de Torrelavega.es"
        description="Pequeña utilidad que recoge los datos de la web del ayuntamiento de Torrelavega, los muestra y realizar un pequeño análisis."
      />
      <div className="scraper-layout blog-layout">
        <section>
          <div className="columns">
            <div className="column is-12">
              <h1 className="title">Datos del ayuntamiento</h1>
              <p className="subtitle">
                Esta página recoge y muestra la información que hay en la web
                del ayuntamiento de Torrelavega, principalmente dentro de su
                sección noticias.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="columns">
            <div className="column is-12">
              <h4>Explicación</h4>
              <p>
                Esta pequeña utilidad se lanza principalmente para analizar las
                últimas 500 noticias que hay en la página web del ayuntamiento
                de Torrelavega, concretamente de{" "}
                <a href="http://torrelavega.es/index.php/ciudad/mas-noticias">
                  esta sección.
                </a>{" "}
              </p>

              <h4>Objetivo</h4>
              <p>
                El objetivo será recorrer las últimas 500 noticias del
                ayuntamiento, analizar los datos disponibles y obtener
                conclusiones acerca de la información obtenida.
              </p>
              <hr />
              <h2>Listado de noticias</h2>
              <ul>
                {scraperData.map((value, index, array) => {
                  return (
                    <div key={index}>
                      <div className="is-flex" style={{}}>
                        <h3>
                          {getMonth(value.date) !== currentMonth
                            ? calculateTotalMonthNews(value.date, array)
                            : ""}
                        </h3>
                        <h3 style={{ textTransform: "capitalize" }}>
                          {showMonth(value.date)}
                        </h3>
                      </div>
                      <li>
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
                    </div>
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
