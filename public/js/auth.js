// public/js/auth.js

console.log('✅ auth.js carregado com sucesso');

/**
 * Função para salvar os dados de autenticação no Local Storage.
 * @param {object} data - O objeto de resposta da API, contendo o token e os dados do usuário.
 */
function salvarAutenticacao(data) {
  // Salva o token JWT. Ele será enviado em futuras requisições para provar que o usuário está logado.
  localStorage.setItem('token', data.token);

  // Salva os dados do usuário (id, nome, tipo) para fácil acesso no frontend.
  localStorage.setItem('usuario', JSON.stringify(data.usuario));

  console.log('🔑 Token e dados do usuário salvos no Local Storage.');
}

/**
 * Função para redirecionar o usuário com base no seu tipo após o login/cadastro.
 * @param {string} tipo - O tipo do usuário ('cliente', 'dono_estabelecimento', 'admin').
 */
function redirecionarPorTipo(tipo) {
  if (tipo === 'cliente') {
    window.location.href = '/menu-principal.html'; // Redireciona para a página principal do cliente
  } else if (tipo === 'dono_estabelecimento') { // <-- CORREÇÃO: o tipo no backend é 'dono_estabelecimento'
    window.location.href = '/painel-dono.html'; // Redireciona para o painel do dono
  } else if (tipo === 'admin') {
    window.location.href = '/painel-admin.html'; // Redireciona para o painel do admin
  } else {
    console.error('⚠️ Tipo de usuário desconhecido:', tipo);
    alert('Tipo de usuário desconhecido. Redirecionando para a página inicial.');
    window.location.href = '/';
  }
}

// --- LÓGICA DE CADASTRO ---
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const senha = document.getElementById('senha').value.trim();
      const tipo = document.getElementById('tipo')?.value?.trim();

      console.log("📤 Tentando cadastrar:", { nome, email, tipo });

      if (!nome || !email || !senha || !tipo) {
        alert('⚠️ Por favor, preencha todos os campos.');
        return;
      }

      try {
        //  👇 MUDANÇA IMPORTANTE: A URL da API foi atualizada.
        const response = await fetch('/api/auth/cadastro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, senha, tipo })
        });

        const data = await response.json();

        if (response.ok) {
          console.log('✅ Cadastro realizado com sucesso! Redirecionando para o login...');
          alert('Cadastro realizado com sucesso! Agora você pode fazer o login.');
          // Após o cadastro, o ideal é redirecionar para a página de login.
          window.location.href = '/login.html'; 
        } else {
          // Exibe o erro específico enviado pelo backend (ex: "Email já em uso")
          alert('❌ Erro no cadastro: ' + (data.erro || 'Tente novamente.'));
        }
      } catch (error) {
        console.error('❌ Erro na requisição de cadastro:', error);
        alert('❌ Erro ao conectar com o servidor. Verifique sua conexão.');
      }
    });
  }

  // --- LÓGICA DE LOGIN ---
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();

        console.log("🔑 Tentando fazer login com:", { email });

        if (!email || !senha) {
            alert('⚠️ Por favor, preencha email e senha.');
            return;
        }

        try {
            //  👇 MUDANÇA IMPORTANTE: Usando a nova rota de login.
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('✅ Login bem-sucedido. Resposta:', data);
                // Salva o token e os dados do usuário no localStorage
                salvarAutenticacao(data);
                // Redireciona o usuário para a página correta
                redirecionarPorTipo(data.usuario.tipo);
            } else {
                alert('❌ Erro no login: ' + (data.erro || 'Verifique seu email e senha.'));
            }
        } catch (error) {
            console.error('❌ Erro na requisição de login:', error);
            alert('❌ Erro ao conectar com o servidor. Verifique sua conexão.');
        }
    });
  }

});