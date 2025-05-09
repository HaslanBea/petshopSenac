async function buscarUsuarios() {
  try {
    const response = await fetch('http://localhost:3000/usuarios');
    if (!response.ok) throw new Error("Erro ao carregar usuários");
    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
}

async function salvarUsuario(novoUsuario) {
  try {
    const response = await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoUsuario)
    });
    if (!response.ok) throw new Error("Erro ao salvar usuário");
    console.log("Usuário salvo:", await response.json());
  } catch (error) {
    console.error("Erro ao salvar usuário:", error);
  }
}

// Botão Cancela
document.getElementById('btnCancela')?.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Formulário
document.getElementById('formCadastro')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuarios = await buscarUsuarios();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();

  // Validações
  if (!nome) {
    alert("Preencha o campo Nome.");
    return;
  }
  if (!/^[a-zA-Z\s]+$/.test(nome)) {
    alert("O campo Nome deve conter apenas texto.");
    return;
  }
  if (!email) {
    alert("Preencha o campo E-mail.");
    return;
  }
  if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
    alert("O e-mail deve ser um Gmail válido.");
    return;
  }
  if (!senha) {
    alert("Preencha o campo Senha.");
    return;
  }

  // Verificar se o e-mail já está cadastrado
  if (usuarios.some(u => u.email === email)) {
    alert("E-mail já cadastrado! Redirecionando para a página de login.");
    window.location.href = 'login.html';
    return;
  }

  // Salvar novo usuário
  const novoUsuario = { nome, email, senha };
  await salvarUsuario(novoUsuario);

  alert("Cadastro realizado com sucesso!");
  window.location.href = 'login.html';
});