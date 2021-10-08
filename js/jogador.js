var tela;
var tamanhoGrade;
var tamanhoJogador = 1;
var pontosJogador = 0;
var posicaoJogador = {};

// Posição inicial
posicaoJogador.x = 15;
posicaoJogador.y = 15;

var bordasTemColisao = true;
var comandoDado = false;
var movimento;
var intervaloMovimento = 100; // em milissegundos // padrão: 100
var idIntervaloMovimento;
var historicoMovimentos = [];

function controlarJogador(tecla) {
    tamanhoGrade = document.querySelectorAll('#tela-jogo tbody tr').length;
    let teclasPermitidas = ['w', 'a','s' ,'d' , 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
    console.log('Tecla: '+tecla);
    let permitir = false;
    for (i=0; i<teclasPermitidas.length; i++) {
        if (tecla == teclasPermitidas[i]) {
            permitir = true;
        }
    }
    if (permitir == false) {
        return;
    }
    //console.log(tamanhoGrade)
    //console.log(tecla)

    // Inicia movimento automatico de COBRA
    if (historicoMovimentos.length == 0) {
        idIntervaloMovimento = setInterval(manterMovimentoJogador, intervaloMovimento);
    }

    getGradeAtual().classList.remove('snake-head');
    if (!comandoDado) {
        if (tamanhoJogador == 1) {
            switch (tecla) {
                case 'w':
                case 'ArrowUp':
                    if (historicoMovimentos[historicoMovimentos.length-1] != 'baixo') {
                        atualizarHistorico('cima');
                    }
                    break;
                case 'a':
                case 'ArrowLeft':
                    if (historicoMovimentos[historicoMovimentos.length-1] != 'direita') {
                        atualizarHistorico('esquerda');
                    }
                    break;
                case 's':
                case 'ArrowDown':
                    if (historicoMovimentos[historicoMovimentos.length-1] != 'cima') {
                        atualizarHistorico('baixo');
                    }
                    break;
                case 'd':
                case 'ArrowRight':
                    if (historicoMovimentos[historicoMovimentos.length-1] != 'esquerda') {
                        atualizarHistorico('direita');
                    }
                    break;
            }
        }

        switch (tecla) {
            case 'w':
            case 'ArrowUp':
                if (movimento == 'baixo') {
                    break;
                }
                movimento = 'cima';
                break;
            case 'a':
            case 'ArrowLeft':
                if (movimento == 'direita') {
                break;
            }
                movimento = 'esquerda';
                break;
            case 's':
            case 'ArrowDown':
                if (movimento == 'cima') {
                break;
            }
                movimento = 'baixo';
                break;
            case 'd':
            case 'ArrowRight':
                if (movimento == 'esquerda') {
                break;
            }
                movimento = 'direita';
                break;
        }
        comandoDado = true;
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
    //console.log(tamanhoGrade);
    //console.log(`(${posicaoJogador.x}, ${posicaoJogador.y})`);
    
    if (verificarDerrota()) {
        console.log('perdeu');
        switch (historicoMovimentos[historicoMovimentos.length-1]) {
            case 'cima':
                posicaoJogador.y++;
                getGradeAtual().style = 'border-top: 1px solid rgb(255, 100, 70);';
                break
            case 'esquerda':
                posicaoJogador.x++;
                getGradeAtual().style = 'border-left: 1px solid rgb(255, 100, 70);';
                break
            case 'baixo':
                posicaoJogador.y--;
                getGradeAtual().style = 'border-bottom: 1px solid rgb(255, 100, 70);';
                break
            case 'direita':
                posicaoJogador.x--;
                getGradeAtual().style = 'border-right: 1px solid rgb(255, 100, 70);';
                break
        }
        posicionarJogador();
        tela = document.getElementById('tela-jogo');
        tela.style='border: 2px ridge rgb(255, 100, 70);';
        return;
    }
    posicionarJogador();

    if (tamanhoJogador > 1) {
        posicionarCorpoJogador();
    }

    atualizarHistorico(movimento);

    if (verificarPontuacao()) {
        adicionarObjetivo();
        //if (pontosJogador >= 8) {
        //    adicionarObjetivo();
        //}
        console.log('Pontos: '+pontosJogador);
    }
    comandoDado = false;
}

function posicionarJogador() {
    getGradeAtual().classList.add('snake-head');
}

function posicionarCorpoJogador() {
    let corpoX = [];
    let corpoY = [];
    
    removerSnakeBody();
    for (i=0; i<tamanhoJogador-1; i++) {
        if (i != 0) {
            corpoX[i] = corpoX[i-1];
            corpoY[i] = corpoY[i-1];
        } else {
            corpoX[0] = posicaoJogador.x;
            corpoY[0] = posicaoJogador.y;
        }
        switch (historicoMovimentos[historicoMovimentos.length-(i+1)]) {
            case 'cima':
                corpoY[i]++;
                getGrade(corpoX[i], corpoY[i]).classList.add('snake-body');
                break;
            case 'esquerda':
                corpoX[i]++;
                getGrade(corpoX[i], corpoY[i]).classList.add('snake-body');
                break;
            case 'baixo':
                corpoY[i]--;
                getGrade(corpoX[i], corpoY[i]).classList.add('snake-body');
                break;
            case 'direita':
                corpoX[i]--;
                getGrade(corpoX[i], corpoY[i]).classList.add('snake-body');
                break;
        }
        //console.log('Corpo X: '+corpoX+'\nCorpo Y: '+corpoY);
    }

    function removerSnakeBody() {
        let snakeBody = document.querySelectorAll('.snake-body');
        for (i=0; i<snakeBody.length; i++) {
            snakeBody[i].classList.remove('snake-body');
        }
    }
}

function verificarDerrota() {
    if (bordasTemColisao) {
        if (posicaoJogador.x <= -1 || posicaoJogador.x >= tamanhoGrade || posicaoJogador.y <= -1 || posicaoJogador.y >= tamanhoGrade) {
                    clearInterval(idIntervaloMovimento);
                    return true;
                }
    } else {
        if (posicaoJogador.x <= -1) {
            posicaoJogador.x = tamanhoGrade-1;
        } else if (posicaoJogador.x >= tamanhoGrade) {
            posicaoJogador.x = 0;
        } else if (posicaoJogador.y <= -1) {
            posicaoJogador.y = tamanhoGrade-1;
        } else if (posicaoJogador.y >= tamanhoGrade) {
            posicaoJogador.y = 0;
        }
    }  
    
    if (getGradeAtual().classList.contains('snake-body')) {
        clearInterval(idIntervaloMovimento);
        return true;
    }

    return false;
}

function verificarPontuacao() {
    if (getGradeAtual().classList.contains('snake-head') && getGradeAtual().classList.contains('objetivo')) {
        crescerJogador();
        pontosJogador++;
        atualizarPontuacao();
        getGradeAtual().classList.remove('objetivo');
        return true;
    }
    return false;
}

function crescerJogador() {
    tamanhoJogador++;
}

function atualizarHistorico(ultimoMovimento) {
    if (ultimoMovimento != historicoMovimentos[historicoMovimentos.length-1] || historicoMovimentos.length == 0) {
        historicoMovimentos.push(ultimoMovimento);
    } else if (ultimoMovimento == historicoMovimentos[historicoMovimentos.length-1]) {
        historicoMovimentos.shift();
        historicoMovimentos.push(ultimoMovimento);
    }
    historicoMovimentos.reverse();
    historicoMovimentos.slice(tamanhoJogador, historicoMovimentos.length-tamanhoJogador)
    historicoMovimentos.reverse();
    console.log(historicoMovimentos);
}

function getGradeAtual() {
    return document.getElementById(`gradeX${posicaoJogador.x}Y${posicaoJogador.y}`);
}

function getGrade(x, y) {
    return grade = document.getElementById(`gradeX${x}Y${y}`);
}

function getPontos() {
    return pontosJogador;
}