import { HfInference } from '@huggingface/inference'

const dialogModal = document.getElementById('dialog-modal')
const form = document.querySelector("form")
const userInput = document.getElementById("user-input")
const img = document.getElementById("img")
const loader = document.getElementById("loader")

const hf = new HfInference(import.meta.env.HUGGING_FACE_API_KEY)

form.addEventListener("submit", getImage)

async function getImage(e) {
    e.preventDefault()
    const prompt = userInput.value
    
    dialogModal.style.display = "none"
    loader.style.display = "block"
    
    let url;
    
    try {
        const blob = await hf.textToImage({
        inputs: prompt,
        model: "stabilityai/stable-diffusion-2",
        parameters: {
        negative_prompt: "blurry",
        },
      })
      
      url = URL.createObjectURL(blob)
    }
    catch(error) {
        console.log(error)
        url = "https://assets.aboutamazon.com/dims4/default/09f5aa9/2147483647/strip/true/crop/1999x1125+1+0/resize/1320x743!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2Fea%2Fcb%2F7ae35c6342a9813ad08a8a3acd81%2Fsanta-hero-2000x1125.jpg"
    }
    finally {
        loader.style.display = "none"
    }
    
    img.setAttribute("src", url)
}

/** show dialog on load **/
dialogModal.show()
