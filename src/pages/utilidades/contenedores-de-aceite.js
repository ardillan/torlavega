import React from "react"
import Layout from "../../components/layout"
import { getOilRecipes } from "../../hooks/get-content"
import LeafletMap from "../../components/map"

export default () => {
  const oilRecipes = getOilRecipes()
  const markers = []
  oilRecipes.map(value => {
    return markers.push([value.geo[0].lat, value.geo[0].lng])
  })

  return (
    <Layout>
      <section className="page-layout">
        <h1>Contenedores de aceite</h1>
        <p>
          En esta página se muestra la localización de los contendores de aceite
          de la ciudad. La información se ha obtenido de la página web de{" "}
          <a
            href="http://www.lineaverdetorrelavega.com/lv/residuos-documentacion.asp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Línea Verde de Torrelavega
          </a>
        </p>
      </section>

      <div className="columns is-desktop is-mobile is-multiline">
        {oilRecipes.map((value, index) => {
          return (
            <div
              className="column is-4-desktop is-4-widescreen is-6-mobile"
              key={index}
            >
              <address>
                {value.address}
                <br />
                {value.city}, {value.cp}
              </address>
            </div>
          )
        })}
      </div>
      <div className="columns">
        <div className="column is-12">
          {typeof window !== "undefined" && <LeafletMap data={oilRecipes} />}
        </div>
      </div>
    </Layout>
  )
}
