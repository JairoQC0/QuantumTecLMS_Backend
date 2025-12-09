import { respuestaError } from "./respuestas.js";

export function manejarErrores(err, req, res, next) {
  console.error("Error no controlado:", err);

  if (err.tipo === "VALIDACION") {
    return respuestaError(res, 422, err.message, err.detalles);
  }

  if (err.tipo === "AUTENTICACION") {
    return respuestaError(res, 401, err.message);
  }

  if (err.tipo === "PERMISO") {
    return respuestaError(res, 403, err.message);
  }

  return respuestaError(res, 500, "Error interno del servidor");
}
