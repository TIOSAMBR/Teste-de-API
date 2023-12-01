const apiUrl = 'http://204.48.20.110';

    function setup() {
      const apiUrl = 'http://204.48.20.110';
      let exibirAnuncios = false;
      mostrarPagina('loginForm');
    }

    document.addEventListener('DOMContentLoaded', setup);

    let exibirAnuncios = false;

    let usuarioIdAtual = null;

    
    function exibirMensagem(mensagem) {
      document.getElementById('mensagem').innerText = mensagem;
    }

    function salvarTokenNoLocalStorage(token) {
      localStorage.setItem('token', token);
    }

    function obterTokenDoLocalStorage() {
      return localStorage.getItem('token');
    }

    function limparTokenNoLocalStorage() {
      localStorage.removeItem('token');
    }

    // Adiciona um evento de clique aos botões "Editar" dos anúncios
document.getElementById('anunciosContainer').addEventListener('click', function (event) {
  if (event.target.classList.contains('editarAnuncioBtn')) {
    const anuncioId = event.target.dataset.anuncioId;
    exibirFormularioEdicao(anuncioId);
  }
});

function atualizarInformacoesUsuario() {
  const idUsuario = obterIdUsuarioAtual();
  if (idUsuario) {
    obterDadosUsuario(idUsuario);
  } else {
    exibirMensagem('ID do usuário não encontrado.');
  }
}

function exibirFormularioEdicao(anuncioId) {
  const token = obterTokenDoLocalStorage();

  if (token) {
    fetch(`${apiUrl}/anuncios/${anuncioId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(anuncio => {
        document.getElementById('tituloAnuncioEdicao').value = anuncio.titulo;
        document.getElementById('descricaoAnuncioEdicao').value = anuncio.descricao;
        document.getElementById('precoAnuncioEdicao').value = anuncio.preco;

        const idAnuncioInput = document.createElement('input');
        idAnuncioInput.type = 'hidden';
        idAnuncioInput.id = 'idAnuncio';
        idAnuncioInput.value = anuncio.id;
        document.getElementById('edicaoAnuncioForm').appendChild(idAnuncioInput);

        mostrarPagina('edicaoAnuncioForm');
      })
      .catch(error => console.error('Erro ao obter detalhes do anúncio:', error));
  } else {
    exibirMensagem('Token não encontrado.');
  }
}

// Função para excluir um anúncio
function excluirAnuncio(anuncioId) {
  const confirmacao = confirm('Tem certeza que deseja excluir este anúncio?');

  if (confirmacao) {
    const token = obterTokenDoLocalStorage();

    if (token) {
      fetch(`${apiUrl}/anuncios/${anuncioId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          exibirMensagem(data.msg);
          buscarAnuncios();
          buscarAnuncios();
        })
        .catch(error => console.error('Erro ao excluir anúncio:', error));
    } else {
      exibirMensagem('Token não encontrado.');
    }
  }
}

