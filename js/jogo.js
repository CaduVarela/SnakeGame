function adicionarObjetivo() {
    let tela = document.getElementById('tela-jogo');
    let tamanhoGrade = document.querySelectorAll('#tela-jogo tbody tr').length;
    let posicaoObjetivo = {x, y};
    let elemento, idElemento;
    
    do {
        posicaoObjetivo.x = Math.floor(Math.random() * tamanhoGrade);
        posicaoObjetivo.y = Math.floor(Math.random() * tamanhoGrade);
        idElemento=`gradeX${posicaoObjetivo.x}Y${posicaoObjetivo.y}`;
        elemento = document.getElementById(idElemento);
        console.log(`Objetivo adicionado em (${posicaoObjetivo.x}, ${posicaoObjetivo.y})`);
    } while (verificarOcupacaoElemento(idElemento));

    elemento.classList.add('objetivo');
}

function verificarOcupacaoElemento(idElemento) {
    let elemento = document.getElementById(idElemento);
    if (elemento.classList.contains('objetivo') || elemento.classList.contains('snake') || elemento.classList.contains('snake-head')) {
        return true;
    }
    return false;
}

function atualizarPontuacao() {
    document.getElementById('pontos').innerHTML = '<span class="negrito">Pontos</span>: '+getPontos();;
}