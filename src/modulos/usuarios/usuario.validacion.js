export function validarCreacionUsuario(payload) {
  const errores = {};

  if (
    !payload.nombre ||
    typeof payload.nombre !== "string" ||
    payload.nombre.trim().length < 2
  ) {
    errores.nombre =
      "El nombre es obligatorio y debe tener al menos 2 caracteres";
  }

  if (
    !payload.correo ||
    typeof payload.correo !== "string" ||
    !payload.correo.includes("@")
  ) {
    errores.correo = "El correo es obligatorio y debe tener formato válido";
  }

  if (
    !payload.contrasena ||
    typeof payload.contrasena !== "string" ||
    payload.contrasena.length < 6
  ) {
    errores.contrasena =
      "La contraseña es obligatoria y debe tener al menos 6 caracteres";
  }

  if (
    !payload.rol ||
    !["ADMIN", "DOCENTE", "ESTUDIANTE"].includes(payload.rol)
  ) {
    errores.rol =
      "El rol es obligatorio y debe ser ADMIN, DOCENTE o ESTUDIANTE";
  }

  if (Object.keys(errores).length > 0) {
    const error = new Error("Datos de usuario inválidos");
    error.tipo = "VALIDACION";
    error.detalles = errores;
    throw error;
  }
}

export function validarActualizacionUsuario(payload) {
  const errores = {};

  if (
    payload.nombre &&
    (typeof payload.nombre !== "string" || payload.nombre.trim().length < 2)
  ) {
    errores.nombre = "El nombre debe tener al menos 2 caracteres";
  }

  if (
    payload.correo &&
    (typeof payload.correo !== "string" || !payload.correo.includes("@"))
  ) {
    errores.correo = "El correo debe tener formato válido";
  }

  if (
    payload.rol &&
    !["ADMIN", "DOCENTE", "ESTUDIANTE"].includes(payload.rol)
  ) {
    errores.rol = "El rol debe ser ADMIN, DOCENTE o ESTUDIANTE";
  }

  if (Object.keys(errores).length > 0) {
    const error = new Error("Datos de usuario inválidos");
    error.tipo = "VALIDACION";
    error.detalles = errores;
    throw error;
  }
}
