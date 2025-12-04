// Checar se é admin antes de carregar qualquer dado
const usuario = JSON.parse(localStorage.getItem('usuario'));
if (!usuario || usuario.tipo !== 'admin') {
  alert('Você não tem permissão para acessar esta página.');
  window.location.href = 'login.html';
}

async function carregarAvaliacoes() {
  const response = await fetch('/api/avaliacoes');
  const avaliacoes = await response.json();
  const tbody = document.getElementById('avaliacoesBody');

  tbody.innerHTML = '';
  avaliacoes.forEach(avaliacao => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${avaliacao.id}</td>
      <td>${avaliacao.user_id}</td>
      <td>${avaliacao.estabelecimento_id}</td>
      <td>${avaliacao.nota}</td>
      <td>${avaliacao.comentario}</td>
      <td>${avaliacao.data_avaliacao}</td>
      <td><button onclick="excluirAvaliacao(${avaliacao.id})">Excluir</button></td>
    `;
    tbody.appendChild(tr);
  });
}

async function excluirAvaliacao(id) {
  const confirmar = confirm('Tem certeza que deseja excluir esta avaliação?');
  if (!confirmar) return;

  const response = await fetch(`/api/avaliacoes/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    alert('✅ Avaliação excluída.');
    carregarAvaliacoes();
  } else {
    const data = await response.json();
    alert(data.error);
  }
}

carregarAvaliacoes();
