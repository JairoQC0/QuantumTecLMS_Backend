import bcrypt from "bcryptjs";
import { usuarioRepositorio } from "../usuarios/usuario.repositorio.js";
import { generarToken } from "../../core/autenticacionJWT.js";
import { respuestaExitosa, respuestaError } from "../../core/respuestas.js";

async function login(req, res, next) {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return respuestaError(res, "Correo y contraseña son obligatorios", 400);
    }

    const correoNormalizado = correo.trim().toLowerCase();
    const usuario = await usuarioRepositorio.obtenerPorCorreo(
      correoNormalizado
    );

    if (!usuario) {
      return respuestaError(res, "Credenciales inválidas", 401);
    }

    const coincide = await bcrypt.compare(contrasena, usuario.contrasenaHash);
    if (!coincide) {
      return respuestaError(res, "Credenciales inválidas", 401);
    }

    const token = generarToken(usuario);
    const { contrasenaHash, ...usuarioSinContrasena } = usuario;

    return respuestaExitosa(
      res,
      { token, usuario: usuarioSinContrasena },
      "Inicio de sesión exitoso"
    );
  } catch (err) {
    next(err);
  }
}

export const autenticacionControlador = { login };
