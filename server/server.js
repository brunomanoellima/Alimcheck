const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const db = require('./db');
const { verificarToken } = require('./middleware/auth');

// --- CONFIGURAÇÃO DO MULTER PARA UPLOAD ---
const uploadDir = 'public/uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const app = express();

// --- MIDDLEWARES GERAIS ---
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


// =====================================================
// ROTAS DE AUTENTICAÇÃO E USUÁRIOS
// =====================================================

// ROTA DE CADASTRO DE USUÁRIO
app.post('/api/auth/cadastro', async (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    if (!nome || !email || !senha || !tipo) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios: nome, email, senha e tipo.' });
    }
    const tipoValido = tipo.toLowerCase();
    if (!['cliente', 'dono_estabelecimento', 'admin'].includes(tipoValido)) {
        return res.status(400).json({ erro: `O tipo de usuário '${tipo}' é inválido.` });
    }
    try {
        const senhaHash = await bcrypt.hash(senha, 10);
        const queryUsuario = 'INSERT INTO usuarios (nome, email, senha_hash, tipo) VALUES (?, ?, ?, ?)';
        db.query(queryUsuario, [nome, email, senhaHash, tipoValido], (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ erro: 'Este email já está em uso.' });
                console.error("ERRO ao inserir em usuarios:", err);
                return res.status(500).json({ erro: 'Erro interno ao cadastrar o usuário.' });
            }
            const novoUsuarioId = results.insertId;
            let queryPerfil = '';
            switch (tipoValido) {
                case 'cliente':
                    queryPerfil = 'INSERT INTO clientes (usuario_id) VALUES (?)';
                    break;
                case 'dono_estabelecimento':
                    queryPerfil = 'INSERT INTO donos_estabelecimento (usuario_id) VALUES (?)';
                    break;
                case 'admin':
                    queryPerfil = 'INSERT INTO administradores (usuario_id) VALUES (?)';
                    break;
                default:
                    return res.status(400).json({ message: 'Tipo de perfil inválido para criação.' });
            }
            db.query(queryPerfil, [novoUsuarioId], (errPerfil, resultsPerfil) => {
                if (errPerfil) {
                    console.error(`ERRO ao criar perfil de ${tipoValido}:`, errPerfil);
                    return res.status(500).json({ erro: `Usuário base criado, mas falha ao criar o perfil de ${tipoValido}.` });
                }
                return res.status(201).json({ message: `Usuário e perfil de ${tipoValido} criados com sucesso!` });
            });
        });
    } catch (error) {
        console.error('ERRO GERAL no bloco try/catch:', error);
        return res.status(500).json({ erro: 'Erro interno fatal durante o cadastro.' });
    }
});

// ROTA DE LOGIN
app.post('/api/auth/login', (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }
    // BUSCA O USUÁRIO PELO EMAIL
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro interno no servidor.' });
        if (results.length === 0) return res.status(401).json({ erro: 'Credenciais inválidas.' });
        
        const usuario = results[0];

        // VERIFICAÇÃO DE BANIMENTO
        if (usuario.status === 'banido') {
            return res.status(403).json({ erro: 'Esta conta foi banida do sistema.' });
        }
        // FIM DA VERIFICAÇÃO

        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
        if (!senhaValida) {
            return res.status(401).json({ erro: 'Credenciais inválidas.' });
        }
        
        const payload = { 
            id: usuario.id, 
            nome: usuario.nome, 
            tipo: usuario.tipo, 
            avatar_url: usuario.avatar_url 
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.json({
            mensagem: "Login bem-sucedido!",
            usuario: payload,
            token
        });
    });
});

