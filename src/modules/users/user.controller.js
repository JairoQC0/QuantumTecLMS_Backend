// src/modules/users/user.controller.js
import { ok } from "../../core/respuestas.js";
import { userService } from "./user.service.js";
import { businessError } from "../../core/businessError.js";

export const userController = {
  async list(req, res, next) {
    try {
      const users = await userService.list();
      return ok(res, users, "Usuarios listados");
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) throw businessError("ID inválido");

      const user = await userService.getById(id);
      return ok(res, user, "Usuario obtenido");
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) throw businessError("ID inválido");

      const updated = await userService.update(id, req.body);
      return ok(res, updated, "Usuario actualizado");
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) throw businessError("ID inválido");

      await userService.softDelete(id);
      return ok(res, null, "Usuario desactivado");
    } catch (error) {
      next(error);
    }
  },
};
