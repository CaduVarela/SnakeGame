var tela = document.getElementById('tela-jogo');
var tamanhoJogador = 1;
var pontosJogador = 0;
var posicaoJogador = {}

// Posição inicial
posicaoJogador.x = 15;
posicaoJogador.y = 15;

var historicoMovimentos = [];
var gradeAtual; // Elemento DOM em que 'snake-head' se encontra

function controlarJogador(tecla) {
    console.log(tecla)
    document.getElementById(`gradeX${posicaoJogador.x}Y${posicaoJogador.y}`).classList.remove('snake-head');
    switch (tecla) {
        case 'w':
        case 'ArrowUp':
            atualizarHistorico('cima');
            posicaoJogador.y--;
            break;
        case 'a':
        case 'ArrowLeft':
            atualizarHistorico('esquerda');
            posicaoJogador.x--;
            break;
        case 's':
        case 'ArrowDown':
            atualizarHistorico('baixo');
            posicaoJogador.y++;
            break;
        case 'd':
        case 'ArrowRight':
            atualizarHistorico('direita');
            posicaoJogador.x++;
            break;
    }
    posicionarJogador();
}

function posicionarJogador() {
    getGradeAtual().classList.add('snake-head');
}

function crescerJogador() {
    tamanhoJogador++;
}

function atualizarHistorico(ultimoMovimento) {
    if (ultimoMovimento != historicoMovimentos[historicoMovimentos.length-1] || historicoMovimentos.length == 0) {
        historicoMovimentos.push(ultimoMovimento);
        historicoMovimentos = historicoMovimentos.slice(historicoMovimentos.length-tamanhoJogador, historicoMovimentos.length)
        console.log(historicoMovimentos)
    }
}

function getGradeAtual() {
    return gradeAtual = document.getElementById(`gradeX${posicaoJogador.x}Y${posicaoJogador.y}`);
}