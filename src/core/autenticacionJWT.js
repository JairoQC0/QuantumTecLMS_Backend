import jwt from "jsonwebtoken";

const CLAVE_JWT = process.env.JWT_SECRET || "CLAVE_SUPER_SECRETA";

export function generarToken(usuario) {
  const payload = {
    id: usuario.id,
    correo: usuario.correo,
    rol: usuario.rol,
  };

  return jwt.sign(payload, CLAVE_JWT, { expiresIn: "8h" });
}

export function verificarTokenMiddleware(req, res, next) {
  const cabecera = req.headers["authorization"];

  if (!cabecera) {
    const error = new Error("Token no proporcionado");
    error.tipo = "AUTENTICACION";
    return next(error);
  }

  const [tipo, token] = cabecera.split(" ");

  if (tipo !== "Bearer" || !token) {
    const error = new Error("Formato de token inválido");
    error.tipo = "AUTENTICACION";
    return next(error);
  }

  try {
    const datos = jwt.verify(token, CLAVE_JWT);
    req.usuarioActual = datos;
    next();
  } catch (e) {
    const error = new Error("Token inválido o expirado");
    error.tipo = "AUTENTICACION";
    return next(error);
  }
}
