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

    function verificarOcupacaoElemento(idElemento) {
        let elemento = document.getElementById(idElemento);
        if (elemento.classList.contains('objetivo') || elemento.classList.contains('snake') || elemento.classList.contains('snake-head')) {
            return true;
        }
        return false;
    }
}

function atualizarPontuacao() {
    document.getElementById('pontos').innerHTML = '<span class="negrito">Pontos</span>: '+getPontos();;
}

function atualizarConfig() {
    let colisaoBordasInputCheckbox = document.getElementById('idColisaoBordasInputCheckbox');
    let tamanhoGradeInputRange = document.getElementById('idTamanhoGradeInputRange');
    let tamanhoGradeInputNumber = document.getElementById('idTamanhoGradeInputNumber');

    tamanhoGradeInputNumber.value = tamanhoGradeInputRange.value;
    tamanhoGradeInputRange.value = tamanhoGradeInputNumber.value;

    bordasTemColisao = colisaoBordasInputCheckbox.checked;
    tamanhoGrade = tamanhoGradeInputNumber.value;
    if (posicaoJogador.x > tamanhoGrade || posicaoJogador.y > tamanhoGrade) {
        posicaoJogador.x = Math.floor(tamanhoGrade/2);
        posicaoJogador.y = Math.floor(tamanhoGrade/2);
    }

    console.log(colisaoBordasInputCheckbox.checked+" :: "+bordasTemColisao);
    console.log(tamanhoGradeInputRange.value);
    console.log(tamanhoGradeInputNumber.value+" :: "+tamanhoGrade);
    iniciarJogo();
}

function iniciarJogo() {
    document.querySelector('#tela-jogo').innerHTML = "";
    document.addEventListener('keydown', function(event) {
        controlarJogador(event.key);
    });
    iniciarGrade();
    if (document.querySelectorAll('.objetivo').length == 0) {
        adicionarObjetivo();
    }
    posicionarJogador();
}