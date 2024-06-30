let todo = JSON.parse( localStorage.getItem("todo") ) || [];
const todoInput = document.getElementById( "todoInput" );
const todoList = document.getElementById( "todoList" );
const todoCount = document.getElementById( "todoCount" );
const addBtn = document.querySelector( ".btn" );
const deleteBtn = document.getElementById( "deleteButton" );

document.addEventListener( "DOMContentLoaded", function() {
    addBtn.addEventListener( "click", addTask );
    todoInput.addEventListener( "keydown", (e) => {
        if( e.key === "Enter" ) {
            e.preventDefault;
            addTask();
        }
    });
    deleteBtn.addEventListener( "click", deleteAllTasks );
    displayTask(); 
});

var addTask = () => {
    const newItem = todoInput.value.trim();
    if( newItem !== "" )
    {
        todo.push( { text: newItem, disabled: false } );
        saveToLocalStorage();
        todoInput.value = "";
        displayTask();
    }
}

var displayTask= () => {
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `<div class = "todo-container">
    <input type = "checkbox" class = "todo-checkbox" id = "input-${index}" ${item.disabled ? "checked" : "" }>
    <p id = "todo-${index}" class = "${item.disabled ? "disabled" : ""}" onclick = "editTask(${index})">${item.text}</p></div>`;
    p.querySelector(".todo-checkbox").addEventListener( "change", () => toggleTask(index));
    todoList.appendChild(p);
    });
    todoCount.textContent = todo.length;
}

var deleteAllTasks =()=> {
    todo = [];
    saveToLocalStorage();
    displayTask();
}

var toggleTask = ( index ) => {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTask();
}

var editTask = (index) => {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todoItem.innerText;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", ()=>{
        const updatedText = inputElement.value.trim();
        if(updatedText){
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTask();
    });
}

var saveToLocalStorage =()=> {
    localStorage.setItem( "todo", JSON.stringify(todo) );
}
