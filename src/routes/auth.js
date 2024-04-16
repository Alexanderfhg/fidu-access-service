const jwt = require('jsonwebtoken');

// Secreto para firmar el token (se recomienda almacenarlo de forma segura)
const JWT_SECRET = process.env.JWT_SECRET;

// Función para generar un token JWT
function generateToken(usuario) {
    return jwt.sign({ usuario }, JWT_SECRET, { expiresIn: '1h' });
}

// Función para verificar y decodificar un token JWT
function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({ mensaje: 'Token inválido' });
        }

        req.usuario = decoded.usuario;
        next();
    });
}

module.exports = { generateToken, verifyToken };
