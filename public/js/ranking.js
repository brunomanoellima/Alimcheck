async function carregarEstabelecimentos() {
  const container = document.getElementById('rankingLista');
  try {
    const response = await fetch('http://localhost:3000/api/estabelecimentos');
    const estabelecimentos = await response.json();

    if (estabelecimentos.length === 0) {
      container.innerHTML = '<p>Nenhum estabelecimento encontrado.</p>';
      return;
    }

    container.innerHTML = '';
    estabelecimentos.forEach((est, index) => {
      const item = document.createElement('div');
      item.classList.add('estabelecimento');
      item.innerHTML = `
        <div class="nome">${index + 1}. ${est.nome}</div>
        <div class="categoria">${est.categoria}</div>
        <div class="endereco">${est.endereco}</div>
      `;
      container.appendChild(item);
    });

  } catch (error) {
    console.error('Erro ao carregar estabelecimentos:', error);
    container.innerHTML = '<p>Erro ao carregar dados.</p>';
  }
}

carregarEstabelecimentos();
