import React, { useState, useEffect } from "react"
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  Label,
} from "recharts"
import Loader from "../components/loader"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { formatDate } from "../utils/helpers"

export default ({ pageContext: { data } }) => {
  const allScraperData = data.scraperData.data
  const lastBuild = data.scraperData.time
  let currentMonth = ""

  const [isFetching, setIsFetching] = useState(false)
  const [scraperData, setScraperData] = useState(
    data.scraperData.data.slice(0, 25)
  )

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isFetching) return
    if (scraperData.length !== allScraperData.length) {
      fetchMoreData()
    }
  }, [isFetching])

  const fetchMoreData = () => {
    setScraperData(prevState => [
      ...prevState,
      ...allScraperData.slice(scraperData.length, scraperData.length + 125),
    ])
    setIsFetching(false)
  }

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight ||
      isFetching
    ) {
      return setIsFetching(true)
    }
  }

  const getMonth = date => {
    return new Date(date).toLocaleDateString("es-ES", {
      month: "long",
    })
  }

  const showMonth = date => {
    let nextMonth = getMonth(date)
    if (currentMonth === nextMonth) {
      return false
    } else {
      currentMonth = nextMonth
      return true
    }
  }

  const hasPublishedToday = newDate => {
    let today = new Date()
    return formatDate(today) === formatDate(newDate) ? true : false
  }

  const todayPublishedNews = news => {
    let todayNews = 0

    news.map(value => {
      if (hasPublishedToday(value.date)) {
        todayNews++
      }

      return todayNews
    })

    return todayNews
  }

  const getTotalMonthNews = () => {
    let totalNews = 0
    let groupedMonthNews = {}
    let nextMonth = getMonth(allScraperData[0].date)
    allScraperData.reduce((accumulator, currentValue, index, array) => {
      if (index + 1 !== array.length) {
        nextMonth = getMonth(array[index + 1].date)
      } else {
        nextMonth = ""
      }

      if (getMonth(currentValue.date) === nextMonth) {
        totalNews++
      } else {
        groupedMonthNews[`${getMonth(currentValue.date)}`] = {
          name: getMonth(currentValue.date),
          total: totalNews + 1,
        }
        totalNews = 0
      }

      return null
    }, {})

    return groupedMonthNews
  }

  const totalMonthNews = getTotalMonthNews()

  let totalMonthsNewsChart = Object.keys(totalMonthNews).map(key => {
    return totalMonthNews[key]
  })

  return (
    <Layout>
      <SEO
        title="Scraper de Torrelavega.es"
        description="Pequeña utilidad que recoge los datos de la web del ayuntamiento de Torrelavega, los muestra y realiza un pequeño análisis."
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
              <h2>Gráfica de publicaciones</h2>
              <p>
                La siguiente gráfica muestra el total de noticias publicadas por
                mes. En ella se ven reflejados el número de noticias que ha
                publicado el ayuntamiento, siempre a mes vencido.
              </p>
              <p>
                {" "}
                Si se sitúa el ratón sobre ella se podrá ver el detalle de la
                cantidad de noticias y la fecha a la que corresponde.
              </p>
              <div
                style={{ width: "100%", height: 450, margin: "0 auto 0 -30px" }}
              >
                <ResponsiveContainer>
                  <AreaChart
                    data={totalMonthsNewsChart
                      .slice(1, totalMonthsNewsChart.length - 1)
                      .reverse()}
                    margin={{
                      top: 80,
                      right: 0,
                      left: 0,
                      bottom: 80,
                    }}
                  >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="name">
                      <Label
                        value="Número de noticias por mes"
                        position="bottom"
                        margin={{ top: 50 }}
                      />{" "}
                    </XAxis>
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#8884d8"
                      fill="#ffffe0"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <h2>Listado de noticias</h2>
              <small>Se muestra un total de 500 noticias</small>
              <br />
              <small>
                Última actualización {formatDate(lastBuild, "DD/MM/YYYY:HH/MM")}{" "}
                | Hoy se han publicado {todayPublishedNews(allScraperData)}{" "}
                noticias
              </small>
              <hr className="transparent-separator" />
              <ul>
                {scraperData.map((value, index) => {
                  return (
                    <div key={index}>
                      <div className="is-flex">
                        <h3 style={{ textTransform: "capitalize" }}>
                          {showMonth(value.date) ? (
                            <>
                              {getMonth(value.date)} |{" "}
                              {totalMonthNews[`${getMonth(value.date)}`].total}{" "}
                              noticias
                            </>
                          ) : (
                            ""
                          )}
                        </h3>
                      </div>
                      <li
                        className={
                          hasPublishedToday(value.date)
                            ? "has-published-today"
                            : ""
                        }
                      >
                        {hasPublishedToday(value.date) ? (
                          <p className="badget is-green">Publicado hoy</p>
                        ) : (
                          ""
                        )}

                        <a
                          href={`http://www.torrelavega.es${value.link}`}
                          target="_blank"
                          title={value.title}
                          rel="noopener noreferrer"
                        >
                          {value.title}
                        </a>
                        <br />
                        <time dateTime={formatDate(value.date)}>
                          {formatDate(value.date, "Readable")}
                        </time>
                      </li>
                    </div>
                  )
                })}
                <li>
                  {scraperData.length !== allScraperData.length ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (
                    <div>
                      <p>No hay más noticias publicadas</p>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
