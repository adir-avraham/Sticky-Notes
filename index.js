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
    const ul = document.createElement("ul");

    divElement.appendChild(ul);
    divElement.className = "col-lg-2 mb-4"
    divElement.style = "font-size: 0.8em";

    ul.className = "card list-group list-group-flush";
    ul.id = task_name;

    Card.className = "row mt-5";

    const deleteButton = document.createElement("Button")
    deleteButton.innerText = "X";
    deleteButton.className = "btn btn-danger button-no-paddind";
    deleteButton.addEventListener("click", deleteTaskHandler);



    const li_task_name = document.createElement("li");
    li_task_name.innerText = task_name;
    li_task_name.className = "list-group-item font-weight-bold";
    li_task_name.style = "font-size:1.2em cards-padding";

    const li_task_description = document.createElement("li");
    li_task_description.innerText = task_description;
    li_task_description.className = "list-group-item cards-padding";


    const li_task_date = document.createElement("li");
    li_task_date.innerText = "Date: " + task_date;
    li_task_date.className = "list-group-item cards-padding";

    const li_task_time = document.createElement("li");
    li_task_time.innerText = "Time: " + task_time;
    li_task_time.className = "list-group-item cards-padding";

    const li_delete_button = document.createElement("li");
    li_delete_button.className = "list-group-item cards-padding";
    li_delete_button.append(deleteButton);

    ul.append(li_task_name, li_task_description, li_task_date, li_task_time, li_delete_button);

    return divElement;
}

function deleteTaskHandler() {
    deleteTask(this.parentElement.parentElement.id);
}

function validateTaskName(name) {
    return findIndex(arrayOfData, name);
}


document.querySelector("#addButton").addEventListener("click", saveTask);

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
