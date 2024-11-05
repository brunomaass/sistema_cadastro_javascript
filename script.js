// selecionar os elementos do DOM
const form = document.getElementById('form-pessoa');
const nomeInput = document.getElementById('nome');
const idadeInput = document.getElementById('idade');
const emailInput = document.getElementById('email');
const mensagem = document.getElementById('mensagem');
const listaPessoas = document.getElementById('lista-pessoas');

// Função para salvar no LocalStorage
function salvarPessoa(nome, idade, email) {
    //verifica se já existe o localStorage
    let pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];

    // verifica se o email já está cadastrado
    if (pessoas.some(pessoa => pessoa.email === email)) {
        mostrarMensagem('Erro: Email já cadastrado.', 'erro');
        return
    }

    // Adiciona a nova pessoa
    pessoas.push({ nome, idade, email });
    localStorage.setItem('pessoas', JSON.stringify(pessoas));
    mostrarMensagem('Pessoa cadastrada com sucesso!', 'sucesso');
    listarPessoas();
    form.reset(); // limpa o formulário
}

// Função para Listar pessoas
function listarPessoas () {
    listaPessoas.innerHTML = ''; // limpa a lista
    let pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];

    if (pessoas.length === 0) {
        listaPessoas.innerHTML = '<li>Nenhuma pessoa cadastrada</li>'
    }else {
        pessoas.forEach((pessoa, index) => {
            let li = document.createElement('li');
            li.innerHTML = `Nome: ${pessoa.nome}<br/> Idade: ${pessoa.idade}<br/> Email: ${pessoa.email} <button onclick="removerPessoa(${index})">Remover</button>`
            listaPessoas.appendChild(li);
        });
    }
}

// função para remover pesoas
function removerPessoa(index) {
    let pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
    pessoas.splice(index, 1); // remover pessoa pelo indice
    localStorage.setItem('pessoas', JSON.stringify(pessoas));
    listarPessoas();
    mostrarMensagem('Pessoa removida com sucesso!', 'sucesso');
}

// função para mostrar mensagens
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
    setTimeout(() => {
        mensagem.textContent = '';
        mensagem.className = 'mensagem';
    }, 3000);
}

// evento de submissão de formulário
form.addEventListener('submit', (e) => {
    e.preventDefault(); // previnir reload da página

    const nome = nomeInput.value.trim();
    const idade = idadeInput.value.trim();
    const email = emailInput.value.trim();

    if (nome === '' || idade == '' || email == '') {
        mostrarMensagem('Erro: Todos os campos são obrigatórios.', 'erro');
        return;
    }

    salvarPessoa(nome, idade, email);
});

// inicializar a lista de pessoas
listarPessoas();