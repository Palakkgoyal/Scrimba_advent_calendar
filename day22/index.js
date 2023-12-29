import app from "./firebase.js"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore, collection, addDoc, query, where, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"

const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app);
let currUser, 
    peopleListEl, 
    form,
    firstTimeAdding = true,
    totalCost = 0

const btn = document.getElementById("auth-btn")
btn.addEventListener("click", signIn)

onAuthStateChanged(auth, (user) => {
  if (user) {
    currUser = user
    renderApp()
    renderList()
  }
});

function renderApp() {
    document.querySelector("body").innerHTML = `
        <div class="container">
            <button id="logout">LogOut</button>
            <img src="icon.png" id="img">
            <h1>Jolly Gift Log</h1>
            <h4 id="total"></h4>
            <form>
                <div class="input-fields">
                    <input type="text" id="name-field" placeholder="Gift taker name" required minlength="2" maxlength="100">
                    <input type="text" id="gift-field" placeholder="What is the gift?" required>
                    <input type="number" id="cost-field" placeholder="Amount of gift" min="0" max="100000" required>
                </div>
                <button id="add-button">Add →</button>
            </form>
            <ul id="people-list"></ul>
        </div>`
        
    const nameFieldEl = document.getElementById("name-field")
    const giftFieldEl = document.getElementById("gift-field")
    const costFieldEl = document.getElementById("cost-field")
    form = document.querySelector("form")
    
    peopleListEl = document.getElementById("people-list")
    document.getElementById("logout").addEventListener("click", signOutFn)
    
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        addPerson(nameFieldEl.value, giftFieldEl.value, costFieldEl.value)
    })
}


function signIn() {
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`${errorCode}: ${errorMessage}`)
    });
}

async function signOutFn() {
    await signOut(auth)
        .catch(err => {
            alert(err)
            return
        })
    location.reload()
}

async function addPerson(name, gift, cost) {
    if (!currUser) return
    let data = {
        uid: currUser.uid,
        name: name,
        gift: gift,
        cost: cost
    }
    
    const giftList = collection(db, 'giftList');
    await addDoc(giftList, data);
    totalCost += Number(cost)
    form.reset()
    renderList()
    window.scrollTo({ top: peopleListEl.offsetTop, behavior: 'smooth'})
}

async function renderList() {    
    const giftRef = collection(db, "giftList")
    const q = query(giftRef, where("uid", "==", currUser.uid))
    
    const querySnapshot = await getDocs(q);
    clearPeopleListEl()
    
    querySnapshot.forEach((doc) => {
        const data = doc.data()
        if(firstTimeAdding){
            totalCost += Number(data.cost)
        }
        appendPersonToPeopleListEl(doc.id, data)
    });
    
    firstTimeAdding = false
    
    document.getElementById("total").textContent = totalCost + " 💰"
}


function clearPeopleListEl() { 
    peopleListEl.innerHTML = ""
}

function appendPersonToPeopleListEl(id, {name, gift, cost}) {
    const li = document.createElement("li")
    
    const h3 = document.createElement("h3")
    h3.textContent = name
    li.appendChild(h3)
    
    const p = document.createElement("p")
    p.textContent = `${gift} ~~ ${cost} 💰`
    li.appendChild(p)
    
    const a = document.createElement("a")
    a.setAttribute("href", `https://amazon.in/s?k=${gift}`)
    a.textContent = "buy on amazon"
    li.appendChild(a)
    
    li.addEventListener("dblclick", async function() {
        try {
            totalCost -= cost
            const docRef = doc(db, "giftList", id);
            await deleteDoc(docRef)
            renderList()
            showGif()
        } catch (err) {
            alert(err)
        }
    })
    
    peopleListEl.prepend(li)
}

function showGif() {
    const img = document.getElementById("img")
    img.setAttribute("src", "gifts.gif")
    window.scrollTo({ top: 0, behavior: 'smooth'});
    
    setTimeout(() => {
       img.setAttribute("src", "icon.png")
    }, 5000)
}