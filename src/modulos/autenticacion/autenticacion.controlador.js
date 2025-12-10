import bcrypt from "bcryptjs";
import { usuarioRepositorio } from "../usuarios/usuario.repositorio.js";
import { generarToken } from "../../core/autenticacionJWT.js";
import { respuestaExitosa, respuestaError } from "../../core/respuestas.js";

async function login(req, res, next) {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return respuestaError(res, 400, "Correo y contraseña son obligatorios");
    }

    const usuario = await usuarioRepositorio.obtenerPorCorreo(
      correo.toLowerCase()
    );

    if (!usuario) {
      return respuestaError(res, 401, "Credenciales inválidas");
    }

    const coincide = await bcrypt.compare(contrasena, usuario.contrasenaHash);

    if (!coincide) {
      return respuestaError(res, 401, "Credenciales inválidas");
    }

    const token = generarToken(usuario);
    const { contrasenaHash, ...usuarioSinPassword } = usuario;

    return respuestaExitosa(
      res,
      { token, usuario: usuarioSinPassword },
      "Inicio de sesión exitoso"
    );
  } catch (err) {
    next(err);
  }
}

export const autenticacionControlador = { login };
