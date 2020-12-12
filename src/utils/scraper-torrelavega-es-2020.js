import cheerio from "cheerio"
import { slugify } from "./helpers"
import AbortController from "abort-controller"
import ayuntamientoNoticias2020 from "../../content/resources/scraper-data/ayuntamiento-noticias-2020.json"

const fetch = require("node-fetch")
const fs = require("fs")

const controller = new AbortController()
const timeout = setTimeout(() => {
  controller.abort()
}, 150)

const downloadPage = url => {
  return fetch(url)
    .then(res => res.text())
    .then(
      data => {
        return data
      },
      err => {
        if (err.name === "AbortError") {
          console.log("❌ Petición cancelada", url)
        }
      }
    )
    .finally(() => {
      clearTimeout(timeout)
    })
}

const formatContent = content => {
  // Recibe por defecto "\n\n                  <p> </p>\n<p align=\"justify\"><span style=\"font-size: large;\"><strong><span style=\"font-family: Arial, sans-serif;\">-</span><span style=\"font-family: Arial, sans-serif;\">Domingo 5 de enero a partir de</span><span style=\"font-family: Arial, sans-serif;\"> las 19:30 </span><span style=\"font-family: Arial, sans-serif;\">horas</span></strong></span></p>\n<p align=\"justify\"><span style=\"font-family: Arial, sans-serif;\">Torrelavega, 2 de enero de 2020-. La concejala de Festejos Patricia Portilla ha presentado la tradicional Cabalgata de Reyes, que tendrá lugar este domingo 5 de enero por las calles de Torrelavega, convirtiéndose en uno de los eventos más multitudinarios de la ciudad y en una noche de ilusión esperada por miles de niños y niñas. </span></p>\n<p align=\"justify\"><span style=\"font-family: Arial, sans-serif;\">Patricia Portilla recuerda que es una de las actividades principales del Departamento de Animación Sociocultural dentro de la programación navideña. “Torrelavega se prepara para recibir a Sus Majestades los Reyes Magos de Oriente, con una Cabalgata que repite itinerario y formato”. </span></p>\n<p align=\"justify\"><span style=\"font-family: Arial, sans-serif;\">Portilla explica que la Cabalgata de Reyes del Ayuntamiento de Torrelavega cuenta con unos 400 figurantes, entre miembros de peñas y artistas que integran la comitiva. “Se busca que los espectáculos que integran el desfile aporten un toque de calidad al evento”, detalla la edil. </span></p>\n<p align=\"justify\"><span style=\"font-family: Arial, sans-serif;\">El presupuesto es de 90.000 euros y como novedad este año tendrá cinco carrozas, tres para los Reyes Magos Melchor, Gaspar y Baltasar, otra carroza con un belén realizado por la empresa Francis 2, y una quinta carroza cargada de regalos.</span></p>\n<p align=\"justify\"><span style=\"font-family: Arial, sans-serif;\">Patricia Portilla ha agradecido el trabajo de las peñas en las actividades de la concejalía de Festejos, y recalcar “que los Reyes Magos pueden estar en muchos lugares a la vez y hacen una jornada maratoniana en Torrelavega, recorren el Asilo, Residencia Alborada, Sierrallana y el CAD, visitando a personas que no pueden estar con sus familias y generando sonrisas”.</span></p>\n<p align=\"justify\"><span style=\"font-family: Arial, sans-serif;\">El día 5, para los rezagados, estarán los pajes reales para echar las cartas a los Reyes del último momento, en la Sala Mauro Muriedas desde las 11.00 horas.</span></p>\n<p align=\"justify\">“<span style=\"font-family: Arial, sans-serif;\">Son las mejores navidades de Torrelavega de los últimos años, valora Portilla, que ha enumerado las numerosas actividades navideñas como la Pista de Hielo, pista de trineos, Feria de Navidad, Ludoteca, etc.</span></p>\n<p align=\"justify\"><span style=\"font-family: Arial, sans-serif;\">Itinerario de la Cabalgata, 5 de enero de 2020:</span></p>\n<ul>\n<li>\n<p style=\"margin-bottom: 0cm;\" align=\"justify\"><span style=\"font-family: Arial, sans-serif;\">Salida de la Avenida de la Constitución (El Zapatón). </span></p>\n</li>\n<li>\n<p style=\"margin-bottom: 0cm;\" align=\"justify\"><span style=\"font-family: Arial, sans-serif;\">La Comitiva Real recorrerá las calles Teodoro Calderón, Joaquín Cayón, José María Pereda, Ceferino Calderón, Julián Urbina, y nuevamente José María Pereda, visitando el castillo de Herodes, instalado en la Plaza Mayor. </span></p>\n</li>\n<li>\n<p align=\"justify\"><span style=\"font-family: Arial, sans-serif;\">Llegada al Ayuntamiento alrededor de las 20:45. </span></p>\n</li>\n</ul>\n<p align=\"justify\"><span style=\"font-family: Arial, sans-serif;\">Compañías Participantes:</span></p>\n<p align=\"justify\"><span style=\"font-family: Arial, sans-serif;\">Des Quidams con el espectáculo “Totems”, Cartoon Clan con “Tus amigos de la tele”, “Pasacalles Disney”, “Entre nubes”, “Equus versus Pegasus”, “Las Hadas de las Estaciones”, Malabaracirco con el espectáculo “El Esteru” y la Compañía de Teatro SEDE, que participará en la escena del Castillo de Herodes. Además, participarán la empresa Francis 2 S.L con sus carrozas y las peñas Club Cántabro de Campismo, Amigos de la Radio, El Tolle y Motoclub Burgman Cantabria.</span></p>\n            "
  const output = content
    .replace(/(<[^>]+) style=".*?"/gi, "$1")
    .replace(/\s+/g, " ")
    .trim()

  return output
}

