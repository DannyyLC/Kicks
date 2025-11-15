const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const productsRoutes = require("./routes/products.routes");
const cartRoutes = require("./routes/cart.routes");
const ordenesRoutes = require("./routes/ordenes.routes");
const suscripcionRoutes = require("./routes/suscripcion.routes");
const contactRoutes = require("./routes/contact.routes");
const authRoutes = require("./routes/auth.routes");

dotenv.config();


const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// Servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], // Especificar orígenes permitidos
    credentials: true, // Permitir credenciales (cookies, headers de autenticación)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}));

app.get("api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/ordenes", ordenesRoutes);
app.use("/api/suscripcion", suscripcionRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
