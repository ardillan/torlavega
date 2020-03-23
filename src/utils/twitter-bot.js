const Twitter = require("twitter")
require("dotenv").config()
import { formatDate } from "../utils/helpers"

const client = new Twitter({
  consumer_key: process.env.TWITTER_API,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TOKEN,
  access_token_secret: process.env.TOKEN_SECRET,
})

const hasPublishedToday = newDate => {
  let today = new Date()
  return formatDate(today) === formatDate(newDate) ? true : false
}

export const tweetData = ({ scraperData }) => {
  scraperData.data.slice(0, 10).map(value => {
    if (hasPublishedToday(value.date)) {
      client.post(
        "statuses/update",
        {
          status: `✏️ [Ayuntamiento] - ${value.title} http://www.torrelavega.es${value.link}`,
        },
        function(error, tweet, response) {
          if (error) throw error
        }
      )
    }
  })
}
