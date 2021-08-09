// Add a new todo (by submitting a form) - Event watching the submit:
// add li, checkbox (button), remove X button
// First grab all the items needed
const form = document.querySelector("#todo-form");
const list = document.querySelector("#todo-list");

// Event Listener on form, first test con.log:
function addingTodos(e) {
    e.preventDefault();

    // Prevent submition of form without value in input
    if (e.target.children[0].value === "") {
        e.target.setAttribute("disabled", true)
    } else {
        const li = document.createElement("li")
        const doneButton = document.createElement("input");    
        const removeButton = document.createElement("button");
        
        // Selecting I / O & adding text to elements
        const input = document.querySelector("input");
        li.innerText = input.value
        removeButton.innerText = "X";
        
        // Adding classes to later style
        doneButton.classList.add("checkbox")
        doneButton.setAttribute("type", "checkbox")
        removeButton.classList.add("X");
        
        // Append Everything:
        list.append(li);
        li.prepend(doneButton);
        li.append(removeButton);

        // Add to LOCALSTORAGE
        if (JSON.parse(localStorage.getItem("LocalTodos"))) {
            let localObj = JSON.parse(localStorage.getItem("LocalTodos"))
            // Add current TODO & resent to LS:
            localObj[e.target.children[0].value] = e.target.children[0].value;
            localStorage.setItem("LocalTodos", JSON.stringify(localObj));

        } else {
            // Create a object in LS
            let localObj = {};
            localObj[e.target.children[0].value] = e.target.children[0].value;
            localStorage.setItem("LocalTodos", JSON.stringify(localObj));
        }
        
        // Clear input
        input.value = "";
    }
}

form.addEventListener("submit", addingTodos);

// Mark a todo as completed (cross out the text of the todo) - watch a press
// of a button and cross it out. Added ablitiy to un-strike thru
function addStrikeThru(e) {
    if (e.target.classList.value === "checkbox" && e.target.checked === true) {
        e.target.parentElement.style.textDecoration = "line-through";
    } else if (e.target.checked === false) {
        e.target.parentElement.style.textDecoration = "";
    }
}

list.addEventListener("click", addStrikeThru);

// Remove a todo - event on x-button to remove. Remove button / event, li / event, button
list.addEventListener("click", function (e) {

    if (e.target.classList.value === "X") {

        // Remove from LS if in there:
        if (JSON.parse(localStorage.getItem("LocalTodos"))) {

            // Get LS, set to localObj, delete specifc todo, return to LS
            let localObj = JSON.parse(localStorage.getItem("LocalTodos"));

            // remove current TODO & resend to LS:
            let keyToDelete = e.target.parentElement.innerText.slice(0, -1)
            delete localObj[keyToDelete];

            // Update LS: 
            localStorage.setItem("LocalTodos", JSON.stringify(localObj));
        };

        // Remove checkbox event and button:
        e.target.previousElementSibling.removeEventListener("click", addStrikeThru);
        e.target.previousElementSibling.remove();
        // Remove li:
        e.target.parentElement.remove();
        // Remove XButton and event:
        e.target.removeEventListener("click", addingTodos);
        e.target.remove();
    }
})

// If refresh happens load from LocalStorage all the TODOs:
window.addEventListener("load", function(e){
    let localObj = JSON.parse(localStorage.getItem("LocalTodos"));

    // Redo the adding section but with a for loop over the object: Basically Read-only
    for (const eachTodo in localObj) {
        const li = document.createElement("li")
        const doneButton = document.createElement("input");    
        const removeButton = document.createElement("button");
        
        // Selecting I / O & adding text to elements
        const input = eachTodo;
        li.innerText = input
        removeButton.innerText = "X";
        
        // Adding classes to later style
        doneButton.classList.add("checkbox")
        doneButton.setAttribute("type", "checkbox")
        removeButton.classList.add("X");
        
        // Append Everything:
        list.append(li);
        li.prepend(doneButton);
        li.append(removeButton);
    }
})

