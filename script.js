"use strict";

const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault(); //отмена стандартного поведения(тут конкретно отмена обновления страницы)
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    //далее приём называется делегирование событий
    if(event.target.classList.contains('time-btn')) {
        time = +event.target.getAttribute('data-time');
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if(time === 0) {
        finishGame();
    } else { 
        let current = --time;
        if(current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    //убираем текст и таймер
    timeEl.parentNode.classList.add('hide');
    //вывод счёта
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const background = getRandomColor();
    circle.classList.add('circle'); 
    circle.style.background = background;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    //доска 500 на 500 размером
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//набор градиентов
const gradient = [
    'linear-gradient(90deg, #ed0984 0%, #ff8530 47%, #d4ed3d 100%)',
    'linear-gradient(90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%)',
    'linear-gradient(90deg, #588bb0 0%, #00d4b6 47%, #fcf837 100%)',
    'linear-gradient(90deg, #d13881 0%, #ed8f6b 47%, #e8dca4 100%)',
    'linear-gradient(90deg, #278a79 0%, #19b37d 47%, #52da6b 100%)',
    'linear-gradient(90deg, #e70f5e 0%, #b35ac3 47%, #148ae3 100%)',
    'linear-gradient(90deg, #1a3f69 0%, #5076a1 47%, #1a3f69 100%)',
    'linear-gradient(90deg, #a8ff75 0%, #87ff42 47%, #5eff00 100%)',
];

function getRandomColor() {
    return gradient[Math.floor(Math.random() * gradient.length)];
}