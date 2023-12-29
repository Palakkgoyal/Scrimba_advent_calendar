const form = document.querySelector("form")
const kidsEl = document.getElementById("kids")
const candiesEl = document.getElementById("candies")
const modal = document.getElementById("modal")
const closeModalBtn = document.getElementById("close-modal")
const totalCandyEl = document.getElementById("total-candy")

form.addEventListener("submit", renderModal)


function renderModal(e) {
    e.preventDefault()
    totalCandyEl.textContent = calcTotalCandies(kidsEl.value, candiesEl.value)
    modal.style.display = "block"
}

function calcTotalCandies(children, candy) {
    return candy - (candy % children)
}

closeModalBtn.addEventListener("click", () => {
    form.reset()
    modal.style.display = "none"
})

async function getBg() {
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=candy")
    const data = await res.json()
    document.querySelector("body").style.backgroundImage = `url(${data.urls.regular})`
}

getBg()