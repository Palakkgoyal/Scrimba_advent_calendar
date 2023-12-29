const textarea = document.querySelector("textarea")

let typingTimer;                //timer identifier
const doneTypingInterval = 500;  //time in ms, 5 seconds for example

textarea.addEventListener("keyup", function() {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(renderSortedArr, doneTypingInterval);
})

textarea.addEventListener("keydown", function() {
  clearTimeout(typingTimer);
})

//user is "finished typing," do something
function renderSortedArr () {
  const itemsArr = textarea.value.split(",").map(el => el.trim())
  const sortedAZ = sortGifts(itemsArr)
  const sortedZA = reverseSorted(sortedAZ)
  
  document.getElementById("asc-ordered").textContent = sortedAZ.join(", ")
  document.getElementById("desc-ordered").textContent = sortedZA.join(", ")
}

// SORTED ARRAY USING NO ARRAY METHOD OTHER THAN FOREACH()
function sortGifts(giftsArr) {
    const sortedArr = [giftsArr[0]]
    
    giftsArr.forEach((gift, idx) => {
        if(idx === 0) return
        const giftCharCode = gift.charCodeAt(0)
        const sortedArrCharCode = sortedArr[sortedArr.length - 1].charCodeAt(0)
        
        let currIdx = sortedArr.length - 1    
            
        if(giftCharCode <= sortedArrCharCode) {
            // Loop to check all the other elements of sortedArr that might be bigger then the current element but placed before it
            let isAlreadyPushed = false
            while(currIdx >= 0)  {
                
                // Loop to check other characters if current element and sortedArr element have the same first character
                for(let i = 0; i < gift.length; i++) {
                    const currItem = sortedArr[currIdx]
                    if(currItem.charCodeAt(i) && gift.charCodeAt(i) < currItem.charCodeAt(i)){
                        const temp = sortedArr[currIdx]
                        sortedArr[currIdx] = gift
                        currIdx === sortedArr.length? sortedArr.push(temp) : sortedArr[currIdx + 1] = temp
                        isAlreadyPushed = true
                        break
                    }
                    else if(!isAlreadyPushed && i === gift.length - 1) {
                        sortedArr.push(gift)
                        break
                    }
                }
                
                currIdx--
                if(currIdx > -1 && giftCharCode > sortedArr[currIdx].charCodeAt(0)) break
            }
        } 
        else {
            sortedArr.push(gift)
        }
    })
    
    return sortedArr
}



function reverseSorted(arr) {
    const reversedArr = []
    
    for(let i = arr.length - 1; i >= 0; i--) {
        reversedArr.push(arr[i])
    }
    
    return reversedArr
}