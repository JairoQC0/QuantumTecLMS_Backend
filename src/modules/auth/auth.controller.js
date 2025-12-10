// src/modules/auth/auth.controller.js
import bcrypt from "bcryptjs";
import { prisma } from "../../core/prismaClient.js";
import { signToken } from "../../core/auth.js";
import { ok } from "../../core/respuestas.js";
import { businessError } from "../../core/businessError.js";

export const authController = {
  // POST /api/auth/register
  async register(req, res, next) {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        throw businessError("name, email y password son obligatorios");
      }

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        throw businessError("El correo ya está registrado");
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: role || "STUDENT",
        },
      });

      const token = signToken(user);

      return ok(
        res,
        {
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        "Usuario registrado correctamente",
        201
      );
    } catch (error) {
      next(error);
    }
  },

  // POST /api/auth/login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw businessError("email y password son obligatorios");
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw businessError("Credenciales inválidas");
      }

      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        throw businessError("Credenciales inválidas");
      }

      const token = signToken(user);

      return ok(
        res,
        {
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        "Login exitoso"
      );
    } catch (error) {
      next(error);
    }
  },

  // GET /api/auth/me
  async me(req, res, next) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.currentUser.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      return ok(res, user, "Perfil obtenido");
    } catch (error) {
      next(error);
    }
  },
};
