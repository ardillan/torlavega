import React from "react"

import Layout from "../components/layout"

class info extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} title="Información">
        <p>test</p>
        <p>Esto es una prueba</p>
      </Layout>
    )
  }
}
export default info