// ROTA PARA BUSCAR USUÁRIOS (Admin)
app.get('/api/usuarios', verificarToken, (req, res) => {
    if (req.usuario.tipo !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    
    // Novos parâmetros da query: page, limit, orderBy
    const { pesquisa, page = 1, limit = 10, orderBy = 'avaliacoes_excluidas' } = req.query;
    
    let whereClause = '';
    const params = [];
    if (pesquisa) {
        whereClause = ' WHERE (nome LIKE ? OR email LIKE ?)';
        params.push(`%${pesquisa}%`, `%${pesquisa}%`);
    }

    // Lógica para a ordenação dinâmica
    let orderByClause = ' ORDER BY ';
    switch (orderBy) {
        case 'nome':
            orderByClause += 'nome ASC';
            break;
        case 'avaliacoes_excluidas':
        default:
            orderByClause += 'avaliacoes_excluidas DESC, nome ASC';
            break;
    }

    // 1. Primeira consulta para contar o total de itens (para a paginação)
    const countSql = `SELECT COUNT(*) as total FROM usuarios${whereClause}`;
    db.query(countSql, params, (err, countResult) => {
        if (err) return res.status(500).json({ error: 'Erro ao contar usuários.' });

        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);
        const offset = (page - 1) * limit;

        // Adiciona os parâmetros de limite e offset para a consulta principal
        const finalParams = [...params, parseInt(limit), parseInt(offset)];

        // 2. Segunda consulta para buscar os dados da página atual
        const sql = `SELECT id, nome, email, tipo, status, avaliacoes_excluidas FROM usuarios${whereClause}${orderByClause} LIMIT ? OFFSET ?`;
        
        db.query(sql, finalParams, (err, users) => {
            if (err) return res.status(500).json({ error: 'Erro ao buscar usuários' });

            // Envia a resposta com os dados e as informações de paginação
            res.json({
                data: users,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: parseInt(page),
                    limit: parseInt(limit)
                }
            });
        });
    });
});

// ROTA PARA ATUALIZAR O NOME DO USUÁRIO
app.put('/api/usuarios/nome', verificarToken, (req, res) => {
    const usuarioId = req.usuario.id;
    const { nome } = req.body;
    if (!nome || nome.trim().length < 3) {
        return res.status(400).json({ error: 'O nome é obrigatório e deve ter pelo menos 3 caracteres.' });
    }
    const sql = 'UPDATE usuarios SET nome = ? WHERE id = ?';
    db.query(sql, [nome.trim(), usuarioId], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar nome do usuário:", err);
            return res.status(500).json({ error: 'Erro no servidor ao atualizar o nome.' });
        }
        res.json({ message: 'Nome atualizado com sucesso!', nome: nome.trim() });
    });
});

// ROTA PARA ATUALIZAR O AVATAR DO USUÁRIO
app.put('/api/usuarios/avatar', verificarToken, (req, res) => {
    const usuarioId = req.usuario.id;
    const { avatar_url } = req.body;
    if (!avatar_url) {
        return res.status(400).json({ error: 'URL do avatar é obrigatória.' });
    }
    const findOldSql = 'SELECT avatar_url FROM usuarios WHERE id = ?';
    db.query(findOldSql, [usuarioId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(500).json({ error: 'Erro ao encontrar usuário para deletar foto antiga.' });
        }
        const oldAvatarUrl = results[0].avatar_url;
        if (oldAvatarUrl) {
            const oldAvatarPath = path.join(__dirname, 'public', oldAvatarUrl);
            fs.unlink(oldAvatarPath, (unlinkErr) => {
                if (unlinkErr && unlinkErr.code !== 'ENOENT') {
                    console.error("Erro ao deletar a foto antiga:", unlinkErr);
                } else if (!unlinkErr) {
                    console.log(`Foto antiga deletada: ${oldAvatarPath}`);
                }
            });
        }
        const updateSql = 'UPDATE usuarios SET avatar_url = ? WHERE id = ?';
        db.query(updateSql, [avatar_url, usuarioId], (err, result) => {
            if (err) {
                console.error("Erro ao atualizar avatar:", err);
                return res.status(500).json({ error: 'Erro no servidor ao atualizar o avatar.' });
            }
            res.json({ message: 'Avatar atualizado com sucesso!', avatar_url });
        });
    });
});

