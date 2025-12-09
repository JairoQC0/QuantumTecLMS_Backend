export const manejarErrores = (err, req, res, next) => {
  console.error("ERROR CONTROLADO:", err);
  if (err.tipo === "VALIDACION") {
    return res.status(400).json({
      exito: false,
      mensaje: err.message,
      errores: err.detalles || null,
    });
  }
  if (err.tipo === "AUTENTICACION") {
    return res.status(401).json({
      exito: false,
      mensaje: err.message,
      errores: null,
    });
  }

  if (err.tipo === "AUTORIZACION") {
    return res.status(403).json({
      exito: false,
      mensaje: err.message,
      errores: null,
    });
  }
  return res.status(500).json({
    exito: false,
    mensaje: "Error interno del servidor",
    errores: null,
  });
};
