// src/core/respuestas.js
export const ok = (res, datos = null, mensaje = "", status = 200) => {
  return res.status(status).json({
    success: true,
    message: mensaje,
    data: datos,
    errors: null,
  });
};

export const fail = (
  res,
  mensaje = "Error interno del servidor",
  status = 500,
  errors = null
) => {
  return res.status(status).json({
    success: false,
    message: mensaje,
    data: null,
    errors,
  });
};
