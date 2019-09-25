export const formatDate = (dateTime, type) => {
  let date
  switch (type) {
    case "Readable":
      date = new Date(dateTime).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      break
    case "DD/MM/YYYY":
      date = new Date(dateTime).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
      break
    default:
      date = new Date(dateTime).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
  }

  return date
}

export const formatURL = slug => {
  return slug
    .trimLeft()
    .trimRight()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "-")
    .toLowerCase()
}
