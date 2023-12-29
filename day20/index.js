const dangerArray = [
    ["🎅", "👺"],
    [
        ["🎅", "🦁"],
        ["👹", "🎅"]
    ],
    [
        [
            ["🎅", "🐻"],
            ["🧌", "🎅"]
        ],
        [
            ["🐯", "🎅"],
            ["🎅", "😈"]
        ]
    ]
]

console.log(saveSanta(dangerArray, "🎅", false))

const arrayEl = document.getElementById("array")
const elementEl = document.getElementById("element")
const todo = document.getElementById("to-do")
const datatype = document.getElementById("datatype")
const form = document.querySelector("form")

form.addEventListener("submit", handleSubmit)

async function handleSubmit(e) {
    e.preventDefault()
    let array = arrayEl.value
    const el = elementEl.value
    const remove = todo.value === "remove" 

    try {
        array = await JSON.parse(array)
    } catch(err) {
        array=[]
        console.error(err)
        alert("❌ Please enter a valid Array ❌")
    }
    
    const formatted = saveSanta(array, el, remove)
    document.getElementById("solution").textContent = await JSON.stringify(formatted)
    const solContainer = document.getElementById("sol-container")
    solContainer.style.display = "block"
    window.scrollTo({top: solContainer.offsetTop, behavior: "smooth"})
}

function saveSanta(arr=[], el="", remove) {
    arr.forEach((item, idx) =>  {
        const isArray = Array.isArray(item)
        if(isArray) {
            saveSanta(item, el, remove)
        } else if (remove && item === el) {
            arr.splice(idx, 1)
        } else if (!remove && item !== el) {
            arr.splice(idx, 1)
        }
    })
    
    return arr
}