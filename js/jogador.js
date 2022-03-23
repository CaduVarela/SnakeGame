var tela;
var tamanhoJogador = 1;
var pontosJogador = 0;
var posicaoJogador = {};

// Posição inicial
posicaoJogador.x = Math.floor(tamanhoGrade/2);
posicaoJogador.y = Math.floor(tamanhoGrade/2);

var bordasTemColisao = true;
var comandoDado = false;
let mudarVelocidade = false;
var movimento;
var intervaloMovimento = 133; // em milissegundos // padrão: 100 <---> velocidade padrão: 40 |||| 133 ms <---> 25 velocidade
var minIntervaloMovimento = 20; // define uma "velocidade maxima"
var idIntervaloMovimento;
var historicoMovimentos = [];

/* NOTAS
- BUG: crescer jogador enquando atravessa parede causa perda de controle
*/

function controlarJogador(tecla) {
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

    // Inicia movimento automatico de cobra
    if (historicoMovimentos.length == 0 || mudarVelocidade) {
        if (mudarVelocidade) {
            clearInterval(idIntervaloMovimento)
        }
        idIntervaloMovimento = setInterval(manterMovimentoJogador, intervaloMovimento);
        mudarVelocidade = false;
    }

    getGradeAtual().classList.remove('snake-head');
    if (!comandoDado) {
        if (tamanhoJogador == 1) {
            switch (tecla) {
                case 'w':
                case 'ArrowUp':
                    if (getUltimoMovimento() != 'baixo') {
                        atualizarHistorico('cima');
                    }
                    break;
                case 'a':
                case 'ArrowLeft':
                    if (getUltimoMovimento() != 'direita') {
                        atualizarHistorico('esquerda');
                    }
                    break;
                case 's':
                case 'ArrowDown':
                    if (getUltimoMovimento() != 'cima') {
                        atualizarHistorico('baixo');
                    }
                    break;
                case 'd':
                case 'ArrowRight':
                    if (getUltimoMovimento() != 'esquerda') {
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
    //console.log('moveu');

    getGradeAtual().classList.remove('snake-head');
    if (historicoMovimentos.length == 0) {
        return;
    }

    switch (getUltimoMovimento()) {
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
        switch (getUltimoMovimento()) {
            case 'cima':
                posicaoJogador.y++;
                getGradeAtual().style = 'border-top: 1px solid rgb(255, 100, 70);';
                break;
            case 'esquerda':
                posicaoJogador.x++;
                getGradeAtual().style = 'border-left: 1px solid rgb(255, 100, 70);';
                break;
            case 'baixo':
                posicaoJogador.y--;
                getGradeAtual().style = 'border-bottom: 1px solid rgb(255, 100, 70);';
                break;
            case 'direita':
                posicaoJogador.x--;
                getGradeAtual().style = 'border-right: 1px solid rgb(255, 100, 70);';
                break;
        }
        posicionarJogador();
        tela = document.getElementById('tela-jogo');
        tela.style='border: 2px ridge rgb(255, 100, 70);';
        alternarTelaReiniciar();
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
        if (i == 0) {
            corpoX[i] = posicaoJogador.x;
            corpoY[i] = posicaoJogador.y;
            if (!bordasTemColisao) {
                if (posicaoJogador.x == 0 && getUltimoMovimento() == 'direita') {
                    corpoX[i] = tamanhoGrade;
                } else if (posicaoJogador.x == tamanhoGrade-1 && getUltimoMovimento() == 'esquerda') {
                    corpoX[i] = -1;
                } else if (posicaoJogador.y == 0 && getUltimoMovimento() == 'baixo') {
                    corpoY[i] = tamanhoGrade;
                } else if (posicaoJogador.y == tamanhoGrade-1 && getUltimoMovimento() == 'cima') {
                    corpoY[i] = -1;
                } else if (posicaoJogador.x == 0 || posicaoJogador.y == 0 || posicaoJogador.x == tamanhoGrade-1 || posicaoJogador.y == tamanhoGrade-1) {
                    corpoX[i] = posicaoJogador.x;
                    corpoY[i] = posicaoJogador.y;
                }
            }
        } else {
            corpoX[i] = corpoX[i-1];
            corpoY[i] = corpoY[i-1];
            console.log(historicoMovimentos+' :: '+historicoMovimentos[tamanhoJogador-1-i]);
            if (!bordasTemColisao) {
                if (corpoX[i-1] == 0 && historicoMovimentos[tamanhoJogador-1-i] == 'direita') {
                    corpoX[i] = tamanhoGrade;
                    console.log('trigger :: direita');
                } else if (corpoX[i-1] == tamanhoGrade-1 && historicoMovimentos[tamanhoJogador-1-i] == 'esquerda') {
                    corpoX[i] = -1;
                    console.log('trigger :: esquerda');
                } else if (corpoY[i-1] == 0 && historicoMovimentos[tamanhoJogador-1-i] == 'baixo') {
                    corpoY[i] = tamanhoGrade;
                    console.log('trigger :: baixo');
                } else if (corpoY[i-1] == tamanhoGrade-1 && historicoMovimentos[tamanhoJogador-1-i] == 'cima') {
                    corpoY[i] = -1;
                    console.log('trigger :: cima');
                } else if (corpoX[i-1] == 0 || corpoX[i-1] == tamanhoGrade-1 || corpoY[i-1] == 0 || corpoY[i-1] == tamanhoGrade-1) {
                    corpoX[i] = corpoX[i-1];
                    corpoY[i] = corpoY[i-1];
                }
            }
        }

        console.log(`.`);
        console.log(`corpoX[${i}]: ${corpoX[i]}`);
        console.log(`corpoY[${i}]: ${corpoY[i]}`);
        
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
            descreverPosicaoJogador();
        } else if (posicaoJogador.x >= tamanhoGrade) {
            posicaoJogador.x = 0;
            descreverPosicaoJogador();
        } else if (posicaoJogador.y <= -1) {
            posicaoJogador.y = tamanhoGrade-1;
            descreverPosicaoJogador();
        } else if (posicaoJogador.y >= tamanhoGrade) {
            posicaoJogador.y = 0;
            descreverPosicaoJogador();
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
    if (ultimoMovimento != getUltimoMovimento() || historicoMovimentos.length == 0) {
        historicoMovimentos.push(ultimoMovimento);
    } else if (ultimoMovimento == getUltimoMovimento()) {
        historicoMovimentos.shift();
        historicoMovimentos.push(ultimoMovimento);
    }
    historicoMovimentos.reverse();
    historicoMovimentos = historicoMovimentos.slice(0, tamanhoJogador);
    historicoMovimentos.reverse();

    // Histórico de Movimentos log !!!
     console.log(historicoMovimentos);
}

function descreverPosicaoJogador() {
    console.log(`.`);
    console.log(`posiçãoJogador.x: ${posicaoJogador.x}`);
    console.log(`posiçãoJogador.y: ${posicaoJogador.y}`);
}

function getUltimoMovimento() {
    return historicoMovimentos[historicoMovimentos.length-1];
}

function getGradeAtual() {
    return document.getElementById(`gradeX${posicaoJogador.x}Y${posicaoJogador.y}`);
}

function getGrade(x, y) {
    return grade = document.getElementById(`gradeX${x}Y${y}`);
}