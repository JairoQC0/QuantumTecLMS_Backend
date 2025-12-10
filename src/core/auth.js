// src/core/auth.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const signToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
};

export const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers["authorization"] || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      const err = new Error("Token no proporcionado");
      err.type = "AUTH";
      throw err;
    }

    const payload = jwt.verify(token, JWT_SECRET);
    req.currentUser = { id: payload.id, role: payload.role };
    next();
  } catch (error) {
    const err = new Error("Token inválido o expirado");
    err.type = "AUTH";
    next(err);
  }
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.currentUser || !roles.includes(req.currentUser.role)) {
      const err = new Error("No tienes permisos para esta acción");
      err.type = "AUTH";
      return next(err);
    }
    next();
  };
};
