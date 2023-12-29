import { 
    htmlJeopardyQuestions, 
    cssJeopardyQuestions, 
    jsJeopardyQuestions 
} from "./jeopardyQuestions.js"


const htmlBtn = document.getElementById("html")
const cssBtn = document.getElementById("css")
const jsBtn = document.getElementById("js")
const cardContainer = document.getElementById("card-container")
const main = document.querySelector("main")

htmlBtn.addEventListener("click", () => renderCards(htmlJeopardyQuestions))
cssBtn.addEventListener("click", () => renderCards(cssJeopardyQuestions))
jsBtn.addEventListener("click", () => renderCards(jsJeopardyQuestions))

function renderCards(questions) {
    cardContainer.innerHTML = ""
    questions.forEach(({clue, correctResponse}) => {
        const card = document.createElement("div")
        card.classList.add("card")
        
        const cardFront = document.createElement("div")
        cardFront.classList.add("card-front")
        
        const clueEl = document.createElement("h2")
        clueEl.textContent = clue
        
        const cardBack = document.createElement("div") 
        cardBack.classList.add("card-back")
        
        const correctResponseEl = document.createElement("h2")
        correctResponseEl.textContent = correctResponse
        
        card.appendChild(cardFront)
        card.appendChild(cardBack)
        cardFront.appendChild(clueEl)
        cardBack.appendChild(correctResponseEl)
        cardContainer.appendChild(card)
    })
    
    main.style.display = "block"
    main.scrollIntoView()
}