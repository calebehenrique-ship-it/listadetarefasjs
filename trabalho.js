// Classe que representa uma tarefa
class Tarefa {
    constructor(id, descricao, concluida = false) {
        this.id = id;
        this.descricao = descricao;
        this.concluida = concluida;
    }
}

// Array que armazenará todas as tarefas
let tarefas = [];

// Referências aos elementos do HTML
const tarefaInput = document.getElementById("tarefaInput");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("listaTarefas");

// Evento do botão Adicionar
btnAdicionar.addEventListener("click", () => {
    const descricao = tarefaInput.value.trim();

    if (descricao === "") {
        alert("Por favor, digite uma tarefa.");
        return;
    }

    criarTarefa(descricao);

    tarefaInput.value = "";
    tarefaInput.focus();
});

// Cria uma nova tarefa
function criarTarefa(descricao) {
    const id = Date.now(); // Gera um ID único
    const novaTarefa = new Tarefa(id, descricao);

    tarefas.push(novaTarefa);

    listarTarefas();
}

// Remove uma tarefa pelo ID
function deletarTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    listarTarefas();
}

// Atualiza a descrição de uma tarefa
function atualizarTarefa(id, novaDescricao) {
    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.descricao = novaDescricao;
        listarTarefas();
    }
}

// Alterna entre concluída e pendente
function atualizarStatus(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        listarTarefas();
    }
}

// Lista as tarefas na tela
function listarTarefas(lista = tarefas) {
    listaTarefas.innerHTML = "";

    lista.forEach(tarefa => {
        const li = document.createElement("li");

        // Texto da tarefa
        li.textContent = tarefa.descricao;

        // Se concluída, aplica estilo
        if (tarefa.concluida) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.6";
        }

        // Ao clicar, alterna status
        li.addEventListener("click", () => {
            atualizarStatus(tarefa.id);
        });

        // Botão de excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "❌";
        btnExcluir.style.marginLeft = "10px";

        // Impede que o clique no botão também marque a tarefa
        btnExcluir.addEventListener("click", (event) => {
            event.stopPropagation();
            deletarTarefa(tarefa.id);
        });

        li.appendChild(btnExcluir);
        listaTarefas.appendChild(li);
    });
}

// Filtra as tarefas
function filtrarTarefa(tipo) {
    if (tipo === "todas") {
        listarTarefas(tarefas);
    } else if (tipo === "concluidas") {
        const concluidas = tarefas.filter(tarefa => tarefa.concluida);
        listarTarefas(concluidas);
    } else if (tipo === "pendentes") {
        const pendentes = tarefas.filter(tarefa => !tarefa.concluida);
        listarTarefas(pendentes);
    }
}
// Seleciona os botões de filtro
const filtroTodas = document.getElementById("filtroTodas");
const filtroPendentes = document.getElementById("filtroPendentes");
const filtroConcluidas = document.getElementById("filtroConcluidas");

// Eventos dos botões
filtroTodas.addEventListener("click", () => {
    filtrarTarefa("todas");
});

filtroPendentes.addEventListener("click", () => {
    filtrarTarefa("pendentes");
});

filtroConcluidas.addEventListener("click", () => {
    filtrarTarefa("concluidas");
});