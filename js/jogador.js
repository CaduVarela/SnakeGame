var tela = document.getElementById('tela-jogo');
let tamanhoGrade;
var tamanhoJogador = 1;
var pontosJogador = 0;
var posicaoJogador = {}

// Posição inicial
posicaoJogador.x = 15;
posicaoJogador.y = 15;

var historicoMovimentos = [];
var gradeAtual; // Elemento DOM em que 'snake-head' se encontra

function controlarJogador(tecla) {
    tamanhoGrade = document.querySelectorAll('#tela-jogo tbody tr').length;
    if (posicaoJogador.x == -1 || posicaoJogador.x == tamanhoGrade || posicaoJogador.y == -1 || posicaoJogador.y == tamanhoGrade) {
        console.log('perdeu');
        clearInterval(idIntervalo)
        return;
    }

    //console.log(tamanhoGrade)
    //console.log(tecla)

    // Inicia movimento automatico de COBRA
    if (historicoMovimentos.length == 0) {
        var idIntervalo = setInterval(manterMovimentoJogador, 80);
    }

    getGradeAtual().classList.remove('snake-head');
    switch (tecla) {
        case 'w':
        case 'ArrowUp':
            atualizarHistorico('cima');
            //posicaoJogador.y--;
            break;
        case 'a':
        case 'ArrowLeft':
            atualizarHistorico('esquerda');
            //posicaoJogador.x--;
            break;
        case 's':
        case 'ArrowDown':
            atualizarHistorico('baixo');
            //posicaoJogador.y++;
            break;
        case 'd':
        case 'ArrowRight':
            atualizarHistorico('direita');
            //posicaoJogador.x++;
            break;
    }
    posicionarJogador();
}

function manterMovimentoJogador() {
    console.log('moveu');

    getGradeAtual().classList.remove('snake-head');
    if (historicoMovimentos.length == 0) {
        return
    }
    switch (historicoMovimentos[historicoMovimentos.length-1]) {
        case 'cima':
            posicaoJogador.y--;
            break;
        case 'esquerda':
            posicaoJogador.x--;
            break;
        case 'baixo':
            posicaoJogador.y++;
            break;
        case 'direita':
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
    console.log(historicoMovimentos[historicoMovimentos.length-1]);
    switch (historicoMovimentos[historicoMovimentos.length-1]) {
        case 'cima':
            getGrade(posicaoJogador.x, posicaoJogador.y+1).classList.add('snake-body');
            break;
        case 'esquerda':
            getGrade(posicaoJogador.x+1, posicaoJogador.y).classList.add('snake-body');
            break;
        case 'baixo':
            getGrade(posicaoJogador.x, posicaoJogador.y-1).classList.add('snake-body');
            break;
        case 'direita':
            getGrade(posicaoJogador.x-1, posicaoJogador.y).classList.add('snake-body');
            break;
        default:
            break;
    }
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

function getGrade(x, y) {
    return grade = document.getElementById(`gradeX${x}Y${y}`);
}