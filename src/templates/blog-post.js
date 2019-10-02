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

        <main className="blog-post">
          <section className="section">
            <article>
              <div className="columns">
                <div className="column is-12">
                  <header className="card-basic">
                    {post.frontmatter.thumbnail != null ? (
                      <Image
                        fluid={post.frontmatter.thumbnail.childImageSharp.fluid}
                        alt="Imagen de cabecera"
                      />
                    ) : (
                      ""
                    )}
                    <div className="meta">
                      <h1 className="title">{post.frontmatter.title}</h1>
                      <h3 className="description">
                        {post.frontmatter.description}
                      </h3>
                      <time dateTime={post.frontmatter.date}>
                        {postDate.toString()}
                      </time>
                    </div>
                    <div className="shadow"></div>
                  </header>
                  <hr className="separator" />

                  <section dangerouslySetInnerHTML={{ __html: post.html }} />
                </div>
              </div>
            </article>
            <section className="columns">
              <footer className="column is-12">
                <Bio />
              </footer>
            </section>
          </section>

          <div className="blog-navigation">
            <nav>
              <ul className="columns">
                <li className="column is-6">
                  {previous && (
                    <Link to={previous.fields.slug} rel="prev">
                      ← {previous.frontmatter.title}
                    </Link>
                  )}
                </li>
                <li className="column is-6">
                  {next && (
                    <Link to={next.fields.slug} rel="next">
                      {next.frontmatter.title} →
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </main>
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
