const searchField = document.getElementById("search-field")
const form = document.querySelector("form")
const dataContainer = document.getElementById("data-container")

form.addEventListener("submit", handleSubmit)

async function handleSubmit(e) {
    e.preventDefault()
    const word = searchField.value.trim()
    try {
        const data = await getWordInfo(word)
        if(data) {
            renderData(data)
        }
    } catch(err) {
        console.error(err)
    }
    
}

async function getWordInfo(word) {
    let data;
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        if (res.ok) {
            data = await res.json()
        } else {
            throw Error(`There was an error finding: ${word}`)
        }
    } catch(err) {
        alert(err)
    }
    
    return data
}

function renderData(data) {
    dataContainer.style.display = "block"
    form.reset()
    const { word, phonetic, phonetics, meanings } = data[0]
    const audioContainer = document.getElementById("audio-container")
    
    document.getElementById("title").textContent = word
    document.getElementById("pronounciation").textContent = phonetic
    document.getElementById("google-link").setAttribute("href", `https://www.google.com/search?q=${word}`)
    
    audioContainer.innerHTML = `
    <audio controls>
        <source id="audio-src" src= "${phonetics[0].audio}" type="audio/mp3">
        Your browser does not support the audio tag.
    </audio>`
    
    meanings.map(({partOfSpeech, definitions}) => {
        const len = definitions.length <= 2 ? definitions.length : 2
        for (let i = 0; i < len; i++) {
            const curr = definitions[i]
            const hasAntonyms = curr.antonyms.length > 0
            const hasSynonyms = curr.synonyms.length > 0
            
            const card = `
                <div class="sub-container">
                    <h3>${partOfSpeech}</h3>
                    <p class="info"><span>Definition: </span>${definitions[i].definition}</p>
                    ${hasSynonyms? `<p class="info"><span>Synonyms: </span> ${curr.synonyms.join(", ")}</p>` : ""}
                    ${hasAntonyms? `<p class="info"><span>Antonyms: </span> ${curr.antonyms.join(", ")}</p>` : ""}
                </div>
            `
            dataContainer.innerHTML += card
        }
    })
    window.scrollTo({top: dataContainer.offsetTop, behavior: "smooth"})
}