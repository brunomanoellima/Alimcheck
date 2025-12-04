console.log("✅ estabelecimento.js carregado com sucesso");

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formEstabelecimento'); // ID do seu formulário

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const endereco = document.getElementById('endereco').value.trim();
      const categoria = document.getElementById('categoria').value.trim();

      console.log("📤 Enviando dados:", { nome, endereco, categoria });

      // Verificação de campos obrigatórios
      if (!nome || !endereco || !categoria) {
        alert("⚠️ Por favor, preencha todos os campos.");
        return;
      }

      try {
        const response = await fetch('/api/estabelecimentos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, endereco, categoria })
        });

        const data = await response.json();

        if (response.ok) {
          alert("✅ Estabelecimento cadastrado!");
          window.location.href = 'index.html'; // ou outra página
        } else {
          alert("❌ Erro: " + data.error);
        }
      } catch (error) {
        console.error("Erro ao cadastrar estabelecimento:", error);
        alert("❌ Erro ao conectar com o servidor");
      }
    });
  }
});

app.delete('/api/estabelecimentos/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    
    // Opcional: Verifique se o estabelecimento pertence ao usuário logado antes de excluir
    // const donoId = req.user.id; 

    const sql = "DELETE FROM estabelecimentos WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erro ao excluir:", err);
            return res.status(500).json({ error: "Erro interno ao excluir estabelecimento." });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Estabelecimento não encontrado." });
        }

        res.json({ message: "Estabelecimento excluído com sucesso!" });
    });
});