
class Tarefa {
    constructor(id, descricao, concluida = false) {
        this.id = id;
        this.descricao = descricao;
        this.concluida = concluida;
    }
}

let tarefas = [];

const tarefaInput = document.getElementById("tarefaInput");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("listaTarefas");

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

function criarTarefa(descricao) {
    const id = Date.now(); 
    const novaTarefa = new Tarefa(id, descricao);

    tarefas.push(novaTarefa);

    listarTarefas();
}


function deletarTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    listarTarefas();
}


function atualizarTarefa(id, novaDescricao) {
    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.descricao = novaDescricao;
        listarTarefas();
    }
}


function atualizarStatus(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        listarTarefas();
    }
}

function listarTarefas(lista = tarefas) {
    listaTarefas.innerHTML = "";

    lista.forEach(tarefa => {
        const li = document.createElement("li");

        
        li.textContent = tarefa.descricao;

        if (tarefa.concluida) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.6";
        }

        li.addEventListener("click", () => {
            atualizarStatus(tarefa.id);
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "❌";
        btnExcluir.style.marginLeft = "10px";

        btnExcluir.addEventListener("click", (event) => {
            event.stopPropagation();
            deletarTarefa(tarefa.id);
        });

        li.appendChild(btnExcluir);
        listaTarefas.appendChild(li);
    });
}

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

const filtroTodas = document.getElementById("filtroTodas");
const filtroPendentes = document.getElementById("filtroPendentes");
const filtroConcluidas = document.getElementById("filtroConcluidas");

filtroTodas.addEventListener("click", () => {
    filtrarTarefa("todas");
});

filtroPendentes.addEventListener("click", () => {
    filtrarTarefa("pendentes");
});

filtroConcluidas.addEventListener("click", () => {
    filtrarTarefa("concluidas");
});