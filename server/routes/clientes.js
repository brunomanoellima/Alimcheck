const express = require('express');
const router = express.Router();
const db = require('../db');
const { verificarToken, apenasAdmin, apenasProprioUsuarioOuAdmin } = require('../middleware/auth');

// Rota para um ADMIN listar TODOS os clientes
// GET /api/clientes
router.get('/', verificarToken, apenasAdmin, (req, res) => {
    // Aqui você pode fazer um JOIN com a tabela usuarios se precisar de mais dados
    const query = 'SELECT * FROM clientes'; 
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar clientes.' });
        res.json(results);
    });
});

// Rota para buscar o perfil de UM cliente específico.
// Acessível pelo próprio cliente ou por um admin.
// GET /api/clientes/:id
router.get('/:id', verificarToken, apenasProprioUsuarioOuAdmin, (req, res) => {
    const { id } = req.params; // O id aqui é o ID do usuário
    const query = 'SELECT * FROM clientes WHERE usuario_id = ?'; // Supondo que a FK se chama 'usuario_id'
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar perfil do cliente.' });
        if (results.length === 0) return res.status(404).json({ erro: 'Perfil de cliente não encontrado.' });
        res.json(results[0]);
    });
});

// Rota para ATUALIZAR o perfil de UM cliente.
// Acessível apenas pelo próprio cliente.
// PUT /api/clientes/:id
router.put('/:id', verificarToken, apenasProprioUsuarioOuAdmin, (req, res) => {
    const { id } = req.params;
    const { dadosDoCliente } = req.body; // Ex: { endereco: 'Rua X', telefone: '99999' }
    
    // Lógica para atualizar a tabela 'clientes' onde usuario_id = id
    res.send(`Perfil do cliente ${id} atualizado.`);
});

module.exports = router;