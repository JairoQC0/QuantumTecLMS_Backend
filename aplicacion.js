import express from "express";
import cors from "cors";
import { manejarErrores } from "./src/core/manejoErrores.js";
import { respuestasNoEncontrado } from "./src/core/respuestas.js";

import { routerUsuarios } from "./src/modulos/usuarios/usuario.rutas.js";
import { routerAutenticacion } from "./src/modulos/autenticacion/autenticacion.rutas.js";

export function crearAplicacion() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api/usuarios", routerUsuarios);
  app.use("/api/autenticacion", routerAutenticacion);

  app.use((req, res) => {
    return respuestasNoEncontrado(res, "Ruta no encontrada");
  });

  app.use(manejarErrores);

  return app;
}
