import React from "react"
import { Link, graphql } from "gatsby"
import { formatDate } from "../utils/helpers"

import Layout from "../components/layout"
import SEO from "../components/seo"

class Blog extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Blog" />
        <section className="section">
          <div className="columns is-multiline">
            {posts.map(post => (
              <article className="column is-4" key={post.node.id}>
                <div className="card-basic">
                  <Link to={post.node.fields.slug}>
                    <header>
                      <h1>{post.node.frontmatter.title}</h1>
                    </header>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          post.node.frontmatter.description ||
                          post.node.excerpt,
                      }}
                    />
                    <footer>
                      <p className="meta">{post.node.frontmatter.category}</p>
                      <time dateTime="DD/MM/YYYY">
                        {formatDate(post.node.frontmatter.date, "DD/MM/YYYY")}
                      </time>
                      <div className="shadow"></div>
                    </footer>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Layout>
    )
  }
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
