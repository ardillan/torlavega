import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    let postDate = new Date(post.frontmatter.date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    console.log(this.props)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-6">
                <header>
                  {post.frontmatter.thumbnail != null ? (
                    <Image
                      fluid={post.frontmatter.thumbnail.childImageSharp.fluid}
                      alt="Imagen de cabecera"
                    />
                  ) : (
                    ""
                  )}
                  <p>{postDate.toString()}</p>
                </header>
                <main>
                  <h1 className="title is-2">{post.frontmatter.title}</h1>
                  <h3 className="subtitle is-5">
                    {post.frontmatter.description}
                  </h3>
                  <section dangerouslySetInnerHTML={{ __html: post.html }} />
                </main>
              </div>
            </div>
          </div>
          <article>
            <hr />
            <footer>
              <Bio />
            </footer>
          </article>
        </section>

        <nav>
          <ul>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        thumbnail {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
