import React from "react"

import Footer from "../components/footer"
import Header from "../components/header"

import "../css/styles.scss"

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <>
        <main className="container">
          <Header />
          {children}
          <Footer />
        </main>
      </>
    )
  }
}

export default Layout
