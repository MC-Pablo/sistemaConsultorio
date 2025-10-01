import express from "express";
import { connectDB } from "./config/mongoose.config.js";
import { ERROR_SERVER, ERROR_NOT_FOUND_URL } from "./messages.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Control de rutas inexistentes
/* server.all("*", (req, res) => {
    res.status(404).send(`<h1>Error 404</h1><h3>${ERROR_NOT_FOUND_URL.message}</h3>`);
  }); */

// Control de errores internos
server.use((error, req, res, next) => {
  console.error("Error:", error.message);
  res.status(500).send(`<h1>Error 500</h1><h3>${ERROR_SERVER.message}</h3>`);
});

// Conectar a MongoDB y luego iniciar el servidor
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Servidor ejecutándose en http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ No se pudo conectar a MongoDB:", err.message);
    process.exit(1);
  });
