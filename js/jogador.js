
var tela = document.getElementById('tela-jogo');

function moverJogador() {
    let playerPosition;
}

function iniciarJogador() {
    var posicaoJogador = {};
    posicaoJogador.x = 15;
    posicaoJogador.y = 15;

    document.getElementById(`gradeX${posicaoJogador.x}Y${posicaoJogadorn.y}`).classList.add('snake-head');
}

function crescerJogador() {

}

function atualizarHistoricoMovimento() {

}

function adicionarObjetivo() {
    let posicaoObjeto;
    posicaoObjeto.x = Math.floor(Math.random * 31);
    posicaoObjeto.y = Math.floor(Math.random * 31);

}