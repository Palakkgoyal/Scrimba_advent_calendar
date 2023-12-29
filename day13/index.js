import { 
    lessPeopleVegDishes, 
    lessPeopleNonVegDishes, 
    morePeopleVegDishes, 
    morePeopleNonVegDishes 
} from "./data.js"

console.log("running")
const form = document.querySelector("form")
const numInput = document.getElementById("num-input")
const foodEl = document.getElementById("food")
const regenBtn = document.getElementById("regen-btn")
const goToReciptBtn = document.getElementById("go-to-recipe-btn")
const scrollToDinnerPickerBtn = document.getElementById("scroll-to-dinner-picker")

let choices = []

form.addEventListener("submit", getMeal)
regenBtn.addEventListener("click", renderMealAndRecipe)
goToReciptBtn.addEventListener("click", () => scroll("recipe-container"))
scrollToDinnerPickerBtn.addEventListener("click", () => scroll("main"))

function getMeal(e) {
    e.preventDefault()
    const foodChoice = document.querySelector("input[name='food']:checked").value
    const noOfPeople = numInput.value
    
    createChoicesArr(noOfPeople, foodChoice)
    renderMealAndRecipe()
    regenBtn.style.display = "flex"
    goToReciptBtn.style.display = "block"
    document.getElementById("recipe-container").style.display = "flex"
}

function renderMealAndRecipe() {
    const randIdx = Math.floor(Math.random() * choices.length)
    const food = choices[randIdx]
    foodEl.textContent = food.name
    
    document.getElementById("dish-img").setAttribute("src", food.img)
    document.getElementById("dish-title").textContent = food.name
    
    const dishIngredientsEl = document.getElementById("dish-ingredients")
    const dishInstructionsEl = document.getElementById("dish-instructions")
    
    appendLi(dishIngredientsEl, food.ingredients)
    appendLi(dishInstructionsEl, food.instructions)
}

function scroll(id) {
    const scrollSection = document.getElementById(id).offsetTop;
    window.scrollTo({ top: scrollSection, behavior: 'smooth'});
}

function appendLi(parent, array) {
    for(let i = 0; i < array.length; i++) {
        const li = document.createElement("li")
        li.textContent = array[i]
        parent.appendChild(li)
    }
}

function createChoicesArr(noOfPeople, foodChoice) {
    if(foodChoice === "veg") {
        choices = noOfPeople >= 5 ? [...morePeopleVegDishes] : [...lessPeopleVegDishes]
    }
    else if (foodChoice === "non-veg") {
        choices = noOfPeople >= 5? [...morePeopleNonVegDishes] : [...lessPeopleNonVegDishes]
    }
    else {
        choices = noOfPeople >= 5? [...morePeopleNonVegDishes, ...morePeopleVegDishes] : [...lessPeopleNonVegDishes, ...lessPeopleVegDishes]
    }
}