// ROTA PARA BANIR/DESBANIR UM USUÁRIO (Admin)
app.put('/api/usuarios/:id/status', verificarToken, (req, res) => {
    if (req.usuario.tipo !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    const { id } = req.params;
    const { status } = req.body; // Espera um status como 'banido' ou 'ativo'

    if (!status || !['ativo', 'banido'].includes(status)) {
        return res.status(400).json({ error: "Status inválido. Use 'ativo' ou 'banido'." });
    }

    const sql = 'UPDATE usuarios SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Erro no servidor ao atualizar status.' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuário não encontrado.' });

        res.json({ message: `Usuário ${id} foi atualizado para '${status}'.` });
    });
});


// =====================================================
// ROTAS DE ESTABELECIMENTOS
// =====================================================

// ROTA PARA BUSCAR TODOS OS ESTABELECIMENTOS (com ranking)
app.get('/api/estabelecimentos', (req, res) => {
    const { categoria, pesquisa, page = 1, limit = 8 } = req.query;

    let params = [];
    let whereClauses = [];
    if (categoria) {
        whereClauses.push('c.nome = ?');
        params.push(categoria);
    }
    if (pesquisa) {
        whereClauses.push('e.nome LIKE ?');
        params.push(`%${pesquisa}%`);
    }
    const whereSql = whereClauses.length > 0 ? ' WHERE ' + whereClauses.join(' AND ') : '';

    // 1. PRIMEIRA CONSULTA: Contar o total de itens para a paginação
    const countSql = `SELECT COUNT(DISTINCT e.id) as total FROM estabelecimentos e LEFT JOIN categorias c ON e.categoria_id = c.id${whereSql}`;
    
    db.query(countSql, params, (err, countResult) => {
        if (err) return res.status(500).json({ error: 'Erro ao contar estabelecimentos.' });

        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);
        const offset = (page - 1) * limit;

        // 2. SEGUNDA CONSULTA: Buscar os itens da página atual com o novo ranking
        let sql = `
            SELECT 
                e.id, e.nome, e.endereco, c.nome as categoria, e.dono_id, e.imagem_url as imagem,
                AVG(a.nota) as nota_media,
                COUNT(a.id) as total_avaliacoes,
                (SELECT IF(COUNT(a2.id) = 0, 0, ( (SUM(IF(a2.nota >= 4, 1, 0)) / COUNT(a2.id)) + (3.8416 / (2 * COUNT(a2.id))) - 1.96 * SQRT( ((SUM(IF(a2.nota >= 4, 1, 0)) / COUNT(a2.id)) * (1 - (SUM(IF(a2.nota >= 4, 1, 0)) / COUNT(a2.id))) + (3.8416 / (4 * COUNT(a2.id)))) / COUNT(a2.id)) ) / (1 + (3.8416 / COUNT(a2.id))) ) FROM avaliacoes AS a2 WHERE a2.estabelecimento_id = e.id) AS score_confianca
            FROM estabelecimentos AS e
            LEFT JOIN categorias AS c ON e.categoria_id = c.id
            LEFT JOIN avaliacoes AS a ON e.id = a.estabelecimento_id
            ${whereSql}
            GROUP BY e.id 
            ORDER BY score_confianca DESC, nota_media DESC, total_avaliacoes DESC
            LIMIT ? OFFSET ?
        `;

        const finalParams = [...params, parseInt(limit), parseInt(offset)];

        db.query(sql, finalParams, (err, results) => {
            if (err) return res.status(500).json({ error: 'Erro ao buscar estabelecimentos' });
            
            // 3. Envia a resposta com os dados e as informações de paginação
            res.json({
                data: results,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: parseInt(page),
                    limit: parseInt(limit)
                }
            });
        });
    });
});
// ROTA PARA BUSCAR UM ESTABELECIMENTO ESPECÍFICO POR ID
app.get('/api/estabelecimentos/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT e.id, e.nome, e.endereco, e.dono_id, e.imagem_url as imagem, c.nome as categoria 
        FROM estabelecimentos as e
        JOIN categorias as c ON e.categoria_id = c.id
        WHERE e.id = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro no servidor.' });
        if (results.length === 0) return res.status(404).json({ error: 'Estabelecimento não encontrado.' });
        res.json(results[0]);
    });
});

