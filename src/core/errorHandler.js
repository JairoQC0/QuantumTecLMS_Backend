// src/core/errorHandler.js
import { fail } from "./respuestas.js";

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err.type === "AUTH") {
    return fail(res, err.message || "Error de autenticación", 401);
  }

  if (err.type === "BUSINESS") {
    return fail(
      res,
      err.message || "Error de negocio",
      400,
      err.details || null
    );
  }

  return fail(res, err.message || "Error interno del servidor", 500);
};
