const form = document.querySelector("form")
const nameEl = document.getElementById("name")
const descEl = document.getElementById("desc")
const linkEl = document.getElementById("link")
const wishlistContainerEl = document.getElementById("wishlist-container")

const wishesArr = []

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const wishObj = {
        name: nameEl.value,
        desc: descEl.value,
        link: linkEl.value
    }
    
    wishesArr.push(wishObj)
    form.reset()
    renderWishes(wishesArr)
    wishlistContainerEl.scrollIntoView()
})

function renderWishes(wishes) {
    wishlistContainerEl.innerHTML = ""
    
    wishes.forEach((wish, idx) => {
        const div = document.createElement("div")
        div.classList.add("wish-container")
        div.classList.add("glassmorphism-effect")
        
        const h3 = document.createElement("h3")
        h3.textContent = wish.name
        div.appendChild(h3)
        
        const p = document.createElement("p")
        p.textContent = wish.desc
        div.appendChild(p)
        
        const a = document.createElement("a")
        a.textContent = wish.link
        a.setAttribute("href", wish.link)
        a.setAttribute("target", "_blank")
        div.appendChild(a)
        
        const btn = document.createElement("button")
        btn.addEventListener("click", () => deleteWish(idx))
        div.appendChild(btn)
        
        const img = document.createElement("img")
        img.setAttribute("src", "delete.png")
        img.setAttribute("alt", "red outlined dustbin/delete icon")
        btn.appendChild(img)
        
        wishlistContainerEl.appendChild(div)
    })

}

function deleteWish(idx) {
    wishesArr.splice(idx, 1)
    renderWishes(wishesArr)
}