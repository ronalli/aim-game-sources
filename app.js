const startBtn = document.querySelector('#start-btn');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeOnBoard = document.querySelector('#time');
const gameBoard = document.querySelector('#board');
const finishGameBoard = document.querySelector('#finish-game')
const resetGame = document.querySelector('#reset-game');
const countGame = document.querySelector('#count-game');
const btnRestart = document.querySelector('#btn-restart')


let checkGame = 0;
let timeGame = 0;
let timeInterval;

startBtn.addEventListener('click', (e) => {
	e.preventDefault();
	screens[0].classList.add('up');
})

timeList.addEventListener('click', (e) => {
	if (e.target.classList.contains('time-btn')) {
		timeGame = parseInt(e.target.getAttribute('data-time'));
		screens[1].classList.add('up');
		startGame();
	}
})

gameBoard.addEventListener('click', (e) => {
	if (e.target.classList.contains('circle')) {
		checkGame++;
		e.target.remove();
		createRandomCircle();
	}
})

function startGame() {
	timeInterval = setInterval(decreaseTime, 1000);
	setTime(timeGame);
	createRandomCircle();
}

function decreaseTime() {
	let current = --timeGame;
	if (current === 0) {
		finishGame()
	}
	if (current < 10) {
		current = `0${current}`
	}
	setTime(current)
}

function createRandomCircle() {
	const circle = document.createElement('div');
	let sizeCircle = getRandomNumber(15, 60);
	let color = `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)})`;
	const { height, width } = gameBoard.getBoundingClientRect();
	let x = getRandomNumber(1, height - sizeCircle);
	let y = getRandomNumber(1, width - sizeCircle);
	circle.classList.add('circle');
	circle.style.background = color;
	circle.style.boxShadow = `0 0 2px ${color}, 0 0 5px ${color}`
	circle.style.height = `${sizeCircle}px`;
	circle.style.width = `${sizeCircle}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	gameBoard.append(circle);
}

function setTime(value) {
	timeOnBoard.innerHTML = `00:${value}`;
}

function getRandomNumber(min, max) {
	return Math.floor(min + Math.random() * (max + 1 - min))
}

function finishGame() {
	screens[2].classList.add('up');
	countGame.innerHTML = `<h1>Счет: <span class="primary">${checkGame}</span></h1>`
	clearInterval(timeInterval)
}

btnRestart.addEventListener('click', () => {
	for (let screen of screens) {
		screen.classList.remove('up');
	}
	checkGame = 0;
	screens[0].classList.add('up');
	gameBoard.innerHTML = '';
})
