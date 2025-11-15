const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No autorizado. Falta el token." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token inválido o faltante." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "tu_clave_secreta_muy_segura"
    );

    // Tu token contiene: { userId, email, rol }
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    req.userRol = decoded.rol;

    next();

  } catch (err) {
    return res.status(401).json({ error: "Token no válido o expirado." });
  }
};
