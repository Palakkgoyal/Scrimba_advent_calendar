const form = document.querySelector("form")
const nameInput = document.getElementById("name-input")
const isNaughtyEl = document.getElementById("is-naughty")
const allPeople = document.getElementById("all-people")

const niceList = document.getElementById("nice-list")
const naughtyList = document.getElementById("naughty-list")
const btn = document.getElementById("btn")
const popup = document.getElementById("popup")
const crossBtn = document.getElementById("cross-btn")
const swapBtn = document.getElementById("swap-person")
const deleteBtn = document.getElementById("delete-person")

let person = 0
crossBtn.addEventListener("click", () => {popup.style.display = "none"})
deleteBtn.addEventListener("click", deletePerson)
swapBtn.addEventListener("click", swapPerson)

const sorteesArr = [
    {
        name: "David",
        hasBeenGood: false
    },
    {
        name: "Del",
        hasBeenGood: true
    },
    {
        name: "Valerie",
        hasBeenGood: false
    },
    {
        name: "Astrid",
        hasBeenGood: true
    }
]

btn.addEventListener("click",() => sortPeople(sorteesArr))
form.addEventListener("submit", addName)

function addName(e) {
    e.preventDefault()
    const name = nameInput.value
    const isNaughty = !isNaughtyEl.checked
    sorteesArr.push({name: name, hasBeenGood: isNaughty})
    renderAllList()
    form.reset()
}

function sortPeople(arr) {
    niceList.innerHTML = ""
    naughtyList.innerHTML = ""

    arr.forEach((person, idx) => {
        const li = document.createElement("li")
        const button = document.createElement("button")
        button.textContent = person.name
        button.addEventListener("click", () => {showPopup(idx)})
        li.appendChild(button)
        li.classList.add("person-name")
        
        person.hasBeenGood ? niceList.appendChild(li) : naughtyList.appendChild(li)
    })
}
sortPeople(sorteesArr)

function showPopup(idx) {
    popup.style.display = "block"
    document.getElementById("popup-name").textContent = sorteesArr[idx].name
    person = idx
}

function deletePerson() {
    sorteesArr.splice(person, 1)
    popup.style.display = "none"
    sortPeople(sorteesArr)
}

function swapPerson() {
    sorteesArr[person].hasBeenGood = !sorteesArr[person].hasBeenGood
    sortPeople(sorteesArr)
    popup.style.display = "none"
}

function renderAllList() {
    let text = ""
    sorteesArr.forEach((person, idx) => {
        text += person.name + (idx !== sorteesArr.length - 1? ", " : ".")
    })
    
    allPeople.textContent = text
}

renderAllList()