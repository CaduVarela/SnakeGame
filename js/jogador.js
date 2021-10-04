var tela = document.getElementById('tela-jogo');
var tamanhoGrade;
var tamanhoJogador = 1;
var pontosJogador = 0;
var posicaoJogador = {}

// Posição inicial
posicaoJogador.x = 15;
posicaoJogador.y = 15;

var intervaloMovimento = 1000; // em milissegundos // (80)
var idIntervaloMovimento;
var historicoMovimentos = [];
var gradeAtual; // Elemento DOM em que 'snake-head' se encontra

function controlarJogador(tecla) {
    tamanhoGrade = document.querySelectorAll('#tela-jogo tbody tr').length;

    //console.log(tamanhoGrade)
    //console.log(tecla)

    // Inicia movimento automatico de COBRA
    if (historicoMovimentos.length == 0) {
        idIntervaloMovimento = setInterval(manterMovimentoJogador, intervaloMovimento);
    }

    getGradeAtual().classList.remove('snake-head');
    switch (tecla) {
        case 'w':
        case 'ArrowUp':
            if (historicoMovimentos[historicoMovimentos.length-1] != 'baixo') {
                atualizarHistorico('cima');
            }
            //posicaoJogador.y--;
            break;
        case 'a':
        case 'ArrowLeft':
            if (historicoMovimentos[historicoMovimentos.length-1] != 'direita') {
                atualizarHistorico('esquerda');
            }
            //posicaoJogador.x--;
            break;
        case 's':
        case 'ArrowDown':
            if (historicoMovimentos[historicoMovimentos.length-1] != 'cima') {
                atualizarHistorico('baixo');
            }
            //posicaoJogador.y++;
            break;
        case 'd':
        case 'ArrowRight':
            if (historicoMovimentos[historicoMovimentos.length-1] != 'esquerda') {
                atualizarHistorico('direita');
            }
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
    //console.log(tamanhoGrade);
    //console.log(`(${posicaoJogador.x}, ${posicaoJogador.y})`);
    
    if (verificarDerrota()) {
        console.log('perdeu');
        //tela.style = 'border: 2px ridge red;';
        return;
    }
    posicionarJogador();
    if (tamanhoJogador > 1) {
        posicionarCorpoJogador();
    }
}

function posicionarJogador() {
    getGradeAtual().classList.add('snake-head');
}

function posicionarCorpoJogador() {
    let corpoX = [];
    let corpoY = [];
    let indice = 0;
    
    removerSnakeBody();
    if (tamanhoJogador == 2) {
        switch (historicoMovimentos[historicoMovimentos.length-1]) {
            case 'cima':
                getGrade(posicaoJogador.x, posicaoJogador.y+1).classList.add('snake-body');
                corpoX[indice] = posicaoJogador.x;
                corpoY[indice] = posicaoJogador.y+1;
                break;
            case 'esquerda':
                getGrade(posicaoJogador.x+1, posicaoJogador.y).classList.add('snake-body');
                corpoX[indice] = posicaoJogador.x+1;
                corpoY[indice] = posicaoJogador.y;
                break;
            case 'baixo':
                getGrade(posicaoJogador.x, posicaoJogador.y-1).classList.add('snake-body');
                corpoX[indice] = posicaoJogador.x;
                corpoY[indice] = posicaoJogador.y-1;
                break;
            case 'direita':
                getGrade(posicaoJogador.x-1, posicaoJogador.y).classList.add('snake-body');
                corpoX[indice] = posicaoJogador.x-1;
                corpoY[indice] = posicaoJogador.y;
                break;
        }
        indice++;

    } else {
        for (i=0; i<tamanhoJogador-1; i++) {
            switch (historicoMovimentos[historicoMovimentos.length-1]) {
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
            console.log('Corpo X: '+corpoX+'\nCorpo Y: '+corpoY);
        }
    }

    function removerSnakeBody() {
        let snakeBody = document.querySelectorAll('.snake-body');
        for (i=0; i<snakeBody.length; i++) {
            snakeBody[i].classList.remove('snake-body');
        }
    }
    
}

/*
function posicionarCorpoJogador() {
    var x1 = posicaoJogador.x;
    var y1 = posicaoJogador.y;
    var corpo = [{x, y}];

    encontrarCorpoJogador();
    corpo = corpo.reverse();

    for (i=tamanhoJogador; i<0; i--) {
        switch (historicoMovimentos[i]) {
            case 'cima':
                getGrade(corpo[i].x, corpo[i].y--).classList.add('snake-body');
                break;
            case 'esquerda':
                getGrade(corpo[i].x--, corpo[i].y).classList.add('snake-body');
                break;
            case 'baixo':
                getGrade(corpo[i].x, corpo[i].y++).classList.add('snake-body');
                break;
            case 'direita':
                getGrade(corpo[i].x++, corpo[i].y).classList.add('snake-body');
                break;
        }
    }

    function encontrarCorpoJogador() {
        for(i=0, j=tamanhoJogador-1; i<tamanhoJogador-1; i++, j--) {
            console.log('orientacao: '+encontrarOrientacao(j));
            switch(encontrarOrientacao(j)) {
                case 'cima':
                    y1--;
                    break 
                case 'esquerda':
                    x1--;
                    break 
                case 'baixo':
                    y1++;
                    break 
                case 'direita':
                    x1++;
                    break 
            }
            corpo[i].x = x1;
            corpo[i].y = y1;
        }
        console.log('Corpo: '+corpo);
    }

    function encontrarOrientacao(indiceMovimento) {
        if (indiceMovimento == 1) {
            switch (historicoMovimentos[0]) {
                case 'cima': 
                    return 'baixo';
                case 'esquerda': 
                    return 'direita';
                case 'baixo': 
                    return 'cima';
                case 'direita':
                    return 'esquerda';
            }
        } else {
            switch (historicoMovimentos[indiceMovimento]) {
                case 'cima': 
                    return 'baixo';
                case 'esquerda': 
                    return 'direita';
                case 'baixo': 
                    return 'cima';
                case 'direita':
                    return 'esquerda';
            }
        }
        
    }
}
*/

function verificarDerrota() {
    if (posicaoJogador.x <= -1 || posicaoJogador.x >= tamanhoGrade || posicaoJogador.y <= -1 || posicaoJogador.y >= tamanhoGrade) {
        //console.log('perdeu');
        clearInterval(idIntervaloMovimento);
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