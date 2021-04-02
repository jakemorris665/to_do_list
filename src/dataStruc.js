import {TodoItem, Project} from './classes.js'
import {projects, updateProjects, currentList, updateCurrentList} from './index.js'
import {projectNum, updateProjectNum} from './projectTab.js'
import {todoIteration, updateTodoIteration} from './todoTab.js'


function newProjectData(){

    updateProjectNum();

    let thisTitle = document.getElementById("projectTitle").value;
    let thisDesc = document.getElementById("projectNote").value;
    let thisUrg = document.getElementById("urgencySetting").value;
    let thisDate = document.getElementById("projectDate").value;
    let thisData = projectNum
    let thisTodoList = []

    let newProject = new Project(thisTitle, thisDesc, thisUrg, thisDate, thisData, thisTodoList)
    projects.push(newProject)
}

function newTodoData(){

    updateTodoIteration();

    let thisTitle = document.getElementById("projectTitle").value;
    let thisDesc = document.getElementById("projectNote").value;
    let thisUrg = document.getElementById("urgencySetting").value;
    let thisDate = document.getElementById("projectDate").value;
    let thisData = todoIteration;
    let thisCheck = "false";

    let newTodo = new TodoItem(thisTitle, thisDesc, thisUrg, thisDate, thisData, thisCheck)
    addTodoToList(newTodo)
    console.log(projects)

}

function findCurrentProject(){
    updateProjects();
    updateCurrentList();
    let thisProject = projects.find(project => project.data == currentList)
    console.log(projects)
    return thisProject
}

function addTodoToList(todo){
    let thisProject = findCurrentProject();
    thisProject.items.push(todo)
}

function findCurrentTodo(e){
    let thisTodo;
    let currentProject = findCurrentProject();

    thisTodo = currentProject.items.find(function(todo){
        if(e.target.parentElement.id){
            return todo.data == e.target.parentElement.id
        } else {
            return todo.data == e.target.parentElement.parentElement.parentElement.id
        }
        })
    return thisTodo
}

function addTodoFinder(){
    let todoTaskList = document.getElementsByClassName("todo-task")
    let i;

    for(i=0; i < todoTaskList.length; i++){
        if(!todoTaskList[i].listener){
            todoTaskList[i].listener = "true";
            todoTaskList[i].addEventListener('click', findCurrentTodo)
        }
    } 
}

function urgencyValueChange(e){

    let currentTodo = findCurrentTodo(e);
    console.log(currentTodo)
    let currentProject = findCurrentProject();

    if(e.target.parentNode.parentNode.parentNode.className == "todo-task"){
        if(currentTodo.urgency == "normal"){
            currentTodo.urgency = "urgent"
        } else {
            currentTodo.urgency = "normal"
        }
    } else {
        if(currentProject.urgency == "normal"){
            currentProject.urgency = "urgent"
        } else {
            currentProject.urgency = "normal"
        }
    }
    console.log(currentTodo)
}

function dateValueChange(e){

    let currentTodo = findCurrentTodo(e);
    console.log(currentTodo)
    let currentProject = findCurrentProject();
    
    console.log(currentTodo)

    if(e.target.parentNode.parentNode.parentNode.className == "todo-task"){
        currentTodo.date = e.target.value
        console.log(currentTodo)
    } else {
        currentProject.date = e.target.value
    }
    console.log(currentTodo)
}

function descriptionValueChange(e){

    let currentTodo = findCurrentTodo(e);
    let currentProject = findCurrentProject();

    console.log(currentTodo)
    console.log(currentProject)

    if(e.target.parentNode.className == "todo-task"){
        currentTodo.description = e.target.textContent
    } else {
        currentProject.description = e.target.textContent
    }
}

function checkBoxChange(e){
    let currentTodo = findCurrentTodo(e);

    if(currentTodo.checked == "true"){
        currentTodo.checked = "false"
    } else {
        currentTodo.checked = "true"
    }
    console.log(currentTodo)
}

function deleteTodoValue(e){

    let currentTodo = findCurrentTodo(e)
    let currentProject = findCurrentProject()
  
    console.log(currentTodo)
    console.log(currentProject)

    let todoIndex = currentProject.items.findIndex(element => element == currentTodo)
    console.log(todoIndex)

    currentProject.items.splice(todoIndex, 1)
    console.log(currentProject.items)
}

function deleteProject(e){
    let deleteBtnData = e.target.parentNode.parentNode.getAttribute("data");
    let thisProject = projects.find(project => project.data == deleteBtnData)

    let projectIndex = projects.findIndex(element => element == thisProject)

    projects.splice(projectIndex, 1)
}


export {newProjectData, newTodoData, addTodoFinder, findCurrentProject, findCurrentTodo,
urgencyValueChange, dateValueChange, descriptionValueChange, deleteTodoValue, deleteProject, checkBoxChange}