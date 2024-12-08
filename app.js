// Bootstrap tooltips

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// Variables

const input = document.querySelector(".form-control");
const list = document.querySelector(".list-group");
const btn = document.getElementById("btn");
const checkBtns = document.querySelectorAll(".bi-check-circle-fill");

// Array

let tasks = [];

// DOMContentLoaded

document.addEventListener("DOMContentLoaded", () => {
    showLocalStorage();
    newTask();
});

// Event Listeners

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

btn.addEventListener("click", removeAll);

checkBtns.forEach(checkBtn => {
    checkBtn.addEventListener("click", checkTask);
});

// Functions

function addTask() {
    const task = input.value;

    if (task === '') {
        alert("Debes escribir un producto")
    } else {
        tasks.push(task);
        newTask();
        input.value = '';
    }
}

function newTask() {
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<i class="bi bi-check-circle-fill" data-bs-toggle="tooltip" data-bs-title="Check"></i><i class="bi bi-x-circle-fill" data-bs-toggle="tooltip" data-bs-title="Eliminar esta tarea"></i> ${task}`;
        li.classList.add("list-group-item");
        list.appendChild(li);

        const checkBtn = li.querySelector(".bi-check-circle-fill");
        checkBtn.addEventListener("click", checkTask);

        const deleteBtn = li.querySelector(".bi-x-circle-fill");
        deleteBtn.addEventListener("click", () => deleteTask(index));
    });
    savedLocalStorage();
}


function checkTask(event) {
    const taskItem = event.target.parentElement;
    const index = Array.from(taskItem.parentElement.children).indexOf(taskItem);
    taskItem.classList.toggle("check");
    setTimeout(() => {
        taskItem.remove(); // Remove the task item from the DOM after a delay
    }, 500);
    tasks.splice(index, 1); // Remove the task from the tasks array
    savedLocalStorage(); // Update local storage
}


function deleteTask(index) {
    tasks.splice(index, 1);
    newTask();
    savedLocalStorage();
}

function savedLocalStorage() {
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showLocalStorage() {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log(tasks);
}

function removeAll() {
    tasks = [];
    newTask();
}

