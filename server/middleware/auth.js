// server/middleware/auth.js

const jwt = require('jsonwebtoken');

// Middleware que valida se o token existe e é válido
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token de autenticação ausente.' });
  }
  
  const token = authHeader.split(' ')[1]; // Formato esperado: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Token mal formatado.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
}

// Middleware que restringe o acesso apenas a administradores
function apenasAdmin(req, res, next) {
  if (req.usuario && req.usuario.tipo === 'admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Acesso negado. Rota exclusiva para administradores.' });
  }
}

// Middleware que permite acesso ao próprio usuário ou a um admin
function apenasProprioUsuarioOuAdmin(req, res, next) {
    if (req.usuario && (req.usuario.tipo === 'admin' || req.usuario.id == req.params.id)) {
        next();
    } else {
        return res.status(403).json({ error: 'Acesso negado. Você só pode acessar seus próprios dados.' });
    }
}

module.exports = {
  verificarToken,
  apenasAdmin,
  apenasProprioUsuarioOuAdmin
};