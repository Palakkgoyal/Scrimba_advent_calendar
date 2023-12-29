import { HfInference } from '@huggingface/inference'
const hf = new HfInference(import.meta.env.VITE_HUGGING_FACE_API_KEY)
import { blobToBase64 } from './utils'

const loader = document.getElementById("loader")
const dialogModal = document.getElementById('dialog-modal')
dialogModal.show()

document.addEventListener('submit', function(e) {
    e.preventDefault()
    const imageDescription = document.getElementById('user-input').value
    dialogModal.close()
    generateImage(imageDescription)
})

async function generateImage(imageToGenerate) {
    loader.style.display = "block"
    let imageUrl
    
    try {
        const response = await hf.textToImage({
            inputs: imageToGenerate,
            model: "stabilityai/stable-diffusion-2",
            parameters: {
                negative_prompt: "ugly, deformed, disfigured, poor details, bad anatomy, nude, bad, sexual",
            },
        })
        imageUrl = await blobToBase64(response)
    } catch(err) {
        console.error(err)
        imageUrl = "https://cdn.hswstatic.com/gif/santa-claus-orig.jpg"
    } finally {
        generateAltText(imageUrl)
    }
}

async function generateAltText(imageUrl) {
    let altText
    
    try {
        const response = await hf.imageToText({
        data: await (await fetch(imageUrl)).blob(),
        model: "Salesforce/blip-image-captioning-base",
     });
        altText = response.generated_text   
    } catch(err) {
        console.error(err)
        altText = "Santa Claus with specs and a faded christmas tree behind"
    } finally {
        renderImage(imageUrl, altText)
    }
}

function renderImage(imageUrl, altText) {
    loader.style.display = "none"
    console.log(altText)
    const imageContainer = document.getElementById('image-container')
    imageContainer.innerHTML = ''
    const image = document.createElement('img')
    image.src = imageUrl
    image.alt = altText
    image.classList.add("img")
    imageContainer.appendChild(image)
}

async function generateWish() {
    let wish = ""
    
    try {
        const response = await hf.textGeneration({
            model: 'gpt2',
            inputs: 'Merry christmas and May you'
        })
        const text = response.generated_text.substring(20)
        const startIdx = text.indexOf("May you")
        const endIdx = text.indexOf(".")
        wish = text.substring(startIdx, endIdx)
    } catch(err) {
        console.error(err)
        wish = "And all the best for 2024"
    } finally {
        document.getElementById("wish").textContent = wish 
    }
}

generateWish()