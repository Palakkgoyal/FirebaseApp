import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue,
         remove }
         from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-52096-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const shoppingList = document.getElementById("shopping-list");

onValue(shoppingListInDB, (snapshot) => {
    if(snapshot.exists()){
        console.log(snapshot.exists())
        const itemsArray = Object.entries(snapshot.val());
    
        clearShoppingList()
    
        for(let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
    
            appendItemToShoppingList(currentItem)
        }
    }
    else{
        shoppingList.textContent = "No items here... yet"
    }
})

function clearShoppingList(){
    shoppingList.textContent = ""
}

addButton.addEventListener('click', (e) => {
    e.preventDefault()
    let inputValue = inputField.value

    push(shoppingListInDB, inputValue)
    clearInputValue()
})


function appendItemToShoppingList(currentItem) {
    const itemId = currentItem[0]
    const itemValue = currentItem[1]
    const exactLocationOfItemInDB = ref(database, `shoppingList/${itemId}`)

    const li = document.createElement('li');
    li.textContent = itemValue;
    shoppingList.appendChild(li)

    li.addEventListener("click", () => {
        remove(exactLocationOfItemInDB)
    })
}

function clearInputValue() {
    inputField.value = ""
}