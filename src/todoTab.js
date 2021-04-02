import {currentList, updateCurrentList} from './index.js'
import {storageDisplay, checkStorageDisplay} from './projectTab.js'

let iteration = 0;
let todoIteration = 0;
let defaultTodo = "false";

function updateTodoIteration(){
    todoIteration = todoIteration
}

function createNewList(){

    let newTodoList = document.createElement("div");
    newTodoList.className = "todo" + `${iteration}`;
    newTodoList.id = "todo" + `${iteration}`;
    document.getElementById("todo-list").appendChild(newTodoList);

    if(storageDisplay == "true"){
        newTodoList.style.display = "none";
    } 

    iteration++
}

function createDefaultTodo(){
    defaultTodo = "true";
    iteration = 0;
    createNewList();
    todoIteration = 0;
    createTodo();
    defaultTodo = "false";
}

function createTodo(item){

    updateCurrentList();

    let todoTask = document.createElement("div");
    let alwaysShowingWrapper = document.createElement("div");
    let buttonWrapperProject = document.createElement("div");
    let titleCheckBoxWrapper = document.createElement("div");
    let checkbox = document.createElement("input");
    let todoTitle = document.createElement("span");
    let urgencyBtn = document.createElement("button");
    let dueDateBtn = document.createElement("input");
    let deleteBtn = document.createElement("button");
    let expand = document.createElement("div");
    let expandedContent = document.createElement("div");

    addTodoClass(todoTask, alwaysShowingWrapper, buttonWrapperProject, titleCheckBoxWrapper, checkbox, todoTitle, urgencyBtn, dueDateBtn, deleteBtn, expand, expandedContent)

    document.getElementById("todo" + `${currentList}`).appendChild(todoTask);
    
    todoTask.appendChild(alwaysShowingWrapper);
    todoTask.appendChild(buttonWrapperProject);
    todoTask.appendChild(expand);
    todoTask.appendChild(expandedContent);
    todoTask.style.opacity = 1;

    alwaysShowingWrapper.appendChild(titleCheckBoxWrapper);
    alwaysShowingWrapper.appendChild(buttonWrapperProject);

    titleCheckBoxWrapper.appendChild(checkbox);
    titleCheckBoxWrapper.appendChild(todoTitle)

    buttonWrapperProject.appendChild(urgencyBtn);
    buttonWrapperProject.appendChild(dueDateBtn);
    buttonWrapperProject.appendChild(deleteBtn)

    if(storageDisplay == "true"){
        storageAddTodoValues(item, todoTitle, urgencyBtn, deleteBtn, expand, dueDateBtn, expandedContent)
        item.data = todoIteration;
        if(item.checked == "true"){
            checkbox.checked = true;
            todoTask.style.opacity = .5;
        } else {
            checkbox.checked = false;
            todoTask.style.opacity = 1;
        }
    } else if(defaultTodo == "true"){
        defaultTodoVals(todoTitle, urgencyBtn, deleteBtn, expand, dueDateBtn, expandedContent)
    } else {
        addTodoValues(todoTitle, urgencyBtn, deleteBtn, expand, dueDateBtn, expandedContent)
    }

    todoIteration++
}

function addTodoClass(todoTask, alwaysShowingWrapper, buttonWrapperProject, titleCheckBoxWrapper, checkbox, todoTitle, urgencyBtn, dueDateBtn, deleteBtn, expand, expandedContent){

    todoTask.className = "todo-task";
    todoTask.id = `${todoIteration}`

    alwaysShowingWrapper.className = "always-showing-wrapper";
    titleCheckBoxWrapper.className = "title-checkbox-wrapper";

    checkbox.type = "checkbox";
    checkbox.className = "todoCheck";
    checkbox.id = "todoCheck";

    todoTitle.className = "todo-item-title";
    buttonWrapperProject.className = "button-wrapper-project";

    urgencyBtn.className = "urgency";
    urgencyBtn.id = "urgency";

    dueDateBtn.className = "due-date";
    dueDateBtn.id = "due-date";
    dueDateBtn.type = "date";

    deleteBtn.className = "delete";
    deleteBtn.id = "delete";

    expand.className = "expand";
    expand.id = "expand";

    expandedContent.className = "expandedContent";
    expandedContent.id = "expandedContent";
    expandedContent.contenteditable="true";

}

function addTodoValues(todoTitle, urgencyBtn, deleteBtn, expand, dueDateBtn, expandedContent){
    
    todoTitle.textContent = document.getElementById("projectTitle").value;
    todoTitle.contenteditable = "true";

    urgencyBtn.textContent = document.getElementById("urgencySetting").value;
    if((document.getElementById("urgencySetting").value == "normal")){
        urgencyBtn.classList.add("nonUrgentColor")
    } else {
        urgencyBtn.classList.add("urgentColor")
    }

    deleteBtn.textContent = "X";
    expand.textContent = "...";
    dueDateBtn.value = document.getElementById("projectDate").value;

    expandedContent.textContent = document.getElementById("projectNote").value
    expandedContent.contentEditable = "true";

}

function storageAddTodoValues(item, todoTitle, urgencyBtn, deleteBtn, expand, dueDateBtn, expandedContent){
    todoTitle.textContent = item.title;
    urgencyBtn.textContent = item.urgency;

    if(item.urgency == "normal"){
        urgencyBtn.classList.add("nonUrgentColor")
    } else {
        urgencyBtn.classList.add("urgentColor")
    }

    deleteBtn.textContent = "X"
    expand.textContent = "..."
    dueDateBtn.value = item.date
    expandedContent.textContent = item.description
    expandedContent.contentEditable = "true";

}

function defaultTodoVals(todoTitle, urgencyBtn, deleteBtn, expand, dueDateBtn, expandedContent){
    todoTitle.textContent = "my to do"
    urgencyBtn.textContent = "normal"
    urgencyBtn.classList.add("nonUrgentColor")

    deleteBtn.textContent = "X"
    expand.textContent = "..."
    dueDateBtn.value = ""
    expandedContent.textContent = ""
    expandedContent.contentEditable = "true";
}

export {createNewList, createTodo, todoIteration, updateTodoIteration, createDefaultTodo}