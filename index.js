import dotenv from "dotenv";
dotenv.config();

import cors from 'cors';

import express from "express";
import productosRoutes from "./src/routes/productos.routes.js";

const app = express();
// Middleware para parsear JSON




// Configuración de CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// ojo el orden sino da vacio al querer procesar la ruta de productos
app.use("/api/productos", productosRoutes);
// Middleware para manejar rutas no encontradas

app.use((req, res, next) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Error interno del servidor" });
});


// Iniciamos el servidor
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));