import { Router } from "express";
import { usuarioControlador } from "./usuario.controlador.js";
import { verificarTokenMiddleware } from "../../core/autenticacionJWT.js";

export const routerUsuarios = Router();

routerUsuarios.post("/login", usuarioControlador.login);

routerUsuarios.use(verificarTokenMiddleware);

routerUsuarios.get("/me", usuarioControlador.me);
routerUsuarios.put("/me", usuarioControlador.updateMe);
routerUsuarios.put("/me/password", usuarioControlador.changePassword);

routerUsuarios.get("/", usuarioControlador.listar);
routerUsuarios.get("/:id", usuarioControlador.obtenerPorId);
routerUsuarios.post("/", usuarioControlador.crear);
routerUsuarios.put("/:id", usuarioControlador.actualizar);
routerUsuarios.delete("/:id", usuarioControlador.eliminar);

routerUsuarios.put("/:id/restaurar", usuarioControlador.restaurar);
