function adicionarObjetivo() {
    let tela = document.getElementById('tela-jogo');
    let posicaoObjeto = {x, y};
    if (!tela.classList.contains('snake-head') & !tela.classList.contains('snake') ) {
        posicaoObjeto.x = Math.floor(Math.random * 31);
        posicaoObjeto.y = Math.floor(Math.random * 31);
    }

}