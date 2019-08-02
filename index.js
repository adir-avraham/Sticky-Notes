const TASKS_DOM = {
    task_name: document.getElementById("inputTaskName"),
    task_description: document.getElementById("inputDescription"),
    task_date: document.getElementById("inputDate"),
    task_time: document.getElementById("inputTime"),
    tasks_data: document.getElementById("Card"),
    task_form: document.getElementById("myForm")
}


let arrayOfData;


function draw(arrayOfData) {
    clearTask()
    for (let index = 0; index < arrayOfData.length; index++) {
        // const lastNote = arrayOfData [arrayOfData.length - 1]
        // if (arrayOfData[index] === lastNote) {

        // } else
  
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
    // for (let index = 0; index < task.length; index++) {
    //     const lastNote = task [task.length - 1]
    //      if (task[index] === task[lastNote]) {
    //         taskUL.className = "fade-in";
    //         console.log(task[index]);
    //         console.log(task[lastNote]);
    
    //     }
    //     }
    //   //  taskUL.className = "fade-in";
    tasks_data.append(taskUL);
    // console.log(taskUL);

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
    
    const divElement = document.createElement("div");

    divElement.className = "mt-5 card-body card-hover sticky-note m-3 ml-5 col-lg-3";
    divElement.style = "max-width: 17rem";
    divElement.addEventListener("mouseover", function(){
    deleteButton.style.display = "inline-block";})      
    divElement.addEventListener("mouseleave", function(){
    deleteButton.style.display = "none";})

    const deleteButton = document.createElement("Button")
    deleteButton.className = "btn btn-danger button-no-paddind far fa-trash-alt float-right";
    deleteButton.style.display = "none";  
    deleteButton.addEventListener("click", deleteTaskHandler);

    const card_task_name = document.createElement("h3");
    card_task_name.innerText = task_name;
    card_task_name.className = "card-title";
    card_task_name.append(deleteButton);

    const card_task_description = document.createElement("p");
    card_task_description.innerText = task_description;
    card_task_description.className = "card-text overflow-auto";
    
    const card_task_date = document.createElement("footer");
    card_task_date.innerText = task_date;

    const card_task_time = document.createElement("footer");
    card_task_time.innerText = task_time;

    divElement.id = task_name;

    divElement.append( card_task_name , card_task_description, card_task_date, card_task_time);

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
    if (!task_name.value || !task_description.value || !task_date.value || !task_time.value) {
        alert("Please fill out the form")
       return;
    }
    const result = validateTaskName(task_name.value);
    if (result !== undefined) {
        alert("Task Exist")
        return;
    }

    arrayOfData.push(new Task(task_name.value, task_description.value, task_date.value, task_time.value))
    saveToLocalStorage("tasksData", arrayOfData)
    draw(arrayOfData)
    TASKS_DOM.task_form.reset();
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

console.log(arrayOfData);