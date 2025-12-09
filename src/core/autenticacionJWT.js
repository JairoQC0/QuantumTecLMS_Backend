import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const CLAVE = process.env.JWT_CLAVE || "CLAVE_SUPER_SECRETA";

export const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id,
      rol: usuario.rol,
    },
    CLAVE,
    { expiresIn: "8h" }
  );
};

export const verificarTokenMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      exito: false,
      mensaje: "Token no proporcionado",
      errores: null,
    });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, CLAVE);

    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.id },
    });

    if (!usuario || usuario.eliminado) {
      return res.status(401).json({
        exito: false,
        mensaje: "Token inválido o usuario eliminado",
      });
    }

    req.usuarioActual = usuario;

    next();
  } catch (error) {
    return res.status(401).json({
      exito: false,
      mensaje: "Token inválido",
    });
  }
};
