import React from "react"
import { Link, graphql } from "gatsby"

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
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug

              return (
                <article
                  key={node.fields.slug}
                  className="column  is-4 is-offset-1"
                >
                  <header>
                    {node.frontmatter.thumbnail != null ? (
                      <div className="card-image">
                        <figure className="image">
                          <img
                            src={
                              node.frontmatter.thumbnail.childImageSharp.fixed
                                .src
                            }
                            alt={`Imagen para la entrada de ${title}`}
                          />
                        </figure>
                      </div>
                    ) : (
                      ""
                    )}
                  </header>
                  <div className="card-content is-paddingless	">
                    <section className="content">
                      <h3>
                        <Link to={node.fields.slug}>{title}</Link>
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: node.frontmatter.description || node.excerpt,
                        }}
                      />
                      <br />
                      <time dateTime="2016-1-1">{node.frontmatter.date}</time>
                    </section>
                  </div>
                </article>
              )
            })}
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
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            thumbnail {
              childImageSharp {
                fixed(width: 400) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
