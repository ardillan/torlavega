---
title: "Scraper sobre Torrelavega.es"
date: "2019-09-24T20:00:00.0100"
description: "Gracias a los datos obtenidos de la web de torrelavega.es se ha desarrollado una página que sirve de utilidad para mostrar las 500 últimas noticias"
thumbnail: "./thumbnail.jpg"
category:
  - Transparencia
---

## Qué es un scraper

Antes de nada, hay que aclarar qué es un _scraper_. Para hacerlo entendible y fácil de leer, un _scraper_ es tecnicismo utilizado en informática que indica, generalmente, una forma de extraer datos de un sitio web para su posterior tratamiento. Puedes leer más sobre esto en [Wikipedia](https://es.wikipedia.org/wiki/Web_scraping).

## Cómo se utiliza en esta web

Una vez aclarado esto, dentro de la web del ayuntamiento existe <a href="http://torrelavega.es/index.php/ciudad/mas-noticias" target="_blank" rel="noopener noreferrer">esta sección</a> donde se muestra un listado de las últimas 500 noticias. Gracias a esta utilidad se ha realizado un pequeño [script](https://es.wikipedia.org/wiki/Script) que recorre cada elemento de la página, lo formatea y [forma una página con el resultado](/datos-del-ayuntamiento). El siguiente trozo de código nos permite ver cómo:

```javascript
// Se declara de qué pagina se va a extraer la información
const response = axios("http://www.torrelavega.es/index.php/ciudad/mas-noticias)
.then(response => {

    // Se implementa una utilidad llamada cheerio que nos sirve para recorrer el contenido e la página
    const html = response.data
    const $ = cheerio.load(html)

    // Se indica cuáles son los elementos a extraer
    const items = $(".latestItemView")
    const data = []

    // Se recorre cada elemento individualmente
    items.each(function() {

      // Se extrae la fecha
      const date = $(this)
        .find(".latestItemDateCreated")
        .text()

      // Se extrae la el título e la noticia
      const title = $(this)
        .find(".latestItemTitle")
        .text()

      // Se extrae el enlace e la noticia
      const link = $(this)
        .find("a")
        .attr("href")

      // Se añade todo a una pila de elementos
      data.push({
        title: title.replace(/\s+/g, " "),
        link,
        date: new Date(replaceMonth(date.replace("00:00", "12:00"))),
      })

    })

    return data

  })
  .catch(console.error)
```

Puedes ver el [código completo aquí](https://github.com/ardillan/torlavega/blob/master/src/utils/scraper-torrelavega-es.js).

Básicamente lo que nos encontramos es un recorrido completo por la página donde seleccionamos únicamente aquello que nos interesa. En este caso la fecha, el enlace y los títulos de cada noticia. Cabe decir que es un proceso muy delicado ya que se emplean selectores CSS, como por ejemplo `.latestItemDateCreated` ó `.latestItemTitle`. Si estos elementos son modificados harán que la utilidad deje de funcionar y haya que refactorizarla.

## Resultado

Gracias a esto, se ha creado [esta página](/datos-del-ayuntamiento) donde veremos una réplica del sitio web mencionado arriba, con menos carga visual y con la posibilidad de tratar los datos de una manera libre. Por ejemplo, se ha añadido la posibilidad de agrupar las noticias indicando **cuántas se han publicado por mes**, cuántas se han publicado en **el día de hoy** e incluso se ha añadido una gráfica para ver cuál es la línea de publicaciones mensuales.
