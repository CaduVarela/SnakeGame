var tela = document.getElementById('tela-jogo');

var posicaoJogador = {}
posicaoJogador.x = 15;
posicaoJogador.y = 15;

var historicoMovimentos = [];
var historicoCoordenas = [];

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
    document.getElementById(`gradeX${posicaoJogador.x}Y${posicaoJogador.y}`).classList.add('snake-head');
}

function crescerJogador() {
    
}

function atualizarHistorico(movimento) {
    historicoMovimentos.push(movimento);
    historicoCoordenas.push(`(${posicaoJogador.x}, ${posicaoJogador.y})`);
    console.log(historicoMovimentos)
    console.log(historicoCoordenas)
}