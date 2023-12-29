const daysEl = document.getElementById("days")
const hrsEl = document.getElementById("hours")
const minEl = document.getElementById("minutes")
const secEl = document.getElementById("seconds")

function renderCountdown(){
    const christmas = 24
    const date = new Date()
    const daysRemaining  = christmas - date.getDate()
    const hrsRemaining = 23 - date.getHours()
    const minRemaining = 59 - date.getMinutes()
    const secRemaining = 59 - date.getSeconds()
    
    if(daysRemaining === 0) {
        document.getElementById("container").innerHTML = `<p class="celeb-note">Merry Christmas 🎅</p>`
        return
    }

    
    daysEl.textContent = daysRemaining
    hrsEl.textContent = hrsRemaining
    minEl.textContent = minRemaining
    secEl.textContent = secRemaining
}

renderCountdown()
setInterval(renderCountdown, 1000)