import { calendarContent } from "./data.js"

const todayDateEl = document.getElementById("today-date")
const todayTaskEl = document.getElementById("today-task")
const datesContainerEl = document.getElementById("dates-container")
const popupEl = document.getElementById("popup")

const date = new Date()
const day = date.getDate()
const month = date.toLocaleString('default', { month: 'long' })


function setTodayDate() {
    todayDateEl.textContent = `${month} ${day}`
    
    if(day <= 25 && month === "December"){
        todayTaskEl.textContent = calendarContent[day-1]
    }
    
    renderDates()
}

setTodayDate()


function renderDates() {
    const christmasDate = 25
    for(let i = 1; i <= christmasDate; i++) {
        const btn = document.createElement("button")
        btn.classList.add("date")
        if(day === i && month === "December"){
            btn.classList.add("today")
        }
        btn.textContent = i
        datesContainerEl.appendChild(btn)
        
        btn.addEventListener("click", () => showPopup(i-1))
    }
}

function showPopup(idx) {
    popupEl.style.display = "flex"
    document.getElementById("popup-date").textContent = idx + 1
    document.getElementById("popup-task").textContent = calendarContent[idx]
}

document.getElementById("cross-btn").addEventListener("click", () => popupEl.style.display = "none")