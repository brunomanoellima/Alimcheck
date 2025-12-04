// js/login.js

console.log("✅ login.js carregado");

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (!loginForm) {
    console.error("❌ Formulário de login não encontrado!");
    return;
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!email || !senha) {
      alert('⚠️ Preencha todos os campos!');
      return;
    }

    try {
      // --- ALTERAÇÃO PRINCIPAL AQUI ---
      // Aponta para o endereço completo do backend
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });

      let data;
      try {
        // Tenta ler o corpo da resposta como JSON, mesmo em caso de erro HTTP
        data = await response.json();
      } catch (jsonError) {
        // Se o corpo não for um JSON válido ou estiver vazio, usa um objeto vazio
        data = { error: 'Resposta inválida do servidor.' };
        console.error("Erro ao parsear JSON:", jsonError);
      }

      if (response.ok) {
        console.log("✅ Login realizado com sucesso:", data);

        if (!data.tipo) {
          alert('⚠️ Resposta do servidor não incluiu o tipo de usuário!');
          return;
        }

        // Guarda os dados do usuário no armazenamento local do navegador
        localStorage.setItem('usuario', JSON.stringify(data));

        // Redireciona o usuário com base no seu tipo
        switch (data.tipo) {
          case 'cliente':
            window.location.href = 'menu-principal.html';
            break;
          case 'dono':
            window.location.href = 'painel-dono.html';
            break;
          case 'admin':
            window.location.href = 'painel-admin.html';
            break;
          default:
            alert('⚠️ Tipo de usuário desconhecido.');
        }

      } else {
        // Exibe a mensagem de erro vinda do backend ou uma mensagem padrão
        alert('❌ Erro ao fazer login: ' + (data.error || 'Tente novamente.'));
      }

    } catch (err) {
      // Erro de rede (servidor offline, CORS, etc.)
      console.error('❌ Erro de conexão com o servidor:', err);
      alert('❌ Não foi possível conectar ao servidor. Verifique se ele está rodando.');
    }
  });
});