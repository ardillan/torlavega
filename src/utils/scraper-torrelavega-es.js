import { replaceMonth } from "../utils/helpers"
import axios from "axios"
import cheerio from "cheerio"

export const getData = async () => {
  const response = axios(
    "http://www.torrelavega.es/index.php/ciudad/mas-noticias"
  )
    .then(response => {
      const html = response.data
      const $ = cheerio.load(html)
      const items = $(".latestItemView")
      const data = []
      items.each(function() {
        const date = $(this)
          .find(".latestItemDateCreated")
          .text()

        const title = $(this)
          .find(".latestItemTitle")
          .text()

        const link = $(this)
          .find("a")
          .attr("href")

        data.push({
          title: title.replace(/\s+/g, " "),
          link,
          date: new Date(replaceMonth(date.replace("00:00", "23:00"))),
        })
      })
      return data
    })
    .catch(console.error)
  return response
}
