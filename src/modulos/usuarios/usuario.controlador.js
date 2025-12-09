import { usuarioServicio } from "./usuario.servicio.js";
import { respuestaExitosa } from "../../core/respuestas.js";

export const usuarioControlador = {
  async listar(req, res, next) {
    try {
      const usuarios = await usuarioServicio.listar();
      return respuestaExitosa(
        res,
        usuarios,
        "Usuarios obtenidos correctamente"
      );
    } catch (err) {
      next(err);
    }
  },

  async obtenerPorId(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10);
      const usuario = await usuarioServicio.obtenerPorId(id);
      return respuestaExitosa(res, usuario, "Usuario obtenido correctamente");
    } catch (err) {
      next(err);
    }
  },

  async crear(req, res, next) {
    try {
      const usuarioCreado = await usuarioServicio.crear(req.body);
      return respuestaExitosa(
        res,
        usuarioCreado,
        "Usuario creado correctamente",
        201
      );
    } catch (err) {
      next(err);
    }
  },

  async actualizar(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10);
      const usuarioActualizado = await usuarioServicio.actualizar(id, req.body);
      return respuestaExitosa(
        res,
        usuarioActualizado,
        "Usuario actualizado correctamente"
      );
    } catch (err) {
      next(err);
    }
  },

  async eliminar(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10);
      await usuarioServicio.eliminar(id);
      return respuestaExitosa(res, null, "Usuario eliminado correctamente");
    } catch (err) {
      next(err);
    }
  },
};
