export const formatDate = dateTime => {
  return new Date(dateTime).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
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