// ROTA PARA BUSCAR ESTABELECIMENTOS DE UM DONO
app.get('/api/estabelecimentos/dono/:donoId', (req, res) => {
    const sql = `
        SELECT 
            e.id, e.nome, e.endereco, e.dono_id, e.imagem_url as imagem,
            c.nome as categoria 
        FROM estabelecimentos as e
        JOIN categorias as c ON e.categoria_id = c.id
        WHERE e.dono_id = ? 
        ORDER BY e.id DESC
    `;
    db.query(sql, [req.params.donoId], (err, results) => {
        if (err) {
            console.error("Erro ao buscar estabelecimentos do dono:", err);
            return res.status(500).json({ error: 'Erro interno ao buscar dados.' });
        }
        res.status(200).json(results);
    });
});

// ROTA PARA CADASTRAR UM ESTABELECIMENTO
app.post('/api/estabelecimentos', verificarToken, (req, res) => {
    const dono_id = req.usuario.id;
    const { nome, endereco, categoria_id, imagem_url } = req.body;
    if (!nome || !endereco || !categoria_id) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios: nome, endereço e categoria.' });
    }
    const countSql = 'SELECT COUNT(*) AS total FROM estabelecimentos WHERE dono_id = ?';
    db.query(countSql, [dono_id], (err, countResults) => {
        if (err) return res.status(500).json({ error: 'Erro no servidor ao verificar limite.' });
        if (countResults[0].total >= 5) {
            return res.status(403).json({ error: 'Limite máximo de 5 estabelecimentos por dono atingido.' });
        }
        const insertSql = 'INSERT INTO estabelecimentos (nome, endereco, categoria_id, dono_id, imagem_url) VALUES (?, ?, ?, ?, ?)';
        const params = [nome, endereco, categoria_id, dono_id, imagem_url || null];
        db.query(insertSql, params, (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao salvar no banco de dados." });
            res.status(201).json({ id: result.insertId, message: 'Estabelecimento cadastrado com sucesso!' });
        });
    });
});

// ROTA PARA EDITAR UM ESTABELECIMENTO
app.put('/api/estabelecimentos/:id', verificarToken, (req, res) => {
    const { id } = req.params;
    const { nome, endereco, categoria_id, imagem_url } = req.body;
    if (!nome || !endereco || !categoria_id) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    if (imagem_url) {
        const findOldSql = 'SELECT imagem_url FROM estabelecimentos WHERE id = ? AND dono_id = ?';
        db.query(findOldSql, [id, req.usuario.id], (err, results) => {
            if (err || results.length === 0) return;
            const oldImageUrl = results[0].imagem_url;
            if (oldImageUrl) {
                const oldImagePath = path.join(__dirname, 'public', oldImageUrl);
                fs.unlink(oldImagePath, (unlinkErr) => {
                    if (unlinkErr && unlinkErr.code !== 'ENOENT') console.error("Erro ao deletar imagem antiga:", unlinkErr);
                });
            }
        });
    }
    const sql = `UPDATE estabelecimentos SET nome = ?, endereco = ?, categoria_id = ?, imagem_url = IFNULL(?, imagem_url) WHERE id = ? AND dono_id = ?`;
    db.query(sql, [nome, endereco, categoria_id, imagem_url, id, req.usuario.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Erro ao atualizar.' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Estabelecimento não encontrado ou você não tem permissão para editá-lo.' });
        res.json({ message: 'Estabelecimento atualizado com sucesso!' });
    });
});


