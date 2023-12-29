const people = ["Alice", "Bob", "Carly", "Dan", "Ed", "Ferdinand", "Ginny"]
const form1El = document.getElementById("form1")
const form2El = document.getElementById("form2")
const namesContainer = document.getElementById("names-container")
const secretSantaContainer = document.getElementById("secret-santa-container")

form1El.addEventListener("submit", (e) => {
    e.preventDefault()
    const noOfPersons = document.getElementById("no-of-person").value
    form1El.style.display = "none"
    form2El.style.display = "block"
    
    renderInputs(noOfPersons)
})

function renderInputs(personCount) {
    for (let i = 0; i < personCount; i++) {
        const input = document.createElement("input")
        input.setAttribute("type", "text")
        input.setAttribute("required", true)
        input.setAttribute("maxLength", 50)
        input.setAttribute("placeholder", `Santa ${i+1}`)
        input.classList.add("input-name")
        namesContainer.appendChild(input)        
    }
}

form2El.addEventListener("submit", renderSecretSantas)

function renderSecretSantas(e) {
    e.preventDefault()
    const namesArray = getNamesArray()
    const secretSantaObj = generateSecretSantaPairs(namesArray)
    const secretSantaArr = Object.entries(secretSantaObj)
    renderPairs(secretSantaArr)
}

function getNamesArray() {
    let namesArray = []
    const inputs = document.getElementsByClassName("input-name")
    for(let i = 0; i < inputs.length; i++) {
         const name = inputs[i].value
         namesArray.push(name)
    }
    
    return namesArray
}

function generateSecretSantaPairs(participants) {
  shuffleArray(participants)

  const pairings = {}
  const len = participants.length

  for (let i = 0; i < len; i++) {
    const currentParticipant = participants[i]
    const nextParticipant = (i === len - 1) ? participants[0] : participants[i + 1]
    pairings[currentParticipant] = nextParticipant
  }

  return pairings
}


function shuffleArray(array) {
    const len = array.length
    for (let i = len - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp;
    }
}

function renderPairs(pairsArray) {
    form2El.style.display = "none"
    
    pairsArray.forEach(pair => {
        const div = document.createElement("div")
        
        const p1 = document.createElement("p")
        p1.textContent = pair[0]
        div.appendChild(p1)
        
        const p2 = document.createElement("p")
        p2.textContent = "<=>"
        div.appendChild(p2)
        
        const p3 = document.createElement("p")
        p3.textContent = pair[1]
        div.appendChild(p3)
        
        secretSantaContainer.appendChild(div)
    })
    
    secretSantaContainer.style.display = "flex"
}