const formatDate = date => {
  // Fecha recibida por defecto "\n\n              04-02-2020\n            "
  const dateFormated = date.replace(/\s+/g, " ")

  const day = dateFormated.slice(0, 3)
  const month = dateFormated.slice(4, 6)
  const year = dateFormated.slice(7, 11)

  const dateObject = new Date(`${year}-${month}-${day} UTC`)

  return dateObject.toISOString().replace("00:00", "12:00")
}

const pushToArray = (arr, obj) => {
  // console.log("👉 arr", arr)
  // console.log("👉 obj", obj)

  const index = arr.findIndex(e => e.id === obj.id)
  if (index === -1) {
    arr.push(obj)
  }
}

export const createData = async () => {
  // La primera noticia del año 2020 es la 6814
  const newsData = []
  try {
    for (let id = 7604; id <= 7604; id++) {
      const response = await downloadPage(
        `http://torrelavega.es/index.php/ciudad/mas-noticias/item/${id}`
      )
      const html = response
      const $ = cheerio.load(html, { decodeEntities: false })
      const title = $(".itemTitle").text()
      const content = $(".itemFullText")
        .removeAttr("style")
        .html()
      const date = $(".itemDateCreated").text()
      const hits = $(".itemHits")
        .find("b")
        .text()

      const categories = $(".itemCategory a").text()

      console.log(`✔️`, slugify(title))

      const newsData = {
        id,
        slug: slugify(title),
        originalLink: `http://torrelavega.es/index.php/ciudad/mas-noticias/item/${id}`,
        publishedDate:
          date === "" ? formatDate("\n01-01-1970\n") : formatDate(date),
        title: title.replace(/\s+/g, " ").trim(),
        content: content,
        hits,
        categories,
        publishedOnTwitter: true,
      }

      const datosNuevos = { ...ayuntamientoNoticias2020 }

      pushToArray(datosNuevos.data, newsData)

      // Escribe los datos de nuevo
      fs.writeFile(
        "./content/resources/scraper-data/ayuntamiento-noticias-2020.json",
        JSON.stringify({ data: datosNuevos.data }),
        err => {
          // In case of a error throw err.
          if (err) throw err
        }
      )
    }

    // try downloading an invalid url
  } catch (error) {
    console.error("ERROR:")
    console.error(error)
  }
}
