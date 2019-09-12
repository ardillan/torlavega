import React from "react"

import Footer from "../components/footer"
import Header from "../components/header"

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    )
  }
}

export default Layout
