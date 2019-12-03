import React, { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

const Map = ({ markersData }) => {
  useEffect(() => {
    const mainMap = L.map("map", {
      center: [43.350153, -4.045296],
      zoom: 14,
      layers: [
        L.tileLayer(
          "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",

          {
            attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          }
        ),
      ],
    })

    markersData.forEach(marker => {
      L.marker(marker).addTo(mainMap)
    })
  }, [])

  return <div id="map" style={{ width: "100%", height: "600px" }} />
}

export default Map
