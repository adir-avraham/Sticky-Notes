const TASKS_DOM = {
    task_name: document.getElementById("inputTaskName"),
    task_description: document.getElementById("inputDescription"),
    task_date: document.getElementById("inputDate"),
    task_time: document.getElementById("inputTime"),
    tasks_data: document.getElementById("Card")
}

let arrayOfData;

function draw(arrayOfData) {
    clearTask()
    for (let index = 0; index < arrayOfData.length; index++) {
        drawLi(arrayOfData[index]);
    }
}

function clearTask() {
    TASKS_DOM.tasks_data.innerHTML = "";
}

function drawLi(task) {
    const { tasks_data } = TASKS_DOM;
    const taskUL = createTask(task);
    if (!taskUL) return;
    tasks_data.append(taskUL);
}

function deleteTask(id) {
    const index = findIndex(arrayOfData, id);
    if (id === undefined) return;
    arrayOfData.splice(index, 1);
    saveToLocalStorage("tasksData", arrayOfData)
    draw(arrayOfData);
}


function findIndex(data, id) {
    for (let index = 0; index < data.length; index++) {
        if (data[index].task_name === id) {
            return index;
        }
    }
}



function createTask(task) {
    const { task_name, task_description, task_date, task_time } = task;
    if (!task_name || !task_description || !task_date || !task_time) return;

    const divElement = document.createElement("div");
    const cardBody = document.createElement("div")


    divElement.className = "card bg-card m-3 col-lg-3";
    divElement.style = "max-width: 18rem";
    divElement.appendChild(cardBody);
    
    cardBody.className = "card-body";

    const card_task_name = document.createElement("h3");
    card_task_name.innerText = task_name;
    card_task_name.className = "card-title";

    const card_task_description = document.createElement("p");
    card_task_description.innerText = task_description;
    //overflow is not working
    card_task_description.className = "card-text overflow-auto";
    
    const card_task_date = document.createElement("footer");
    card_task_date.innerText = task_date;

    const card_task_time = document.createElement("footer");
    card_task_time.innerText = task_time;



    cardBody.id = task_name;

    Card.className = "row mt-5";

    const deleteButton = document.createElement("Button")
    deleteButton.innerText = "X";
    deleteButton.className = "btn btn-danger button-no-paddind";
    //const spanTrash = document.createElement("span");
    //spanTrash.className = "glyphicon glyphicon-trash";
    //deleteButton.append(spanTrash);
    deleteButton.addEventListener("click", deleteTaskHandler);

    const card_delete_button = document.createElement("p");
    card_delete_button.append(deleteButton);

    cardBody.append( card_task_name , card_task_description, card_task_date, card_task_time, card_delete_button);

    return divElement;
}

function deleteTaskHandler() {
    deleteTask(this.parentElement.parentElement.id);
}

function validateTaskName(name) {
    return findIndex(arrayOfData, name);
}


document.querySelector("#addButton").addEventListener("click", saveTask);

// document.querySelector("#addButton").addEventListener("click", () => {
//  saveTask();
//  resetForm();
// });

// function resetForm() {
//     document.querySelector("myForm").reset();
// }


function saveTask() {
    const { task_name, task_description, task_date, task_time } = TASKS_DOM;

    const result = validateTaskName(task_name.value);
    if (result !== undefined) {
        alert("Task Exist")
        return;
    }

    arrayOfData.push(new Task(task_name.value, task_description.value, task_date.value, task_time.value))
    saveToLocalStorage("tasksData", arrayOfData)
    draw(arrayOfData)


}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function Task(_name, _description, _date, _time) {
    this.task_name = _name;
    this.task_description = _description;
    this.task_date = _date;
    this.task_time = _time;
}

function init() {
    arrayOfData = JSON.parse(localStorage.getItem("tasksData")) || []
    draw(arrayOfData)
}
init();
