import { useStaticQuery, graphql } from "gatsby"
export const getPosts = () => {
  const posts = useStaticQuery(
    graphql`
      query DataQuery {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                category
                date
                description
              }
            }
          }
        }
      }
    `
  )

  return posts.allMarkdownRemark.edges
}