// =====================================================
// ROTAS DE CATEGORIAS
// =====================================================

// ROTA PARA BUSCAR TODAS AS CATEGORIAS
app.get('/api/categorias', (req, res) => {
    const sql = 'SELECT id, nome FROM categorias ORDER BY nome ASC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar categorias' });
        res.json(results);
    });
});

// ROTA PARA CRIAR UMA NOVA CATEGORIA (Admin)
app.post('/api/categorias', verificarToken, (req, res) => {
    if (req.usuario.tipo !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({ error: 'O nome da categoria é obrigatório.' });
    }
    const sql = 'INSERT INTO categorias (nome) VALUES (?)';
    db.query(sql, [nome], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Esta categoria já existe.' });
            }
            console.error("Erro ao criar categoria:", err);
            return res.status(500).json({ error: 'Erro no servidor.' });
        }
        res.status(201).json({ id: result.insertId, nome });
    });
});

// ROTA PARA ATUALIZAR UMA CATEGORIA (Admin)
app.put('/api/categorias/:id', verificarToken, (req, res) => {
    if (req.usuario.tipo !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    const { id } = req.params;
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({ error: 'O novo nome da categoria é obrigatório.' });
    }
    const sql = 'UPDATE categorias SET nome = ? WHERE id = ?';
    db.query(sql, [nome, id], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Este nome de categoria já está em uso.' });
            }
            console.error("Erro ao atualizar categoria:", err);
            return res.status(500).json({ error: 'Erro no servidor.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoria não encontrada.' });
        }
        res.json({ message: 'Categoria atualizada com sucesso.' });
    });
});

// ROTA PARA DELETAR UMA CATEGORIA (Admin)
app.delete('/api/categorias/:id', verificarToken, (req, res) => {
    if (req.usuario.tipo !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    const { id } = req.params;
    const sql = 'DELETE FROM categorias WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(400).json({ error: 'Não é possível apagar esta categoria, pois ela já está sendo utilizada por estabelecimentos.' });
            }
            console.error("Erro ao deletar categoria:", err);
            return res.status(500).json({ error: 'Erro no servidor.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoria não encontrada.' });
        }
        res.json({ message: 'Categoria deletada com sucesso.' });
    });
});


// =====================================================
// ROTAS DE AVALIAÇÕES E UPLOAD
// =====================================================

// ROTA PARA BUSCAR AVALIAÇÕES
app.get('/api/avaliacoes', (req, res) => {
    const { usuarioId, estabelecimentoId, page = 1, limit = 6 } = req.query;

    if (!usuarioId && !estabelecimentoId) {
        return res.status(400).json({ error: 'É necessário fornecer um ID de usuário ou estabelecimento.' });
    }

    let countParams = [];
    let whereSql = '';

    if (usuarioId) {
        whereSql = ' WHERE a.usuario_id = ?';
        countParams.push(usuarioId);
    } else if (estabelecimentoId) {
        whereSql = ' WHERE a.estabelecimento_id = ?';
        countParams.push(estabelecimentoId);
    }

    // 1. PRIMEIRA CONSULTA: Contar o total de avaliações para o filtro
    const countSql = `SELECT COUNT(*) as total FROM avaliacoes as a${whereSql}`;

    db.query(countSql, countParams, (err, countResult) => {
        if (err) return res.status(500).json({ error: 'Erro ao contar avaliações.' });

        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);
        const offset = (page - 1) * limit;

        // 2. SEGUNDA CONSULTA: Buscar os itens da página atual
        let sql = `
            SELECT
                a.id, a.nota, a.comentario, a.created_at, a.estabelecimento_id,
                e.nome AS nomeEstabelecimento, e.imagem_url AS imagemEstabelecimento,
                u.nome AS nomeUsuario, u.avatar_url AS avatarUsuario,
                r.resposta AS resposta_dono, r.created_at AS resposta_data
            FROM avaliacoes AS a
            LEFT JOIN estabelecimentos AS e ON a.estabelecimento_id = e.id
            LEFT JOIN usuarios AS u ON a.usuario_id = u.id
            LEFT JOIN respostas_dono AS r ON a.id = r.avaliacao_id
            ${whereSql}
            ORDER BY a.created_at DESC
            LIMIT ? OFFSET ?
        `;
        
        const finalParams = [...countParams, parseInt(limit), parseInt(offset)];

        db.query(sql, finalParams, (err, results) => {
            if (err) return res.status(500).json({ error: 'Erro ao buscar avaliações.' });
            
            res.json({
                data: results,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: parseInt(page),
                }
            });
        });
    });
});

