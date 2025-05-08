async function buscarUsuarios() {
  try {
    const response = await fetch('../js/db.json');
    if (!response.ok) throw new Error("Erro ao carregar db.json");
    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    return { usuarios: [] };
  }
}

async function salvarUsuario(novoUsuario) {
  try {
    const usuarios = (await buscarUsuarios()).usuarios || [];
    usuarios.push(novoUsuario);

    // Simulação de salvar no banco (substitua por uma API real)
    console.log("Usuário salvo:", novoUsuario);
  } catch (error) {
    console.error("Erro ao salvar usuário:", error);
  }
}

// Botão Cancela
document.getElementById('btnCancela')?.addEventListener('click', () => {
  window.location.href = 'index.html'; // Use './' para indicar o caminho relativo
});

// Formulário
document.getElementById('formCadastro')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuarios = (await buscarUsuarios()).usuarios || [];

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
  const novoUsuario = { id: usuarios.length + 1, nome, email, senha };
  await salvarUsuario(novoUsuario);

  alert("Cadastro realizado com sucesso!");
  window.location.href = 'login.html';
});