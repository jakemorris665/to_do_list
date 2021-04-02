import {Project, TodoItem} from './classes.js'
import {createProject, projectNum, storageDisplay, updateStorageDisplay, createDefaultProj} from './projectTab.js'
import {createNewList, createTodo, createDefaultTodo} from './todoTab.js'
import {newProjectData, newTodoData, addTodoFinder, findCurrentProject, findCurrentTodo,
    urgencyValueChange, dateValueChange, descriptionValueChange, deleteTodoValue, deleteProject,
checkBoxChange} from './dataStruc.js'
import { fi } from 'date-fns/locale';

let projects = [];
let currentList = 0;
let listCount = 0;

function updateProjects(){
    projects = projects;
}

function updateCurrentList(){
    currentList = currentList;
}

function urgencyToggle(e){
    if(e.target.className == "urgency urgentColor"){
        e.target.classList.remove("urgentColor")
        e.target.classList.add("nonUrgentColor")
        e.target.textContent = "normal"
    } else if(e.target.className == "urgency nonUrgentColor"){
        e.target.classList.remove("nonUrgentColor")
        e.target.classList.add("urgentColor")
        e.target.textContent = "urgent"
    }
    urgencyValueChange(e);
}

function checkBox(e){
    if(e.target.parentNode.parentNode.parentNode.style.opacity == 1){
        e.target.parentNode.parentNode.parentNode.style.opacity = .5
        checkBoxChange(e)
    } else {
        e.target.parentNode.parentNode.parentNode.style.opacity = 1
        checkBoxChange(e)
    }
}

function changeCurrentList(e){

    if((e.target.className !== "delete")){
        
        console.log(currentList)

      document.getElementById("todo" + `${currentList}`).style.display = "none";

        if(!e.target.getAttribute("data")){
            if(e.target.parentNode.getAttribute("data")){
                currentList = e.target.parentNode.getAttribute("data")
            } else {
                currentList = e.target.parentNode.parentNode.getAttribute("data")
            }
        } else {
            currentList = e.target.getAttribute("data")
        }

        document.getElementById("todo" + `${currentList}`).style.display = "block";
        listDisplayHeader();  
    }  
}

function newListShowing(){
    if(document.getElementById("todo" + `${currentList}`)){
        document.getElementById("todo" +`${currentList}`).style.display = "none";
    }
    console.log(listCount)
    document.getElementById("todo" + `${listCount}`).style.display = "block";
    currentList = listCount;
    console.log(currentList)
    listDisplayHeader();
}

function clearItem(e){

    if(e.target.parentNode.parentNode.parentNode.className == "todo-task"){
        deleteTodoValue(e);
        e.target.parentNode.parentNode.parentNode.remove();
    } else {
        let thisList = e.target.parentNode.parentNode.getAttribute("data");
        let currentProjects = document.getElementsByClassName("project")
        let firstProject = currentProjects[0]

        console.log(currentList)
        deleteProject(e)

        document.getElementById("todo"+`${thisList}`).remove();
        e.target.parentNode.parentNode.remove();

        currentProjects = currentProjects;
        firstProject = currentProjects[0];

        if((thisList == currentList)){
            if(currentProjects.length > 0){
                currentList = firstProject.getAttribute("data")
                document.getElementById("todo" + `${currentList}`).style.display = "block";
                listDisplayHeader();
                console.log(currentList)
            } else {
                currentList = 0;
                console.log(currentList)
            } 
        }
    }      
}

function listDisplayHeader(){
    let thisList = findCurrentProject();
    document.getElementById("currentListHeader").textContent = `Current List: ${thisList.title}`;
}

function addUrgencyToggleListener(){
    let urgencyBtns = document.getElementsByClassName("urgency");
    let i;

    for(i=0; i<urgencyBtns.length; i++){
        if (!urgencyBtns[i].listener){
            urgencyBtns[i].listener = "true";
            urgencyBtns[i].addEventListener('click', urgencyToggle)
        }
    }
}

function addDeleteListener(){
    let deleteBtns = document.getElementsByClassName("delete");
    let i;
    
    for(i=0; i<deleteBtns.length; i++){
        if (!deleteBtns[i].listener){
            deleteBtns[i].listener = "true";
            deleteBtns[i].addEventListener('click', clearItem);
        }
    }
}

function addListChangeEvent(){
    let currentProjects = document.getElementsByClassName('project');
    let i;

    for (i=0; i<currentProjects.length; i++){
        if (!currentProjects[i].listener){
            currentProjects.listener = "true";

            currentProjects[i].addEventListener('click', changeCurrentList)
        }
    }
}

