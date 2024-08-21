const inputBox = document.querySelector("#inputBox");
const addBtn = document.querySelector("#addBtn");
const toDoList = document.querySelector(".toDoList");

let editTodo = null;

// Function to add or edit a todo
const addToDo = () => {
        const inputText = inputBox.value.trim();
        if (inputText.length <= 0) {
                alert("You must write something in your to-do");
                return false;
        }

        if (addBtn.value === "Edit") {
                // Edit existing to-do
                editLocalToDos(editTodo.target.previousElementSibling.innerHTML);
                editTodo.target.previousElementSibling.innerHTML = inputText;
                addBtn.value = "Add";  // Switch button back to "Add"
                addBtn.innerHTML = "Add"; // Update displayed text to "Add"
                inputBox.value = "";
        } else {
                // Add new to-do
                const li = document.createElement("li");
                const p = document.createElement("p");
                p.innerHTML = inputText;
                li.appendChild(p);

                // Creating Edit Btn
                const editBtn = document.createElement("button");
                editBtn.innerText = "Edit";
                editBtn.classList.add("erBtn", "editBtn");
                li.appendChild(editBtn);

                // Creating Delete Btn
                const deleteBtn = document.createElement("button");
                deleteBtn.innerText = "Remove";
                deleteBtn.classList.add("erBtn", "deleteBtn");
                li.appendChild(deleteBtn);

                toDoList.appendChild(li);
                inputBox.value = "";

                saveLocalToDos(inputText);
        }
}

// Function to update (Edit/Delete) todo
const updateToDo = (e) => {
        if (e.target.innerHTML === "Remove") {
                toDoList.removeChild(e.target.parentElement);
                deleteLocalToDos(e.target.parentElement);
        }

        if (e.target.innerHTML === "Edit") {
                inputBox.value = e.target.previousElementSibling.innerHTML;
                inputBox.focus();
                addBtn.value = "Edit";  // Set button to "Edit" mode
                addBtn.innerHTML = "Edit"; // Update displayed text to "Edit"
                editTodo = e;
        }
}

// Function to save local todo
const saveLocalToDos = (todo) => {
        let todos;
        if (localStorage.getItem("todos") === null) {
                todos = [];
        } else {
                todos = JSON.parse(localStorage.getItem("todos"));
        }
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to get local todo
const getLocalToDos = () => {
        let todos;
        if (localStorage.getItem("todos") === null) {
                todos = [];
        } else {
                todos = JSON.parse(localStorage.getItem("todos"));
                todos.forEach(todo => {

                        // Create p tag
                        const li = document.createElement("li");
                        const p = document.createElement("p");
                        p.innerHTML = todo;
                        li.appendChild(p);

                        // Create Edit Btn
                        const editBtn = document.createElement("button");
                        editBtn.innerText = "Edit";
                        editBtn.classList.add("erBtn", "editBtn");
                        li.appendChild(editBtn);

                        // Create Delete Btn
                        const deleteBtn = document.createElement("button");
                        deleteBtn.innerText = "Remove";
                        deleteBtn.classList.add("erBtn", "deleteBtn");
                        li.appendChild(deleteBtn);

                        toDoList.appendChild(li);
                });
        }
}

// Function to delete local todo
const deleteLocalToDos = (todo) => {
        let todos;
        if (localStorage.getItem("todos") === null) {
                todos = [];
        } else {
                todos = JSON.parse(localStorage.getItem("todos"));
        }

        let todoText = todo.children[0].innerHTML;
        let todoIndex = todos.indexOf(todoText);
        todos.splice(todoIndex, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to edit local todo
const editLocalToDos = (todo) => {
        let todos = JSON.parse(localStorage.getItem("todos"));
        let todoIndex = todos.indexOf(todo);
        todos[todoIndex] = inputBox.value;
        localStorage.setItem("todos", JSON.stringify(todos));
}

// Event listeners
document.addEventListener("DOMContentLoaded", getLocalToDos);
addBtn.addEventListener("click", addToDo);
toDoList.addEventListener("click", updateToDo);
