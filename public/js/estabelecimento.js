// estabelecimento.js - Versão Corrigida
console.log("✅ estabelecimento.js carregado com sucesso");

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formEstabelecimento');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Pega dados do usuário logado
      const usuarioJSON = localStorage.getItem('usuario');
      if (!usuarioJSON) {
        alert("⚠️ Erro: Nenhum usuário logado. Faça o login novamente.");
        window.location.href = 'index.html';
        return;
      }
      
      const usuario = JSON.parse(usuarioJSON);
      const donoId = usuario.id;

      if (!donoId) {
        alert("⚠️ Erro: ID do dono não encontrado. Faça o login novamente.");
        return;
      }

      // Pega dados do formulário
      const nome = document.getElementById('nome').value.trim();
      const endereco = document.getElementById('endereco').value.trim();
      const categoria = document.getElementById('categoria').value.trim();

      // Valida apenas os campos que existem
      if (!nome || !endereco || !categoria) {
        alert("⚠️ Por favor, preencha todos os campos.");
        return;
      }
      
      // Monta o corpo da requisição sem dados de imagem
      const dadosEstabelecimento = {
        nome,
        endereco,
        categoria,
        donoId
      };

      // Bloco TRY...CATCH completo com o FETCH
      try {
        const response = await fetch('http://localhost:3000/api/estabelecimentos', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dadosEstabelecimento)
        });

        const data = await response.json();

        if (response.ok) {
          alert("✅ Estabelecimento cadastrado com sucesso!");
          window.location.href = 'meus-estabelecimentos.html'; 
        } else {
          // Exibe o erro que vem do backend
          alert("❌ Erro: " + (data.error || 'Não foi possível cadastrar.'));
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("❌ Erro ao conectar com o servidor");
      }
    });
  }
});

app.get('/api/estabelecimentos', (req, res) => {
  const sql = 'SELECT * FROM estabelecimentos ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar estabelecimentos:', err);
      return res.status(500).json({ error: 'Erro ao buscar dados.' });
    }
    res.status(200).json(results);
  });
});

