export const manejarErrores = (err, req, res, next) => {
  console.error("ERROR CONTROLADO:", err);

  if (err.tipo === "VALIDACION") {
    return res.status(400).json({
      exito: false,
      mensaje: err.message,
      errores: err.detalles || null,
    });
  }

  return res.status(500).json({
    exito: false,
    mensaje: "Error interno del servidor",
    errores: null,
  });
};
