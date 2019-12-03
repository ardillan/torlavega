import { useStaticQuery, graphql } from "gatsby"

export const getOilRecipes = () => {
  const oilRecipes = useStaticQuery(
    graphql`
      query {
        allContenedoresAceiteJson {
          edges {
            node {
              contenedores_aceite {
                address
                city
                cp
                geo {
                  lat
                  lng
                }
              }
            }
          }
        }
      }
    `
  )
  return oilRecipes.allContenedoresAceiteJson.edges[0].node.contenedores_aceite
}
