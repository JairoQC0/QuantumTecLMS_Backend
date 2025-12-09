import bcrypt from "bcryptjs";
import { usuarioRepositorio } from "../usuarios/usuario.repositorio.js";
import { generarToken } from "../../core/autenticacionJWT.js";
import { respuestaExitosa } from "../../core/respuestas.js";

async function login(req, res, next) {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      const error = new Error("Correo y contraseña son obligatorios");
      error.tipo = "VALIDACION";
      throw error;
    }

    const usuario = await usuarioRepositorio.buscarPorCorreo(
      correo.toLowerCase()
    );
    if (!usuario) {
      const error = new Error("Credenciales inválidas");
      error.tipo = "AUTENTICACION";
      throw error;
    }

    const coincide = await bcrypt.compare(contrasena, usuario.contrasenaHash);
    if (!coincide) {
      const error = new Error("Credenciales inválidas");
      error.tipo = "AUTENTICACION";
      throw error;
    }

    const token = generarToken(usuario);
    const { contrasenaHash: _, ...usuarioSinContrasena } = usuario;

    return respuestaExitosa(
      res,
      { token, usuario: usuarioSinContrasena },
      "Inicio de sesión exitoso"
    );
  } catch (err) {
    next(err);
  }
}

export const autenticacionControlador = {
  login,
};
