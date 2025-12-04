// server/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * Rota para CADASTRAR um novo usuário.
 * URL: POST /api/auth/cadastro
 */
router.post('/cadastro', async (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    // --- Validação Rigorosa dos Dados de Entrada ---
    if (!nome || !email || !senha || !tipo) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios: nome, email, senha e tipo.' });
    }

    // Validação estrita para o campo 'tipo'. Só aceitamos os valores esperados (em minúsculas).
    const tipoValido = tipo.toLowerCase();
    if (!['cliente', 'dono_estabelecimento', 'admin'].includes(tipoValido)) {
        return res.status(400).json({ erro: `O tipo de usuário '${tipo}' é inválido.` });
    }

    try {
        // Criptografa a senha antes de salvar no banco
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        // --- PASSO 1: Inserir na tabela principal 'usuarios' ---
        const queryUsuario = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
        db.query(queryUsuario, [nome, email, senhaHash, tipoValido], (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ erro: 'Este email já está em uso.' });
                }
                console.error("ERRO ao inserir em usuarios:", err);
                return res.status(500).json({ erro: 'Erro interno ao cadastrar o usuário.' });
            }

            const novoUsuarioId = results.insertId;

            // --- PASSO 2: Inserir na tabela de perfil correspondente ---
            let queryPerfil = '';
            
            // Usamos 'switch' para clareza e para garantir que apenas tipos válidos sejam tratados.
            switch (tipoValido) {
                case 'cliente':
                    queryPerfil = 'INSERT INTO clientes (usuario_id) VALUES (?)';
                    break;
                case 'dono_estabelecimento':
                    queryPerfil = 'INSERT INTO donos_estabelecimento (usuario_id) VALUES (?)';
                    break;
                default:
                    // Se o tipo for 'admin' ou outro que não tenha tabela de perfil, a operação já é um sucesso.
                    return res.status(201).json({ message: 'Usuário administrador criado com sucesso!' });
            }

            // Executa a query para criar o perfil
            db.query(queryPerfil, [novoUsuarioId], (errPerfil, resultsPerfil) => {
                if (errPerfil) {
                    console.error(`ERRO ao criar perfil de ${tipoValido}:`, errPerfil);
                    return res.status(500).json({ erro: `Usuário base criado, mas falha ao criar o perfil de ${tipoValido}.` });
                }
                
                // Sucesso completo!
                return res.status(201).json({ message: `Usuário e perfil de ${tipoValido} criados com sucesso!` });
            });
        });
    } catch (error) {
        console.error('ERRO GERAL no bloco try/catch:', error);
        return res.status(500).json({ erro: 'Erro interno fatal durante o cadastro.' });
    }
});

/**
 * Rota para LOGIN de usuário.
 * URL: POST /api/auth/login
 */
router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro interno no servidor.' });
        if (results.length === 0) return res.status(401).json({ erro: 'Credenciais inválidas.' });

        const usuario = results[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ erro: 'Credenciais inválidas.' });
        }

        const payload = { id: usuario.id, nome: usuario.nome, tipo: usuario.tipo };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

        res.json({
            mensagem: "Login bem-sucedido!",
            usuario: payload,
            token
        });
    });
});

module.exports = router;