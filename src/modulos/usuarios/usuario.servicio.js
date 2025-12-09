import bcrypt from "bcryptjs";
import { usuarioRepositorio } from "./usuario.repositorio.js";

export const usuarioServicio = {
  async login(correo, contrasena) {
    const usuario = await usuarioRepositorio.obtenerPorCorreo(correo);

    if (!usuario) throw new Error("Credenciales inválidas");

    const valido = bcrypt.compareSync(contrasena, usuario.contrasenaHash);

    if (!valido) throw new Error("Credenciales inválidas");

    return usuario;
  },

  async obtenerMiPerfil(id) {
    return usuarioRepositorio.obtenerPorId(id);
  },

  async actualizarMiPerfil(id, body) {
    return usuarioRepositorio.actualizar(id, body);
  },

  async cambiarContrasena(id, actual, nueva) {
    const usuario = await usuarioRepositorio.obtenerPorId(id);

    if (!bcrypt.compareSync(actual, usuario.contrasenaHash)) {
      throw new Error("Contraseña actual incorrecta");
    }

    const nuevoHash = bcrypt.hashSync(nueva, 10);

    return usuarioRepositorio.actualizar(id, {
      contrasenaHash: nuevoHash,
    });
  },

  async listar() {
    return usuarioRepositorio.listar();
  },

  async obtenerPorId(id) {
    return usuarioRepositorio.obtenerPorId(id);
  },

  async crear(body) {
    const { nombre, correo, contrasena, rol } = body;

    if (!nombre || !correo || !contrasena || !rol) {
      throw new Error("Faltan datos obligatorios");
    }

    const contrasenaHash = bcrypt.hashSync(contrasena, 10);

    const nuevo = await usuarioRepositorio.crear({
      nombre,
      correo,
      contrasenaHash,
      rol,
    });

    delete nuevo.contrasenaHash;

    return nuevo;
  },

  async actualizar(id, body) {
    if (body.contrasena) {
      body.contrasenaHash = bcrypt.hashSync(body.contrasena, 10);
      delete body.contrasena;
    }

    return usuarioRepositorio.actualizar(id, body);
  },

  async eliminar(id) {
    return usuarioRepositorio.eliminar(id);
  },

  async restaurar(id) {
    return usuarioRepositorio.restaurar(id);
  },
};
