export function respuestaExitosa(
  res,
  datos = null,
  mensaje = "Operación exitosa",
  codigo = 200
) {
  return res.status(codigo).json({
    exito: true,
    mensaje,
    datos,
  });
}

export function respuestaError(
  res,
  codigo = 400,
  mensaje = "Error en la solicitud",
  errores = null
) {
  return res.status(codigo).json({
    exito: false,
    mensaje,
    errores,
  });
}

export function respuestasNoEncontrado(res, mensaje = "Recurso no encontrado") {
  return respuestaError(res, 404, mensaje);
}