// Função para editar um anúncio
function editarAnuncio() {
  const idAnuncio = document.getElementById('idAnuncio').value;
  const titulo = document.getElementById('tituloAnuncio').value;
  const descricao = document.getElementById('descricaoAnuncio').value;
  const preco = document.getElementById('precoAnuncio').value;

  const token = obterTokenDoLocalStorage();

  if (token) {
    fetch(`${apiUrl}/anuncios/${idAnuncio}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        titulo,
        descricao,
        preco: parseFloat(preco),
        usuarioId: obterIdUsuarioAtual()
      })
    })
      .then(response => response.json())
      .then(data => {
        exibirMensagem(data.msg);
        mostrarPaginaPrincipal();
      })
      .catch(error => console.error('Erro ao editar anúncio:', error));
  } else {
    exibirMensagem('Token não encontrado.');
  }
}

// Função para obter dinamicamente o ID do usuário atual
function obterIdUsuarioAtual() {
  const token = obterTokenDoLocalStorage();
  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken.usuarioId; 
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
    }
  }
  return null;
}

function buscarAnuncios() {
  const token = obterTokenDoLocalStorage();
  const anunciosContainer = document.getElementById('anunciosContainer');

  if (token) {
    if (!exibirAnuncios) {
      fetch(`${apiUrl}/anuncios/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          anunciosContainer.innerHTML = '';

          data.forEach(anuncio => {
            const anuncioElement = document.createElement('div');
            anuncioElement.innerHTML = `
              <h3>${anuncio.titulo}</h3>
              <p>${anuncio.descricao}</p>
              <p>Preço: ${anuncio.preco}</p>
              <button type="button" onclick="excluirAnuncio(${anuncio.id})">Excluir Anúncio</button>
              <button type="button" class="editarAnuncioBtn" data-anuncio-id="${anuncio.id}">Editar Anúncio</button>
            `;
            anunciosContainer.appendChild(anuncioElement);
          });

          // Altera a visibilidade do contêiner de anúncios
          anunciosContainer.style.display = 'block';
          exibirAnuncios = true;
        })
        .catch(error => console.error('Erro ao buscar anúncios:', error));
    } else {
      // Se a lista de anúncios estiver visível, ocultar !
      anunciosContainer.style.display = 'none';
      exibirAnuncios = false;
    }
  } else {
    exibirMensagem('Token não encontrado.');
  }
}
// Evento de clique para o botão "Editar Anúncio"
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('editarAnuncioBtn')) {
    const anuncioId = event.target.getAttribute('data-anuncio-id');
    mostrarFormularioEdicao(anuncioId);
  }
});

    // Função para editar dados do usuário
    function editarUsuario() {
      const novoNome = document.getElementById('editNome').value;
      const novoEmail = document.getElementById('editEmail').value;
      const novaSenha = document.getElementById('editSenha').value;

      const token = obterTokenDoLocalStorage();

      if (token) {
        fetch(`${apiUrl}/usuario`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            nome: novoNome,
            email: novoEmail,
            senha: novaSenha
          })
        })
          .then(response => response.json())
          .then(data => exibirMensagem(data.msg))
          .catch(error => console.error('Erro ao editar usuário:', error));
           mostrarPaginaPrincipal();
      } else {
        exibirMensagem('Token não encontrado.');
      }
    }

    function mostrarPagina(paginaId) {
      esconderTodosOsForms(); // Esconde todos os formulários
      document.getElementById('anunciosContainer').style.display = 'none'; // Oculta a lista de anúncios


      const paginaAtual = document.getElementById(paginaId);
      if (paginaAtual) {
        paginaAtual.style.display = 'block';

        if (paginaId === 'paginaPrincipal') {
          mostrarPaginaPrincipal();
        } else {
          //Garantir que a página principal seja ocultada quando necessário
          document.getElementById('paginaPrincipal').style.display = 'none';
        }
      }
    }

    function cadastrarUsuario() {
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;

      fetch(`${apiUrl}/usuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Resposta do servidor:', data);
          exibirMensagem('Cadastro realizado com sucesso. Faça o login.');
          mostrarPagina('loginForm');
        })
        .catch(error => console.error('Erro:', error));

      limparFormulario('cadastroForm');
    }

    function realizarLogin() {
      const loginEmail = document.getElementById('loginEmail').value;
      const loginSenha = document.getElementById('loginSenha').value;
    
      fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: loginEmail, senha: loginSenha })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Falha na autenticação');
          }
          return response.json();
        })
        .then(data => {
          salvarTokenNoLocalStorage(data.token);
          usuarioIdAtual = data.usuarioId; // Armazenar o ID do usuário
          exibirMensagem('Login realizado com sucesso.');
          mostrarPaginaPrincipal(); // Mostrar a nova página após o login
        })
        .catch(error => {
          console.error('Erro:', error.message);
          alert('Falha na autenticação. Verifique suas credenciais.');
        });
    }
    
    function mostrarPaginaPrincipal() {
      const token = obterTokenDoLocalStorage();
      const paginaPrincipal = document.getElementById('paginaPrincipal');
      const forms = document.querySelectorAll('form');
    
      esconderTodosOsForms(); // Esconde todos os formulários
    
      if (token && paginaPrincipal) {
        paginaPrincipal.style.display = 'block';
    
        // Obtenha dinamicamente o ID do usuário atual
        const idUsuario = obterIdUsuarioAtual();
    
        if (idUsuario) {
          // Atualiza os elementos de ID, nome e email
          document.getElementById('idUsuario').innerText = `ID: ${idUsuario}`;
          obterDadosUsuario(idUsuario); // Busque e exiba o nome e email do usuário
        }
      } else {
        exibirMensagem('Token não encontrado. Faça o login primeiro.');
    
        forms.forEach(form => {
          if (form.id === 'loginForm') {
            form.style.display = 'block';
          } else {
            form.style.display = 'none';
          }
        });
      }
    }

    function obterDadosUsuario(idUsuario) {
      const token = obterTokenDoLocalStorage();
    
      if (token) {
        fetch(`${apiUrl}/usuario/${idUsuario}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(usuario => {
            // Atualiza os elementos de nome e email com os dados do usuário
            document.getElementById('nomeUsuario').innerText = `Nome: ${usuario.nome}`;
            document.getElementById('emailUsuario').innerText = `Email: ${usuario.email}`;
          })
          .catch(error => console.error('Erro ao obter dados do usuário:', error));
      } else {
        exibirMensagem('Token não encontrado.');
      }
    }

     // Função para criar um anúncio
     function criarAnuncio() {
      const titulo = document.getElementById('tituloAnuncio').value;
      const descricao = document.getElementById('descricaoAnuncio').value;
      const preco = document.getElementById('precoAnuncio').value;

      const token = obterTokenDoLocalStorage();

      fetch(`${apiUrl}/anuncios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo,
          descricao,
          preco: parseFloat(preco),
          usuarioId: obterIdUsuarioAtual()
        })
      })
        .then(response => response.json())
        .then(data => {
          exibirMensagem(data.msg);
          buscarAnuncios();
        })
        .catch(error => console.error('Erro ao criar anúncio:', error));
    }

    function deslogarUsuario() {
      limparTokenNoLocalStorage();
      exibirMensagem('Logout realizado com sucesso.');
      mostrarPagina('loginForm');
    }

    function limparFormulario(formId) {
      const form = document.getElementById(formId);
      if (form) {
        form.reset();
      }
    }

    function esconderTodosOsForms() {
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        form.style.display = 'none';
      });
    }

    function exibirMensagem(mensagem) {
      document.getElementById('mensagem').innerText = mensagem;
    }

    function excluirUsuario() {
      const confirmacao = confirm('Tem certeza que deseja excluir seu usuário? Esta ação é irreversível.');
    
      if (confirmacao) {
        const token = obterTokenDoLocalStorage();
    
        if (token) {
          fetch(`${apiUrl}/usuario`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then(data => {
              exibirMensagem(data.msg);
              // Realizar o logout após excluir o usuário
              deslogarUsuario();
            })
            .catch(error => console.error('Erro ao excluir usuário:', error));
        } else {
          exibirMensagem('Token não encontrado.');
        }
      }
    }
    
    mostrarPagina('loginForm');