function addCheckBoxListener(){
    let checkBoxes = document.getElementsByClassName("todoCheck")
    let i;

    for(i=0; i<checkBoxes.length; i++){
        if(!checkBoxes[i].listener){
            checkBoxes[i].listener = "true";

            checkBoxes[i].addEventListener('change', checkBox)
        }
    }
}

function expandSlide(){
    let coll = document.getElementsByClassName("expand")
    let i;

    for (i=0; i<coll.length; i++){
        if (!coll[i].listener){

            coll[i].listener = "true";

            coll[i].addEventListener('click', function(){
                let expanded = this.nextElementSibling;
                if (expanded.style.maxHeight){
                    expanded.style.maxHeight = null;
                } else {
                    expanded.style.maxHeight = expanded.scrollHeight + 10 + "px";
                }
            });
        }
    }
}

function clearFields() {
    document.getElementById('projectTitle').value = "";
    document.getElementById('projectDate').value = "";
    document.getElementById('urgencySetting').value = "0";
    document.getElementById('projectDate').value = "";
    document.getElementById('projectNote').value = "";
}

function dateChangeListener(){
    let dateInputs = document.getElementsByClassName("due-date")
    let i;

    for(i=0; i<dateInputs.length; i++){
        if(!dateInputs[i].listener){

            dateInputs[i].listener = "true"

            dateInputs[i].addEventListener('change', dateValueChange)
        }
    }
}

function descChangeListener(){
    let descriptions = document.getElementsByClassName("expandedContent")
    let i;

    for(i=0; i<descriptions.length; i++){

        if(!descriptions[i].listener){

            descriptions[i].listener = "true"

            descriptions[i].addEventListener('input', descriptionValueChange)
        }
    }
}

function defaultProject(){

    let firstProject = new Project("my project", "", "normal", "", 0)
    let firstTodo = new TodoItem("my item", "", "normal", "", 0, "false")
    firstProject.items.push(firstTodo)
    projects.push(firstProject)
    console.log(projects)

    createDefaultProj();
    createDefaultTodo();

    listCount++

}

function checkStorage(){
    projects = JSON.parse(localStorage.getItem("projects"));
    projects.forEach(displayLocalStorage)
}

function updateLocalStorage(){
    let storageProjects = JSON.stringify(projects);
    let storageClone = JSON.parse(storageProjects);

    storageClone.forEach(project => project.items.data = undefined);
    localStorage.setItem("projects", JSON.stringify(storageClone));

    console.log(localStorage)
}

function displayLocalStorage(project){

    updateStorageDisplay();

    console.log(currentList)
    createProject(project)
    createNewList();
    project.items.forEach(item => createTodo(item))

    if(projects[projects.length - 1] == project){
        currentList = 0;
    } else {
        currentList++
    }
    
    updateStorageDisplay();

    listCount++
}

document.getElementById("currentListHeader")

document.getElementById("save").addEventListener('click', updateLocalStorage)

document.getElementById("clear").addEventListener('click', function(){
    localStorage.clear();
    console.log(localStorage)
})

document.getElementById("add1").addEventListener('click', function(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('todoSubmit').style.display = 'none';
    document.getElementById('projectSubmit').style.display = "block"
})

document.getElementById('add2').addEventListener('click', function(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('projectSubmit').style.display = 'none';
    document.getElementById('todoSubmit').style.display = "block"
})

document.getElementById('closeWindow').addEventListener('click', function(){
    document.getElementById('overlay').style.display = 'none';
    clearFields();
})

document.getElementById('projectSubmit').addEventListener('click', function(){
    if((document.getElementById("urgencySetting").value === "0")){
        alert("please choose a priority level")
    } else {
        newProjectData();
        createProject();
        createNewList();
        addDeleteListener();
        descChangeListener();
        dateChangeListener();
        addUrgencyToggleListener();
        addListChangeEvent();
        expandSlide();
        document.getElementById('overlay').style.display = 'none';
        clearFields();
        newListShowing();
        console.log(projects)
    }
})

document.getElementById("todoSubmit").addEventListener('click', function(){
    newTodoData();
    createTodo();
    addDeleteListener();
    descChangeListener();
    dateChangeListener();
    addCheckBoxListener();
    addTodoFinder();
    addUrgencyToggleListener();
    expandSlide();
    document.getElementById('overlay').style.display = 'none';
    clearFields();
})

function pageLoad(){
    if(localStorage.length == 0){
    defaultProject();
    updateLocalStorage();
} else {
    checkStorage();
}
}

pageLoad();

addTodoFinder();
expandSlide();
addCheckBoxListener();
addDeleteListener();
descChangeListener();
dateChangeListener();
addListChangeEvent();
addUrgencyToggleListener();

export {currentList, updateCurrentList, projects, updateProjects}