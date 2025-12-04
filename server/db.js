// server/db.js

// 1) Carrega as variáveis do .env
require('dotenv').config();
const mysql = require('mysql2');

// 2) Testa as variáveis (útil para debug)
console.log('--- Testando variáveis ---');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('---------------------------');

// 3) Cria a conexão com o banco
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'alimcheck_db',
  port: 3306,
});

// 4) Tenta conectar ao banco
db.connect(err => {
  if (err) {
    console.error('❌ Erro ao conectar no MySQL:', err);
    throw err;
  }
  console.log('✅ Conectado ao banco de dados MySQL!');
});

/*
===============================================================================
✅ OPÇÃO 1 (RECOMENDADA): exportar apenas a conexão (simples e direto)
===============================================================================
*/

// Use esta opção se você só usa `db.query()` nos seus arquivos:
module.exports = db;


/*
===============================================================================
❗ OPÇÃO 2 (ALTERNATIVA): exportar um objeto com funções extras
===============================================================================

// Caso queira também usar a função cadastrarUsuario em outros módulos, use isso:

async function cadastrarUsuario({ nome, email, senha, tipo }) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
    const values = [nome, email, senha, tipo];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('❌ Erro ao inserir usuário no banco:', err);
        return reject(err);
      }

      resolve({
        id: result.insertId,
        nome,
        email,
        tipo,
      });
    });
  });
}

// Neste caso, no server.js você deve usar:
// const { db, cadastrarUsuario } = require('./db');

module.exports = {
  db,
  cadastrarUsuario,
};

===============================================================================
*/