// ROTA PARA VERIFICAR COOLDOWN DE AVALIAÇÃO
app.get('/api/avaliacoes/verificar', (req, res) => {
    const { usuarioId, estabelecimentoId } = req.query;
    if (!usuarioId || !estabelecimentoId) {
        return res.status(400).json({ error: 'IDs de usuário e estabelecimento são necessários.' });
    }
    const sql = `SELECT created_at FROM avaliacoes WHERE usuario_id = ? AND estabelecimento_id = ? ORDER BY created_at DESC LIMIT 1`;
    db.query(sql, [usuarioId, estabelecimentoId], (err, results) => {
        if (err) {
            console.error("ERRO DETALHADO NA VERIFICAÇÃO:", err);
            return res.status(500).json({ message: 'Erro no servidor ao verificar avaliações.', error_details: err });
        }
        if (results.length === 0) {
            return res.json({ podeAvaliar: true });
        }
        const ultimaAvaliacao = new Date(results[0].created_at);
        const hoje = new Date();
        const diffTime = Math.abs(hoje - ultimaAvaliacao);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays >= 30) {
            return res.json({ podeAvaliar: true });
        } else {
            const diasRestantes = 30 - Math.floor(diffTime / (1000 * 60 * 60 * 24));
            return res.json({ podeAvaliar: false, diasRestantes: diasRestantes });
        }
    });
});

// ROTA PARA CRIAR UMA AVALIAÇÃO
app.post('/api/avaliacoes', verificarToken, (req, res) => {
    const usuario_id = req.usuario.id;
    const { estabelecimento_id, nota, comentario } = req.body;
    if (!estabelecimento_id || !nota) {
        return res.status(400).json({ error: 'Dados inválidos. ID do estabelecimento e nota são obrigatórios.' });
    }
    const checkSql = `SELECT created_at FROM avaliacoes WHERE usuario_id = ? AND estabelecimento_id = ? ORDER BY created_at DESC LIMIT 1`;
    db.query(checkSql, [usuario_id, estabelecimento_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro no servidor ao checar avaliações existentes.' });
        }
        if (results.length > 0) {
            const ultimaAvaliacao = new Date(results[0].created_at);
            const agora = new Date();
            const diffEmDias = (agora - ultimaAvaliacao) / (1000 * 60 * 60 * 24);
            if (diffEmDias < 30) {
                const diasRestantes = Math.ceil(30 - diffEmDias);
                return res.status(403).json({ error: `Você já avaliou este local. Tente novamente em ${diasRestantes} dia(s).` });
            }
        }
        const insertSql = 'INSERT INTO avaliacoes (usuario_id, estabelecimento_id, nota, comentario) VALUES (?, ?, ?, ?)';
        const params = [usuario_id, estabelecimento_id, nota, comentario || null];
        db.query(insertSql, params, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao salvar avaliação no banco de dados.' });
            }
            res.status(201).json({ message: 'Avaliação registrada com sucesso.' });
        });
    });
});

