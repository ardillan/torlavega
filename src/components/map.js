import React from "react"
import { Map, TileLayer, Marker } from "react-leaflet"

const LeafletMap = markers => {
  const position = [43.350153, -4.045296]

  return (
    <Map center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contribudores'
      />
      {markers.markers.map((marker, index) => {
        return <Marker position={[marker[0], marker[1]]} key={index} />
      })}
    </Map>
  )
}

export default LeafletMap
