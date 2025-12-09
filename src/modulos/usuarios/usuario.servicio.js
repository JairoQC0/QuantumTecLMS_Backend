import bcrypt from "bcryptjs";
import { usuarioRepositorio } from "./usuario.repositorio.js";
import {
  validarCreacionUsuario,
  validarActualizacionUsuario,
} from "./usuario.validacion.js";

export const usuarioServicio = {
  async listar() {
    return usuarioRepositorio.listar();
  },

  async obtenerPorId(id) {
    const usuario = await usuarioRepositorio.buscarPorId(id);
    if (!usuario) {
      const error = new Error("Usuario no encontrado");
      error.tipo = "VALIDACION";
      throw error;
    }
    return usuario;
  },

  async crear(payload) {
    validarCreacionUsuario(payload);

    const existente = await usuarioRepositorio.buscarPorCorreo(payload.correo);
    if (existente) {
      const error = new Error("Ya existe un usuario con ese correo");
      error.tipo = "VALIDACION";
      throw error;
    }

    const contrasenaHash = await bcrypt.hash(payload.contrasena, 10);

    const nuevoUsuario = await usuarioRepositorio.crear({
      nombre: payload.nombre.trim(),
      correo: payload.correo.toLowerCase(),
      contrasenaHash,
      rol: payload.rol,
    });

    const { contrasenaHash: _, ...usuarioSinContrasena } = nuevoUsuario;
    return usuarioSinContrasena;
  },

  async actualizar(id, payload) {
    validarActualizacionUsuario(payload);

    if (payload.correo) {
      const existente = await usuarioRepositorio.buscarPorCorreo(
        payload.correo
      );
      if (existente && existente.id !== id) {
        const error = new Error("Ya existe un usuario con ese correo");
        error.tipo = "VALIDACION";
        throw error;
      }
    }

    const datosActualizar = {
      nombre: payload.nombre,
      correo: payload.correo?.toLowerCase(),
      rol: payload.rol,
    };

    Object.keys(datosActualizar).forEach((clave) => {
      if (typeof datosActualizar[clave] === "undefined")
        delete datosActualizar[clave];
    });

    const actualizado = await usuarioRepositorio.actualizar(
      id,
      datosActualizar
    );
    const { contrasenaHash: _, ...usuarioSinContrasena } = actualizado;
    return usuarioSinContrasena;
  },

  async eliminar(id) {
    await usuarioRepositorio.eliminarLogico(id);
    return true;
  },
};