// ROTA PARA DONO RESPONDER UMA AVALIAÇÃO
app.post('/api/respostas', verificarToken, (req, res) => {
    const dono_id = req.usuario.id;
    const { avaliacao_id, resposta } = req.body;

    // Garante que o usuário é um dono
    if (req.usuario.tipo !== 'dono_estabelecimento') {
        return res.status(403).json({ error: 'Apenas donos de estabelecimentos podem responder.' });
    }

    if (!avaliacao_id || !resposta || resposta.trim() === '') {
        return res.status(400).json({ error: 'ID da avaliação e texto da resposta são obrigatórios.' });
    }
    const checkOwnerSql = `
        SELECT e.dono_id FROM estabelecimentos e
        JOIN avaliacoes a ON e.id = a.estabelecimento_id
        WHERE a.id = ?
    `;
    db.query(checkOwnerSql, [avaliacao_id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro no servidor ao verificar permissão.' });
        if (results.length === 0 || results[0].dono_id !== dono_id) {
            return res.status(403).json({ error: 'Você não tem permissão para responder a esta avaliação.' });
        }

        // Se a verificação passar, insere a resposta
        const insertSql = 'INSERT INTO respostas_dono (resposta, avaliacao_id, dono_id) VALUES (?, ?, ?)';
        db.query(insertSql, [resposta, avaliacao_id, dono_id], (err, result) => {
            if (err) {
                // Trata o erro caso já exista uma resposta para essa avaliação
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ error: 'Já existe uma resposta para esta avaliação.' });
                }
                return res.status(500).json({ error: 'Erro no servidor ao salvar a resposta.' });
            }
            res.status(201).json({ message: 'Resposta salva com sucesso!' });
        });
    });
});

// ROTA PARA CRIAR UMA DENÚNCIA
app.post('/api/denuncias', verificarToken, (req, res) => {
    const usuarioDenuncianteId = req.usuario.id;
    const { avaliacao_id } = req.body;

    if (!avaliacao_id) {
        return res.status(400).json({ error: 'O ID da avaliação é obrigatório.' });
    }

    // Verifica se este usuário já não denunciou esta mesma avaliação
    const checkSql = 'SELECT id FROM denuncias WHERE usuario_id = ? AND avaliacao_id = ?';
    db.query(checkSql, [usuarioDenuncianteId, avaliacao_id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro no servidor ao verificar denúncias existentes.' });

        if (results.length > 0) {
            return res.status(409).json({ error: 'Você já denunciou esta avaliação.' });
        }

        // Se não houver denúncia prévia, insere a nova
        const insertSql = 'INSERT INTO denuncias (avaliacao_id, usuario_id) VALUES (?, ?)';
        db.query(insertSql, [avaliacao_id, usuarioDenuncianteId], (err, result) => {
            if (err) return res.status(500).json({ error: 'Erro no servidor ao registrar a denúncia.' });
            res.status(201).json({ message: 'Denúncia registrada com sucesso. Agradecemos sua colaboração!' });
        });
    });
});

// ROTA PARA LISTAR DENÚNCIAS PENDENTES (Admin)
app.get('/api/denuncias', verificarToken, (req, res) => {
    if (req.usuario.tipo !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }

    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Consulta para contar o total de AVALIAÇÕES com denúncias pendentes
    const countSql = `SELECT COUNT(DISTINCT avaliacao_id) as total FROM denuncias WHERE status = 'pendente'`;

    db.query(countSql, (err, countResult) => {
        if (err) return res.status(500).json({ error: 'Erro ao contar denúncias.' });

        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        const sql = `
            SELECT 
                a.id AS avaliacao_id,
                a.comentario AS avaliacao_comentario,
                a.nota AS avaliacao_nota,
                u_avaliador.nome AS nome_avaliador,
                e.nome AS nome_estabelecimento,
                COUNT(d.id) AS total_denuncias
            FROM denuncias AS d
            JOIN avaliacoes AS a ON d.avaliacao_id = a.id
            JOIN usuarios AS u_avaliador ON a.usuario_id = u_avaliador.id
            JOIN estabelecimentos AS e ON a.estabelecimento_id = e.id
            WHERE d.status = 'pendente'
            GROUP BY a.id, a.comentario, a.nota, u_avaliador.nome, e.nome
            ORDER BY total_denuncias DESC, a.created_at ASC
            LIMIT ? OFFSET ?
        `;

        db.query(sql, [parseInt(limit), parseInt(offset)], (err, results) => {
            if (err) {
                console.error("Erro ao buscar denúncias agrupadas:", err);
                return res.status(500).json({ error: 'Erro no servidor ao buscar denúncias.' });
            }
            res.json({
                data: results,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: parseInt(page),
                    limit: parseInt(limit)
                }
            });
        });
    });
});

