const tarefaInput = document.getElementById('tarefaInput');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaTarefas = document.getElementById('listaTarefas');
btnAdicionar.addEventListener('click', adicionarTarefa);

function adicionarTarefa() {
    const tarefa = tarefaInput.value.trim();   
    if (tarefa === "") {
        return alert("Por favor, insira uma tarefa válida.");
    }

    const novaTarefa=document.createElement('li');
    novaTarefa.textContent = tarefa;
    listaTarefas.appendChild(novaTarefa);  
    tarefaInput.value = '';
    tarefaInput.focus();
    
    }