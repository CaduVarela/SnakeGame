function iniciarGrade() {
    //document.getElementById('tela-jogo').style = 'background-color: red;';
    let tela = document.getElementById('tela-jogo');
    let tamanhoGrade = 31;

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

function testarMobile() {
    if (screen.width <= 720) {
        document.location = '../bleble.html';
    }
}