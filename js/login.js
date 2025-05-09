async function buscarUsuarios() {
  json-server --watch js/db.json --port 3000  try {
    const response = await fetch('http://localhost:3000/usuarios');
    if (!response.ok) throw new Error("Erro ao carregar usuários");
    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
}

document.getElementById('formLogin')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuarios = await buscarUsuarios();

  const email = document.getElementById('emailLogin').value.trim();
  const senha = document.getElementById('senhaLogin').value.trim();

  const usuario = usuarios.find(u => u.email === email);

  if (!usuario) {
    alert("Usuário não encontrado! Redirecionando para a página de cadastro.");
    window.location.href = 'cadastro.html';
    return;
  }

  if (usuario.senha !== senha) {
    alert("Senha incorreta!");
    return;
  }

  alert("Login realizado com sucesso!");
  window.location.href = 'index.html';
});

document.getElementById('btnCadastro')?.addEventListener('click', () => {
  window.location.href = 'cadastro.html';
});