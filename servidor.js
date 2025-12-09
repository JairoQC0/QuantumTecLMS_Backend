import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { crearAplicacion } from "./src/aplicacion.js";

const puerto = process.env.PUERTO || 4000;

const app = crearAplicacion();
const servidor = http.createServer(app);

servidor.listen(puerto, () => {
  console.log(`Servidor QuantumTec escuchando en puerto ${puerto}`);
});
