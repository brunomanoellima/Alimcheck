const express = require('express');
const router = express.Router();
const db = require('../db');
const { verificarToken, apenasAdmin } = require('../middleware/auth');

// Rotas para administradores devem ser, em geral, protegidas para outros admins
// GET /api/administradores

// Rota para listar todos os usuários com perfil de admin
router.get('/', verificarToken, apenasAdmin, (req, res) => {
    // Busca na tabela usuarios por tipo 'admin'
    const query = "SELECT id, nome, email, tipo FROM usuarios WHERE tipo = 'admin'";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar administradores.' });
        res.json(results);
    });
});

// Talvez não exista uma rota para buscar um admin específico ou deletar,
// já que o cadastro e o gerenciamento geral já estão em /api/usuarios
// e protegidos pela lógica de `apenasAdmin`.

module.exports = router;