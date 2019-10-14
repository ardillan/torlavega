---
title: "Scraper sobre Torrelavega.es"
date: "2019-09-24T20:00:00.0100"
description: "Gracias a los datos obtenidos de la web de torrelavega.es se ha desarrollado una página que sirve de utilidad para mostrar las 500 últimas noticias"
thumbnail: "./thumbnail.jpg"
category:
  - Transparencia
---

## Qué es un scraper

Antes de nada, hay que aclara qué es un _scraper_. Para hacerlo entendible y fácil de leer, un _scraper_ es tecnicismo utilizado en informática que indica, generalmente, una forma de extraer datos de un sitio web para su posterior tratamiento. Puedes leer más sobre esto en [Wikipedia](https://es.wikipedia.org/wiki/Web_scraping).

## Analizando el contenido

Una vez aclarado esto, dentro de la web del ayuntamiento existe [esta sección]("http://torrelavega.es/index.php/ciudad/mas-noticias") donde se muestra un listado de las últimas 500 noticias. Mediante el uso de varias librerías se ha realizado un pequeño [script](https://es.wikipedia.org/wiki/Script) que recorre cada una de ellas y las formatea. El siguiente trozo de código permite vernos cómo:

```javascript
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
```

Puedes ver el [código completo aquí](https://github.com/ardillan/torlavega/blob/master/src/utils/scraper-torrelavega-es.js).

Básicamente lo que nos encontramos es un recorrido completo por la página donde seleccionamos sólo aquello que nos interesa. En este caso la fecha y los títulos de cada noticia. Cabe decir que es un proceso muy delicado ya que se emplean selectores CSS, como por ejemplo `.latestItemDateCreated` ó `.latestItemTitle`. Si estos ítems son modificados harán que la utilidad deje de funcionar

## Resultado

Gracias a esta pequeña utilidad, se ha creado [esta página](datos-del-ayuntamiento) donde veremos una réplica del sitio web mencionado arriba, con menos carga visual y con la posibilidad de tratar los datos de una manera libre. Por ejemplo, se ha añadido la posibilidad de agrupar por meses las noticias, además se añade la posibilidad de ver cuántas noticias se han publicado en el día actual.
