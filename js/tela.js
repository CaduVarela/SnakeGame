var tamanhoGrade = 31; // min - 8; max - 100; default - 31; 

function iniciarGrade() {
    //document.getElementById('tela-jogo').style = 'background-color: red;';
    let tela = document.getElementById('tela-jogo');

    HTMLgrade = '<table id="grade">';
    for (y=0; y<tamanhoGrade; y++) {
        HTMLgrade += `<tr cellpadding="0" id="gradeLinha${y}">`;
        for (x=0; x<tamanhoGrade; x++) {
            HTMLgrade += `<td id=gradeX${x}Y${y}></td>`;
        }
        HTMLgrade += '</tr>';
    }
    HTMLgrade += '</table>';

    tela.insertAdjacentHTML("afterbegin", HTMLgrade);
}

function alternarMenuConfig() {
    let menu = document.getElementById('menu-config');
    let button = menu.getElementsByTagName('button')[0];
    if (menu.classList.contains('aberto')) { // Se menu aberto --> fecha menu
        menu.classList.remove('aberto');
        menu.classList.add('fechado');
        button.innerHTML = '<img src="./img/config.png">';

    } else if (menu.classList.contains('fechado')) { // Se menu fechado --> abre menu
        menu.classList.remove('fechado');
        menu.classList.add('aberto');
        button.innerHTML = '<h1>Configurações</h1>';
    }
}

function alternarTelaReiniciar() {
    let telaReiniciar = document.getElementById('tela-reiniciar');
    let pPontuacao = document.getElementById('pontuacao');
    let hHighscore = document.getElementById('highscore');
    let localStorage = window.localStorage;
    if ('highscore' in localStorage) {
        if (pontosJogador > localStorage.getItem('highscore')) {
            localStorage.setItem('highscore', pontosJogador);
        }
    } else {
        localStorage.setItem('highscore', pontosJogador);
    }
    if (telaReiniciar.classList.contains('visivel')) { // Fecha a tela-reiniciar
        telaReiniciar.classList.remove('visivel');
        telaReiniciar.classList.add('invisivel');
    } else if (telaReiniciar.classList.contains('invisivel')) { // Abre a tela-reiniciar
        telaReiniciar.classList.remove('invisivel');
        telaReiniciar.classList.add('visivel');
        pPontuacao.innerHTML = '&rarr; '+pontosJogador;
        hHighscore.innerHTML = 'Highscore: '+localStorage.getItem('highscore');
        iniciarJogo();
    }
}