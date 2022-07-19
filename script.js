// Initial Data

let square = { // Copia do que tem no quadro
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let player = ''; // Vez de quem joga
let warning = ''; // Armazenar mensagem do vencedor
let playing = false; // Bloquear jogadas quando terminar jogo

reset();

// Events

document.querySelector('.reset').addEventListener('click', reset); //Evento do botão resetar

document.querySelectorAll('.item').forEach(item => { // Passar em todos os botões e adicionar clique
    item.addEventListener('click', itemClick)
});

// Functions

function itemClick(event) {
    let item = event.target.getAttribute('data-item') // Saber em quem clicou
    if(playing && square[item] === '') {
        square[item] = player; // onde clicou, põe a jogada do jogador
        renderSquare();
        tooglePlayer(); // Alternar jogador
    }
}

function reset() {
    warning = '';
    let random = Math.floor(Math.random() * 2) // Escolha do jogador ser aleatória
    player = (random === 0) ? 'X' : 'O' // Se random for igual a 0: x, senão: o

    for(let i in square) {
        square[i] = ''; // Ir em cada campo e limpar
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare() {
    for(let i in square) { // Selecionar cada item
        let item = document.querySelector(`div[data-item=${i}]`)
        item.innerHTML = square[i] // Preencher a tela de acordo com o que tá vazio no HTML
    }
    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function tooglePlayer() {
    if(player === 'X') {
        player = 'O';
    } else {
        player = 'X'
    }
    renderInfo();
}

function checkGame() { //Verificar se ganhou
    if(checkWinnerFor('X')) {
        warning = 'O "X" venceu';
        playing = false;
    } else if(checkWinnerFor('O')) {
        warning = 'O "O" venceu';
        playing = false;
    } else if(isFull()) {
        warning = 'Empate';
        playing = false;
    }
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];
    for(let w in pos) {
        let pArray = pos[w].split(',') // a1,a2,a3

        let hasWon = pArray.every((option) => {
            if(square[option] === player) {
                return true;
            } else {
                return false;
            }
        });
        if(hasWon) {
            return true
        }
    }
    return false
}

function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    }
    return true
}