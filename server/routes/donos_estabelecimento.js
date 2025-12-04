const express = require('express');
const router = express.Router();
const db = require('../db');
const { verificarToken, apenasAdmin, apenasProprioUsuarioOuAdmin } = require('../middleware/auth');

// Rota para um ADMIN listar TODOS os donos de estabelecimento
// GET /api/donos-estabelecimento
router.get('/', verificarToken, apenasAdmin, (req, res) => {
    const query = 'SELECT * FROM donos_estabelecimento';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar donos.' });
        res.json(results);
    });
});

// Rota para buscar o perfil de UM dono específico.
// Acessível pelo próprio dono ou por um admin.
// GET /api/donos-estabelecimento/:id
router.get('/:id', verificarToken, apenasProprioUsuarioOuAdmin, (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM donos_estabelecimento WHERE usuario_id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar perfil do dono.' });
        if (results.length === 0) return res.status(404).json({ erro: 'Perfil de dono não encontrado.' });
        res.json(results[0]);
    });
});

// Outras rotas como PUT e DELETE seguiriam a mesma lógica de proteção.

module.exports = router;