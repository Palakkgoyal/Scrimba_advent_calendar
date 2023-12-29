import { HfInference } from '@huggingface/inference'


const leftDoor = document.querySelector(".left-door")
const rightDoor = document.querySelector(".right-door")
const jokeDisplay = document.querySelector(".joke-display")
const jokeEl = document.getElementById("joke-display")
const openDoorBtn = document.getElementById("open-door")
const closeDoorBtn = document.getElementById("close-door")
const loaderContainer = document.getElementById("loader-container")


document.getElementById('window-container').addEventListener('click', openDoor)
closeDoorBtn.addEventListener("click", closeDoor)

async function openDoor() {
    await getJoke()
    leftDoor.style.animation = "left-open 0.3s forwards"
    rightDoor.style.animation = "right-open 0.3s forwards"
    jokeDisplay.style.animation = "display-joke 0.3s forwards"
}

function closeDoor(e) {
    e.stopPropagation()
    leftDoor.style.animation = "left-close 0.3s forwards"
    rightDoor.style.animation = "right-close 0.3s forwards"
    jokeDisplay.style.animation = "hide-joke 0.3s forwards"
}

async function getJoke() {
    openDoorBtn.style.display = "none"
    loaderContainer.style.display = "block"
    const hf = new HfInference(import.meta.env.VITE_HUGGING_FACE_API_KEY)

    const textToGenerate = "The one liner joke of the day is"

    const response = await hf.textGeneration({
    inputs: textToGenerate,
    model: "HuggingFaceH4/zephyr-7b-beta"
    })
    
    const joke = response.generated_text
    const jokeStartIdx = joke.indexOf(":") + 1
    const jokeEndIdx = joke.indexOf("!") + 1

    const formattedJoke = joke.substring(jokeStartIdx, jokeEndIdx)
    jokeEl.textContent = formattedJoke
    loaderContainer.style.display = "none"
    openDoorBtn.style.display = "block"
}