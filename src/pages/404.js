import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <h1>Esta página no existe</h1>
        <p>
          Pero puede existir si lo necesitas, puedes proponer mejoras para la
          web en el{" "}
          <a
            href="https://github.com/ardillan/torlavega/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            repositorio del proyecto
          </a>
        </p>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
