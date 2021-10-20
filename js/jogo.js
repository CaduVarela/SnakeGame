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

function atualizarConfig(acionador) {
    // Declarando variaveis
    let colisaoBordasInputCheckbox = document.getElementById('idColisaoBordasInputCheckbox');
    let tamanhoGradeInputRange = document.getElementById('idTamanhoGradeInputRange');
    let tamanhoGradeInputNumber = document.getElementById('idTamanhoGradeInputNumber');
    let velocidadeInputRange = document.getElementById('idVelocidadeInputRange');
    let velocidadeInputNumber = document.getElementById('idVelocidadeInputNumber');

    // Sincronizando Inputs (Range e Number)
    if (acionador == 'tamanhoGradeInputRange') {
        tamanhoGradeInputNumber.value = tamanhoGradeInputRange.value;
    } else if (acionador == 'tamanhoGradeInputNumber') {
        tamanhoGradeInputRange.value = tamanhoGradeInputNumber.value;
    }

    if (acionador == 'velocidadeInputRange') {
        velocidadeInputNumber.value = velocidadeInputRange.value;
    } else if (acionador == 'velocidadeInputNumber') {
        velocidadeInputRange.value = velocidadeInputNumber.value;
    }

    // Redefinindo valores
    bordasTemColisao = colisaoBordasInputCheckbox.checked;
    tamanhoGrade = tamanhoGradeInputNumber.value;
    intervaloMovimento = velocidadeInputNumber.getAttribute('max') - velocidadeInputNumber * 2;
    mudarVelocidade = true;
    if (posicaoJogador.x > tamanhoGrade || posicaoJogador.y > tamanhoGrade) {
        posicaoJogador.x = Math.floor(tamanhoGrade/2);
        posicaoJogador.y = Math.floor(tamanhoGrade/2);
    }

    // Debug
    console.log(colisaoBordasInputCheckbox.checked+' :: '+bordasTemColisao);
    console.log(tamanhoGradeInputRange.value);
    console.log(tamanhoGradeInputNumber.value+' :: '+tamanhoGrade);
    console.log(velocidadeInputNumber+' :: '+intervaloMovimento)

    // Não muda até iniciar o jogo / enquanto está na tela inicial
    if (!document.querySelector('#tela-iniciar-jogo')) {
        iniciarJogo();
    }
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