// ROTA PARA ATUALIZAR O STATUS DE UMA DENÚNCIA (Admin)
app.put('/api/denuncias/:id', verificarToken, (req, res) => {
    if (req.usuario.tipo !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: 'O novo status é obrigatório.' });
    }

    const sql = 'UPDATE denuncias SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Erro no servidor ao atualizar denúncia.' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Denúncia não encontrada.' });
        res.json({ message: 'Status da denúncia atualizado com sucesso.' });
    });
});

// ROTA PARA ATUALIZAR O STATUS DE TODAS AS DENÚNCIAS DE UMA AVALIAÇÃO - (Admin)
app.put('/api/denuncias/resolver-por-avaliacao/:avaliacaoId', verificarToken, (req, res) => {
    if (req.usuario.tipo !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }

    const { avaliacaoId } = req.params;
    const { novo_status } = req.body; 

    if (!novo_status) {
        return res.status(400).json({ error: 'O novo status é obrigatório.' });
    }

    // Atualiza todas as denúncias pendentes para uma dada avaliação
    const sql = "UPDATE denuncias SET status = ? WHERE avaliacao_id = ? AND status = 'pendente'";
    db.query(sql, [novo_status, avaliacaoId], (err, result) => {
        if (err) {
            console.error("Erro ao resolver denúncias em massa:", err);
            return res.status(500).json({ error: 'Erro no servidor ao atualizar denúncias.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Nenhuma denúncia pendente encontrada para esta avaliação.' });
        }
        res.json({ message: 'Denúncias resolvidas com sucesso.' });
    });
});

// ROTA PARA DELETAR UMA AVALIAÇÃO (Admin)
app.delete('/api/avaliacoes/:id', verificarToken, (req, res) => {
    const reviewId = req.params.id;
    const adminUser = req.usuario;

    if (adminUser.tipo !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }

    // Primeiro, descobrir quem é o autor da avaliação
    db.query('SELECT usuario_id FROM avaliacoes WHERE id = ?', [reviewId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Avaliação não encontrada para obter o autor.' });
        }
        const autorId = results[0].usuario_id;

        db.query('DELETE FROM avaliacoes WHERE id = ?', [reviewId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro no servidor ao deletar a avaliação.' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Avaliação não encontrada para deletar.' });
            }

            // Se deletou com sucesso, incrementa o contador de avaliações excluídas do autor
            db.query('UPDATE usuarios SET avaliacoes_excluidas = avaliacoes_excluidas + 1 WHERE id = ?', [autorId], (err, updateResult) => {
                if (err) {
                    console.error("Falha ao incrementar contador do usuário:", err);
                    // Não retorna erro fatal, pois a avaliação já foi deletada. Apenas loga.
                }
                res.json({ message: 'Avaliação deletada com sucesso e contador do usuário atualizado.' });
            });
        });
    });
});

// ROTA PARA FAZER UPLOAD DE IMAGEM
app.post('/api/upload', upload.single('imagem'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// --- INICIALIZAÇÃO DO SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});