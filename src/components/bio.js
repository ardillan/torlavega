/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Bio = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata

  return (
    <div className="bio">
      <p>
        <strong>{author}</strong> es un proyecto colaborativo que trata de
        servir información a los ciudadanos de Torlavega.
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          Le puedes seguir en Twitter
        </a>
      </p>
    </div>
  )
}

export default Bio
