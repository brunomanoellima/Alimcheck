const express = require('express');
const router = express.Router();
const db = require('../db');

// Registrar nova avaliação
router.post('/', (req, res) => {
  const { user_id, estabelecimento_id, nota, comentario } = req.body;

  // Verifica se o usuário já avaliou nos últimos 30 dias
  db.query(
    'SELECT * FROM avaliacoes WHERE user_id = ? AND estabelecimento_id = ? AND data_avaliacao >= NOW() - INTERVAL 30 DAY',
    [user_id, estabelecimento_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) {
        return res.status(400).json({ error: 'Você já avaliou este estabelecimento nos últimos 30 dias.' });
      }

      // Se não, insere a nova avaliação
      db.query(
        'INSERT INTO avaliacoes (user_id, estabelecimento_id, nota, comentario) VALUES (?, ?, ?, ?)',
        [user_id, estabelecimento_id, nota, comentario],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ id: result.insertId });
        }
      );
    }
  );
});

// Listar todas as avaliações
router.get('/', (req, res) => {
  db.query('SELECT * FROM avaliacoes', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Excluir avaliação (painel admin)
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM avaliacoes WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Avaliação excluída.' });
  });
});

module.exports = router;
