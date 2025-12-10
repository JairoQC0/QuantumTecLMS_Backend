import { Router } from "express";
import { verificarTokenMiddleware } from "../../core/autenticacionJWT.js";
import { inscripcionControlador } from "./inscripcion.controlador.js";

export const routerInscripciones = Router();

routerInscripciones.use(verificarTokenMiddleware);

routerInscripciones.post("/", inscripcionControlador.inscribirse);
routerInscripciones.get("/mis", inscripcionControlador.misInscripciones);

routerInscripciones.get(
  "/curso/:cursoId",
  inscripcionControlador.inscritosDelCurso
);

routerInscripciones.delete("/:id", inscripcionControlador.eliminar);
