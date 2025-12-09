import { usuarioServicio } from "./usuario.servicio.js";
import { generarToken } from "../../core/autenticacionJWT.js";
import { respuestaExitosa } from "../../core/respuestas.js";

export const usuarioControlador = {
  async login(req, res, next) {
    try {
      const usuario = await usuarioServicio.login(
        req.body.correo,
        req.body.contrasena
      );

      const token = generarToken(usuario);

      delete usuario.contrasenaHash;

      return respuestaExitosa(res, { usuario, token }, "Login exitoso");
    } catch (err) {
      next(err);
    }
  },

  async me(req, res, next) {
    try {
      const perfil = await usuarioServicio.obtenerMiPerfil(
        req.usuarioActual.id
      );
      return respuestaExitosa(res, perfil, "Perfil obtenido");
    } catch (err) {
      next(err);
    }
  },

  async updateMe(req, res, next) {
    try {
      const actualizado = await usuarioServicio.actualizarMiPerfil(
        req.usuarioActual.id,
        req.body
      );
      return respuestaExitosa(res, actualizado, "Perfil actualizado");
    } catch (err) {
      next(err);
    }
  },

  async changePassword(req, res, next) {
    try {
      await usuarioServicio.cambiarContrasena(
        req.usuarioActual.id,
        req.body.actual,
        req.body.nueva
      );
      return respuestaExitosa(res, null, "Contraseña actualizada");
    } catch (err) {
      next(err);
    }
  },

  listar: async (req, res, next) => {
    try {
      const data = await usuarioServicio.listar();
      return respuestaExitosa(res, data);
    } catch (err) {
      next(err);
    }
  },

  obtenerPorId: async (req, res, next) => {
    try {
      const data = await usuarioServicio.obtenerPorId(parseInt(req.params.id));
      return respuestaExitosa(res, data);
    } catch (err) {
      next(err);
    }
  },

  crear: async (req, res, next) => {
    try {
      const data = await usuarioServicio.crear(req.body);
      return respuestaExitosa(res, data, "Usuario creado", 201);
    } catch (err) {
      next(err);
    }
  },

  actualizar: async (req, res, next) => {
    try {
      const data = await usuarioServicio.actualizar(
        parseInt(req.params.id),
        req.body
      );
      return respuestaExitosa(res, data, "Usuario actualizado");
    } catch (err) {
      next(err);
    }
  },

  eliminar: async (req, res, next) => {
    try {
      await usuarioServicio.eliminar(parseInt(req.params.id));
      return respuestaExitosa(res, null, "Usuario eliminado");
    } catch (err) {
      next(err);
    }
  },
};
