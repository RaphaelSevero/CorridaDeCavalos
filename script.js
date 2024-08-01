let horses = [
    { id: 'horse1', position: 0 },
    { id: 'horse2', position: 0 },
    { id: 'horse3', position: 0 },
    { id: 'horse4', position: 0 }
];

let raceInterval;
let playerBet = 0;

function selectHorse(horseNumber) {
    playerBet = horseNumber;
    document.querySelectorAll('.bet-button').forEach(button => button.style.border = '1px solid black');
    document.getElementById('bet' + horseNumber).style.border = '5px solid black';
}

function startRace() {
    if (playerBet < 1 || playerBet > 4) {
        alert('Escolha um cavalo entre 1 e 4');
        return;
    }

    document.getElementById('message').innerText = 'Corrida em andamento...';
    resetPositions();

    raceInterval = setInterval(moveHorses, 100);
}

function moveHorses() {
    let raceOver = false;

    horses.forEach(horse => {
        let move = Math.floor(Math.random() * 3); // 0: no move, 1: move 1 step, 2: move 2 steps

        horse.position += move * 10; // Ajuste a velocidade do cavalo
        document.getElementById(horse.id).style.left = horse.position + 'px';

        if (horse.position >= (window.innerWidth - 50)) {
            raceOver = true;
            declareWinner(horse.id);
        }
    });

    if (raceOver) {
        clearInterval(raceInterval);
    }
}

function declareWinner(winningHorseId) {
    const winningHorseNumber = horses.findIndex(h => h.id === winningHorseId) + 1;
    let message = 'O cavalo ' + winningHorseNumber + ' venceu!';

    if (winningHorseNumber == playerBet) {
        message += ' Você escolheu o cavalo correto!';
    } else {
        message += ' Você escolheu o cavalo errado.';
    }

    document.getElementById('message').innerText = message;
}

function resetPositions() {
    horses.forEach(horse => {
        horse.position = 0;
        document.getElementById(horse.id).style.left = '0px';
    });
}

function resetGame() {
    clearInterval(raceInterval);
    resetPositions();
    document.getElementById('message').innerText = '';
    playerBet = 0;
    document.querySelectorAll('.bet-button').forEach(button => button.style.border = 'none');
}
