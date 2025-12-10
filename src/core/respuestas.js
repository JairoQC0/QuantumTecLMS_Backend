export const respuestaExitosa = (
  res,
  arg2 = 200,
  arg3 = "Operación exitosa",
  arg4 = null
) => {
  let statusCode = 200;
  let mensaje = "Operación exitosa";
  let datos = null;

  if (typeof arg2 === "number") {
    statusCode = arg2;
    mensaje = arg3 ?? mensaje;
    datos = arg4 ?? null;
  } else if (typeof arg2 === "string") {
    statusCode = 200;
    mensaje = arg2;
    datos = arg3 ?? null;
  } else {
    statusCode = 200;
    mensaje = arg3 ?? mensaje;
    datos = arg2;
  }

  return res.status(statusCode).json({
    exito: true,
    mensaje,
    datos,
  });
};

export const respuestaError = (
  res,
  arg2 = 500,
  arg3 = "Error en el servidor",
  arg4 = null
) => {
  let statusCode = 500;
  let mensaje = "Error en el servidor";
  let detalles = null;

  if (typeof arg2 === "number") {
    statusCode = arg2;
    mensaje = arg3 ?? mensaje;
    detalles = arg4 ?? null;
  } else if (typeof arg2 === "string") {
    statusCode = 500;
    mensaje = arg2;
    detalles = arg3 ?? null;
  } else {
    statusCode = 500;
    mensaje = arg3 ?? mensaje;
    detalles = arg2;
  }

  return res.status(statusCode).json({
    exito: false,
    mensaje,
    detalles,
  });
};

export const respuestasNoEncontrado = (
  res,
  mensaje = "Recurso no encontrado"
) => {
  return res.status(404).json({
    exito: false,
    mensaje,
  });
};
