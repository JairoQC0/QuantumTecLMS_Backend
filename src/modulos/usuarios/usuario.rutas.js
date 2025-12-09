import { Router } from "express";
import { usuarioControlador } from "./usuario.controlador.js";
import { verificarTokenMiddleware } from "../../core/autenticacionJWT.js";

export const routerUsuarios = Router();

routerUsuarios.use(verificarTokenMiddleware);

routerUsuarios.get("/", usuarioControlador.listar);
routerUsuarios.get("/:id", usuarioControlador.obtenerPorId);
routerUsuarios.post("/", usuarioControlador.crear);
routerUsuarios.put("/:id", usuarioControlador.actualizar);
routerUsuarios.delete("/:id", usuarioControlador.eliminar);
