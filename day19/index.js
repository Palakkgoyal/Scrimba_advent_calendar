import { christmasWords } from './data.js'
import JSConfetti from 'js-confetti'
const wordDisplay = document.getElementById('word-display')
const statsPopup = document.getElementById("stats-popup")
const playAgainBtn = document.getElementById("play-again")
const closeInstructionsBtn = document.getElementById("close-btn")
const openInstructionsBtn = document.getElementById("open-instructions-btn")
const instructionsContainer = document.getElementById("how-to-play")
let noOfGuess = 0
let isGameEnd = false;
const gameData = {
    matches : 0,
    wins: 0,
    lose: 0
}
let wordArr = []

document.addEventListener('submit', handleGuess)
playAgainBtn.addEventListener('click', restartGame)
closeInstructionsBtn.addEventListener("click", () => instructionsContainer.style.display = "none")
openInstructionsBtn.addEventListener("click", () => instructionsContainer.style.display = "block")

function restartGame() {
    noOfGuess = 0
    isGameEnd = false
    renderSpaces()
    getWord()
    statsPopup.style.display = "none"
}


function getWord() {
    const randIdx = Math.floor(Math.random() * christmasWords.length)
    const word = christmasWords[randIdx]
    wordArr = word.toUpperCase().split('')
}
getWord()

function renderSpaces() {
    const wordHtml = wordArr.map(() => {
        return `<span class="letter">-</span>`
    })
    wordDisplay.innerHTML = `<div>${wordHtml.join('')}</div>`
}
renderSpaces()

function renderGuess(arr) {
    const div = document.createElement("div")
    const wordHtml = arr.map(([letter, condition]) => {
        const span = document.createElement("span")
        span.classList.add("letter")
        
        span.classList.add(condition === "correct" ? "green" :
        condition === "included" ? "orange" : "grey")
        
        span.textContent = letter
        div.appendChild(span)
    })
    noOfGuess === 1 && (wordDisplay.innerHTML = "")
    wordDisplay.appendChild(div)
}

function handleGuess(e) {
    e.preventDefault()
    if(isGameEnd) return
    
    let currentState = []
    let input = document.getElementById('user-input')
    let guess = input.value.toUpperCase()
    const guessArr = guess.split('')
    wordArr.forEach((letter, idx) => {
        let guessChar = guessArr[idx]
        if (letter === guessChar) {
            currentState.push([guessChar, "correct"])
        } else if(wordArr.includes(guessChar)) {
            currentState.push([guessChar, "included"]) 
        } else {
            currentState.push([guessChar, "wrong"])
        }
    })
    
    if(noOfGuess <= 5) {
        noOfGuess++
        renderGuess(currentState)
        checkWin(guess)
        input.value = ''
    }
}

function checkWin(guess) {
    const word = wordArr.join("")
    if (word === guess) {
        const jsConfetti = new JSConfetti()
        jsConfetti.addConfetti({
            emojis: ['🧑‍🎄', '🎅'],
            emojiSize: 50,
            confettiNumber: 60,
            confettiRadius: 6,
        })
        jsConfetti.addConfetti()
        isGameEnd = true
        renderStats(true)
    } else if (noOfGuess === 6) {
        renderStats(false)
    }

}

function renderStats(win) {
    gameData.matches++
    win ? gameData.wins++ : gameData.lose++
    
    document.getElementById("total-matches").textContent = gameData.matches
    document.getElementById("wins").textContent = gameData.wins
    document.getElementById("lose").textContent = gameData.lose
    document.getElementById("guess-word").textContent = wordArr.join("")
    
    statsPopup.style.display = "block"
}