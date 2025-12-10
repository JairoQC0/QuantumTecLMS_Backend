import { Router } from "express";
import { cursoControlador } from "./curso.controlador.js";
import { verificarTokenMiddleware } from "../../core/autenticacionJWT.js";

export const routerCursos = Router();

routerCursos.use(verificarTokenMiddleware);

routerCursos.get("/", cursoControlador.listar);
routerCursos.get("/docente/mis-cursos", cursoControlador.listarPorDocente);
routerCursos.get("/:id", cursoControlador.obtenerPorId);
routerCursos.post("/", cursoControlador.crear);
routerCursos.put("/:id", cursoControlador.actualizar);
routerCursos.delete("/:id", cursoControlador.eliminar);
