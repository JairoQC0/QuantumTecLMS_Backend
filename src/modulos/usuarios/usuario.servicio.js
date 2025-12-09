import bcrypt from "bcryptjs";
import { usuarioRepositorio } from "./usuario.repositorio.js";

export const usuarioServicio = {
  async login(correo, contrasena) {
    const usuario = await usuarioRepositorio.buscarPorCorreo(correo);

    if (!usuario || usuario.eliminado)
      throw { tipo: "VALIDACION", message: "Credenciales inválidas" };

    const ok = await bcrypt.compare(contrasena, usuario.contrasenaHash);
    if (!ok) throw { tipo: "VALIDACION", message: "Credenciales inválidas" };

    return usuario;
  },

  async obtenerMiPerfil(id) {
    const usuario = await usuarioRepositorio.buscarPorId(id);
    if (!usuario)
      throw { tipo: "VALIDACION", message: "Usuario no encontrado" };

    delete usuario.contrasenaHash;
    return usuario;
  },

  async actualizarMiPerfil(id, datos) {
    const actualizado = await usuarioRepositorio.actualizar(id, {
      nombre: datos.nombre,
      correo: datos.correo?.toLowerCase(),
    });

    delete actualizado.contrasenaHash;
    return actualizado;
  },

  async cambiarContrasena(id, actual, nueva) {
    const usuario = await usuarioRepositorio.buscarPorId(id);
    if (!usuario)
      throw { tipo: "VALIDACION", message: "Usuario no encontrado" };

    const ok = await bcrypt.compare(actual, usuario.contrasenaHash);
    if (!ok)
      throw { tipo: "VALIDACION", message: "Contraseña actual incorrecta" };

    const nuevaHash = await bcrypt.hash(nueva, 10);

    await usuarioRepositorio.actualizar(id, { contrasenaHash: nuevaHash });

    return true;
  },

  listar: () => usuarioRepositorio.listar(),
  obtenerPorId: (id) => usuarioRepositorio.buscarPorId(id),
  crear: (body) => usuarioRepositorio.crear(body),
  actualizar: (id, body) => usuarioRepositorio.actualizar(id, body),
  eliminar: (id) => usuarioRepositorio.eliminar(id),
};
