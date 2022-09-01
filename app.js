'use strict';

let bank = [];

const getBank = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBank = (bank) => localStorage.setItem ('todoList', JSON.stringify(bank));

const createItem = (task, status, index) => {
    const item = document.createElement('label');
    item.classList.add('to-do-item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-index=${index}>
        <div>${task}</div>
        <input type="button" value="X" data-index=${index}>
    `;
    document.getElementById('todoList').appendChild(item);
}

const cleanTasks = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const refreshScreen = () => {
    cleanTasks();
    const bank= getBank(); 
    bank.forEach ( (item, index) => createItem (item.task, item.status, index));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const bank = getBank();
        bank.push ({'task': texto, 'status': ''});
        setBank(bank);
        refreshScreen();
        evento.target.value = '';
    }
}

const removerItem = (index) => {
    const bank = getBank();
    bank.splice (index, 1);
    setBank(bank);
    refreshScreen();
}

const atualizarItem = (index) => {
    const bank = getBank();
    banco[index].status = bank[index].status === '' ? 'checked' : '';
    setBank(bank);
    refreshScreen();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    console.log (elemento.type);
    if (elemento.type === 'button') {
        const index = elemento.dataset.index;
        removerItem (index);
    }else if (elemento.type === 'checkbox') {
        const index = elemento.dataset.index;
        atualizarItem (index);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

refreshScreen();
