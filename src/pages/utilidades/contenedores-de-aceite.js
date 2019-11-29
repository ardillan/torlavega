import React from "react"
import Layout from "../../components/layout"
import { getOilRecipes } from "../../hooks/get-content"
// import { Map, Marker, Popup, TileLayer } from "react-leaflet"
import Map from "../../components/map"

export default () => {
  const oilRecipes = getOilRecipes()
  const markers = []
  oilRecipes.map(value => {
    console.log(value.geo[0].lat)
    markers.push({
      latLng: {
        title: value.address,
        lat: value.geo[0].lat,
        lng: value.geo[0].lng,
      },
    })
  })

  console.log(oilRecipes.length)
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
        <div className="column is-12">
          {/* <Map center={position} zoom={13} style={{ height: 500 }}></Map> */}
          <Map markersData={markers} />
        </div>
      </div>
    </Layout>
  )
}
