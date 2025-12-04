// server/routes/usuarios.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
// Assumindo que você tem uma biblioteca para hash de senhas, como bcrypt
const bcrypt = require('bcryptjs'); 

// Importa os middlewares que criamos
const { verificarToken, apenasAdmin } = require('../middleware/auth');

// Rota POST para CADASTRAR um novo usuário (cliente, dono ou admin)
router.post('/cadastro', async (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  // Validação
  if (!nome || !email || !senha || !tipo) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios: nome, email, senha, tipo.' });
  }
  if (!['cliente', 'dono_estabelecimento', 'admin'].includes(tipo)) {
    return res.status(400).json({ erro: 'O tipo de usuário é inválido.' });
  }

  try {
    // É FUNDAMENTAL armazenar a senha como um hash, nunca como texto plano
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const query = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
    const valores = [nome, email, senhaHash, tipo];

    db.query(query, valores, (err, results) => {
      if (err) {
        console.error('Erro ao inserir usuário:', err);
        // Verifica erro de email duplicado
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ erro: 'Este email já está cadastrado.' });
        }
        return res.status(500).json({ erro: 'Erro interno ao cadastrar o usuário.' });
      }

      // Após criar o usuário, você pode querer criar uma entrada na tabela específica
      // Ex: if (tipo === 'cliente') { /* insere na tabela clientes com results.insertId */ }
      
      const payload = { id: results.insertId, tipo: tipo, nome: nome };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

      res.status(201).json({
        mensagem: "Usuário cadastrado com sucesso!",
        usuario: payload,
        token
      });
    });
  } catch (error) {
    console.error('Erro no processo de cadastro:', error);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

// Rota POST para LOGIN de usuário
router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ erro: 'Erro interno no servidor.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ erro: 'Credenciais inválidas.' }); // Usuário não encontrado
        }

        const usuario = results[0];

        // Compara a senha enviada com o hash salvo no banco
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ erro: 'Credenciais inválidas.' }); // Senha incorreta
        }
        
        // Se a senha estiver correta, gera o token
        const payload = { id: usuario.id, tipo: usuario.tipo, nome: usuario.nome };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({
            mensagem: "Login bem-sucedido!",
            usuario: payload,
            token
        });
    });
});


// Rota para listar todos os usuários (protegida)
router.get('/', verificarToken, apenasAdmin, (req, res) => {
  const query = 'SELECT id, nome, email, tipo FROM usuarios';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err);
      return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
    res.json(results);
  });
});


module.exports = router;