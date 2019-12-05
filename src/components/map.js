import React from "react"
import { Map, TileLayer, Marker, Popup } from "react-leaflet"

const LeafletMap = data => {
  const position = [43.350153, -4.045296]
  console.log(data, "Información")
  // data.data.map(value => {
  //   console.log(value.geo[0].lat)
  // })

  return (
    <Map center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contribudores'
      />
      {data.data.map((marker, index) => {
        return (
          <Marker position={[marker.geo[0].lat, marker.geo[0].lng]} key={index}>
            <Popup>{marker.address}</Popup>
          </Marker>
        )
      })}
    </Map>
  )
}

export default LeafletMap
