import { usuarioRepositorio } from "./usuario.repositorio.js";
import bcrypt from "bcryptjs";

export const usuarioServicio = {
  async login(correo, contrasena) {
    const usuario = await usuarioRepositorio.obtenerPorCorreo(correo);
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

    return usuario;
  },

  listar() {
    return usuarioRepositorio.listar();
  },

  listarPorRol(rol) {
    if (!rol) return usuarioRepositorio.listar();
    return usuarioRepositorio.listarPorRol(rol.toUpperCase());
  },

  obtenerPorId(id) {
    return usuarioRepositorio.obtenerPorId(id);
  },

  obtenerPorCorreo(correo) {
    return usuarioRepositorio.obtenerPorCorreo(correo);
  },

  async crear(data) {
    const hash = bcrypt.hashSync(data.contrasena, 10);
    data.contrasenaHash = hash;
    delete data.contrasena;

    return usuarioRepositorio.crear(data);
  },

  actualizar(id, data) {
    return usuarioRepositorio.actualizar(id, data);
  },

  async eliminar(id) {
    return usuarioRepositorio.eliminar(id);
  },

  async restaurar(id) {
    return usuarioRepositorio.restaurar(id);
  },

  async obtenerMiPerfil(id) {
    return usuarioRepositorio.obtenerPorId(id);
  },

  async actualizarMiPerfil(id, data) {
    delete data.rol;
    delete data.contrasenaHash;
    delete data.eliminado;

    return usuarioRepositorio.actualizar(id, data);
  },

  async cambiarContrasena(id, actual, nueva) {
    const usuario = await usuarioRepositorio.obtenerPorId(id);
    const coincide = await bcrypt.compare(actual, usuario.contrasenaHash);

    if (!coincide) {
      const error = new Error("Contraseña actual incorrecta");
      error.tipo = "AUTENTICACION";
      throw error;
    }

    const nuevoHash = bcrypt.hashSync(nueva, 10);

    return usuarioRepositorio.actualizar(id, {
      contrasenaHash: nuevoHash,
    });
  },
};
