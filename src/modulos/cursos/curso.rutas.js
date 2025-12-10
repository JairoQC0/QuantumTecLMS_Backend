import { Router } from "express";
import { verificarTokenMiddleware } from "../../core/autenticacionJWT.js";
import { cursoControlador } from "./curso.controlador.js";

export const routerCursos = Router();

routerCursos.use(verificarTokenMiddleware);

routerCursos.get("/", cursoControlador.listarTodos);
routerCursos.post("/", cursoControlador.crear);
routerCursos.put("/:id", cursoControlador.actualizar);
routerCursos.delete("/:id", cursoControlador.eliminar);

routerCursos.get("/docente/mis-cursos", cursoControlador.listarMisCursos);
routerCursos.get(
  "/estudiante/disponibles",
  cursoControlador.listarCursosDisponibles
);
