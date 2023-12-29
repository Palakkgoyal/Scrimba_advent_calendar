const redLights = document.querySelectorAll(".red")
const blueLights = document.querySelectorAll(".blue")

setInterval(() => {
    redLights.forEach(light => light.classList.remove("lights-on")) 
    blueLights.forEach(light => light.classList.add("lights-on")) 
}, 800)

setInterval(() => {
   redLights.forEach(light => light.classList.add("lights-on")) 
   blueLights.forEach(light => light.classList.remove("lights-on")) 
}, 1600)

