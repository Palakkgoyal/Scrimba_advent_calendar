const elf = document.getElementById("elf")
const btn = document.getElementById("btn")
const elfHangoutZone = document.getElementById("elf-hangout-zone")
const serveBtn = document.getElementById("serve-tea")
const teaMainContainer = document.getElementById("tea-main-container")

btn.addEventListener("click", duplicateElf)
serveBtn.addEventListener("click", showTeaPopup)

function duplicateElf(){
    document.querySelector("h1").textContent = "Happy Elf :)"
    const duplicateCount = (elf.textContent.split("🧝").length - 1) * 2
    const elfsCount = duplicateCount <= 100 ? duplicateCount : 100
    const elfs = "🧝".repeat(elfsCount)
    elf.textContent = elfs
}

function showTeaPopup() {
    teaMainContainer.style.display = "block"
    
    setTimeout(() => {
        teaMainContainer.style.display = "none"
    }, 5000)
}