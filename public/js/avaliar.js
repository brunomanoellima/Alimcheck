document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formAvaliacao');
  
  if (!form) {
    console.error("Formulário com id 'formAvaliacao' não foi encontrado!");
    return;
  }

  // Pega o ID do estabelecimento pela URL (ex: avaliar.html?id=5)
  const urlParams = new URLSearchParams(window.location.search);
  const estabelecimentoId = urlParams.get('id');

  // LÓGICA CORRIGIDA PARA PEGAR O ID DO USUÁRIO
  const usuarioJSON = localStorage.getItem('usuario');
  if (!usuarioJSON) {
    alert('❌ Usuário não autenticado. Por favor, faça o login.');
    window.location.href = 'index.html';
    return;
  }
  const usuario = JSON.parse(usuarioJSON);
  const usuarioId = usuario.id;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nota = form.querySelector('input[name="nota"]:checked')?.value;
    const comentario = form.querySelector('textarea[name="comentario"]').value.trim();

    if (!nota) {
      alert("Por favor, selecione uma nota.");
      return;
    }

    const dadosAvaliacao = {
      usuario_id: usuarioId,
      estabelecimento_id: estabelecimentoId,
      nota: Number(nota),
      comentario: comentario || null
    };

    try {
      const resposta = await fetch('http://localhost:3000/api/avaliacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosAvaliacao)
      });

      const resultado = await resposta.json();
      if (!resposta.ok) {
        alert(`❌ Erro: ${resultado.error || 'Não foi possível enviar.'}`);
        return;
      }

      alert("✅ Avaliação enviada com sucesso!");
      window.location.href = "menu-principal.html"; 

    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      alert("Erro ao conectar com o servidor. Tente novamente.");
    }
  });
});