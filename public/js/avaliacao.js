// Carregar lista de estabelecimentos
async function carregarEstabelecimentos() {
  const response = await fetch('/api/estabelecimentos');
  const estabelecimentos = await response.json();
  const select = document.getElementById('estabelecimento');

  estabelecimentos.forEach(est => {
    const option = document.createElement('option');
    option.value = est.id;
    option.textContent = est.nome;
    select.appendChild(option);
  });
}

// Submeter avaliação
document.getElementById('avaliacaoForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    alert('Você precisa estar logado!');
    return;
  }

  const user_id = user.id;
  const estabelecimento_id = document.getElementById('estabelecimento').value;
  const nota = document.getElementById('nota').value;
  const comentario = document.getElementById('comentario').value;

  const response = await fetch('/api/avaliacoes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, estabelecimento_id, nota, comentario })
  });

  const data = await response.json();
  if (response.ok) {
    alert('✅ Avaliação enviada!');
    window.location.href = 'index.html';
  } else {
    alert(data.error);
  }
});

carregarEstabelecimentos();
