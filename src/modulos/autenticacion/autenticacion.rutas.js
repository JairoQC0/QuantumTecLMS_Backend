import { Router } from "express";
import { autenticacionControlador } from "./autenticacion.controlador.js";

export const routerAutenticacion = Router();

routerAutenticacion.post("/login", autenticacionControlador.login);
