import express from "express";
import morgan from "morgan";
import cors from "cors"; // Asegúrate de instalarlo con `npm install cors`

import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'https://eccargo-julianv-web-front-production.up.railway.app',
  optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, varios SmartTVs) se bloquean con 204
}

// Middlewares
app.use(cors(corsOptions)); // Usar cors como middleware con las opciones definidas
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", indexRoutes);
app.use("/api", employeesRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
