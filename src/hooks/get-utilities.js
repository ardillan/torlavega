import { useStaticQuery, graphql } from "gatsby"

export const useGetUtilities = () => {
  const pages = useStaticQuery(
    graphql`
      query {
        allUtilidadesJson {
          edges {
            node {
              utilidades {
                name
                path
                description
                background
              }
            }
          }
        }
      }
    `
  )
  return pages.allUtilidadesJson.edges[0].node.utilidades
}
