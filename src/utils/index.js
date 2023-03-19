export const formatDate = (dateTime, type) => {
  let date;
  switch (type) {
    case "Readable":
      date = new Date(dateTime).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      break;
    case "DD/MM/YYYY":
      date = new Date(dateTime).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      break;
    case "DD/MM/YYYY:HH/MM":
      date = new Date(dateTime).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      break;
    default:
      date = new Date(dateTime).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
  }

  return date;
};

export const replaceMonth = (date) => {
  let months_spanish = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  let months_english = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const transformed_date = months_spanish.map((value, index) => {
    if (date.includes(value)) {
      return date.replace(value, months_english[index]);
    }

    return undefined;
  });

  return transformed_date.filter((value) => value !== undefined)[0];
};

export const formatURL = (slug) => {
  return slug
    .trimLeft()
    .trimRight()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "-")
    .toLowerCase();
};
