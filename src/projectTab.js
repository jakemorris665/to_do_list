let projectNum = 0;
let storageDisplay = "false";
let defaultProj = "false";

function updateProjectNum(){
    projectNum = projectNum
}

function updateStorageDisplay(){
    if(storageDisplay == "false"){
        storageDisplay = "true"
    } else {
        storageDisplay = "false"
    }
}

function createDefaultProj(){
    defaultProj = "true";
    projectNum = 0;
    createProject();
    defaultProj = "false";
}

function createProject(project) {

    let projectDiv = document.createElement("div");
    let projectBtnWrap = document.createElement("div")
    let projectTitle = document.createElement("span");
    let urgencyBtn = document.createElement("button");
    let dueDateBtn = document.createElement("input");
    let deleteBtn = document.createElement("button");
    let expand = document.createElement("div");
    let expandedContent = document.createElement("div");

    addProjectClass(projectDiv, projectBtnWrap, projectTitle, urgencyBtn, dueDateBtn, deleteBtn, expand, expandedContent);

    document.getElementById("project-bar-container").appendChild(projectDiv);
    projectDiv.appendChild(projectTitle);
    projectDiv.appendChild(projectBtnWrap);
    projectDiv.appendChild(expand)
    projectDiv.appendChild(expandedContent)

    projectDiv.setAttribute("data", projectNum);

    projectBtnWrap.appendChild(urgencyBtn);
    projectBtnWrap.appendChild(dueDateBtn);
    projectBtnWrap.appendChild(deleteBtn);

    if(storageDisplay == "true"){
        storageAddProjectText(project, projectTitle, urgencyBtn, deleteBtn, expand, dueDateBtn, expandedContent)
        project.data = projectNum
    } else if (defaultProj == "true"){
        defaultProjText(projectTitle, urgencyBtn, deleteBtn, expand, dueDateBtn, expandedContent)
    } else {
        addProjectText(projectTitle, urgencyBtn, deleteBtn, expand, dueDateBtn, expandedContent);
    }

    projectNum++

}

function addProjectClass(projectDiv, projectBtnWrap, projectTitle, urgencyBtn, dueDateBtn, deleteBtn, expand, expandedContent) {

    projectDiv.className = "project";
    projectDiv.id = "project";

    projectTitle.className = "project-title";
    projectTitle.id = "project-title";

    projectBtnWrap.className = "button-wrapper-project";
    projectBtnWrap.id = "button-wrapper-project";

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
    expandedContent.contenteditable = "true";

}

function addProjectText(projectTitle, urgencyBtn, deleteBtn, expand, dueDateBtn, expandedContent) {
    projectTitle.textContent = document.getElementById("projectTitle").value
    urgencyBtn.textContent = document.getElementById("urgencySetting").value

    if((document.getElementById("urgencySetting").value == "normal")){
        urgencyBtn.classList.add("nonUrgentColor")
    } else {
        urgencyBtn.classList.add("urgentColor")
    }

    deleteBtn.textContent = "X"
    expand.textContent = "..."
    dueDateBtn.value = document.getElementById("projectDate").value
    expandedContent.textContent = document.getElementById("projectNote").value
    expandedContent.contentEditable = "true";
}

function storageAddProjectText(project, projectTitle, urgencyBtn, deleteBtn, expand, dueDateBtn, expandedContent){
    projectTitle.textContent = project.title;
    urgencyBtn.textContent = project.urgency;

    if(project.urgency == "normal"){
        urgencyBtn.classList.add("nonUrgentColor")
    } else {
        urgencyBtn.classList.add("urgentColor")
    }

    deleteBtn.textContent = "X"
    expand.textContent = "..."
    dueDateBtn.value = project.date
    expandedContent.textContent = project.description
    expandedContent.contentEditable = "true";

}

function defaultProjText(projectTitle, urgencyBtn, deleteBtn, expand, dueDateBtn, expandedContent){
    projectTitle.textContent = "my project"
    urgencyBtn.textContent = "normal"
    urgencyBtn.classList.add("nonUrgentColor")

    deleteBtn.textContent = "X"
    expand.textContent = "..."
    dueDateBtn.value = ""
    expandedContent.textContent = ""
    expandedContent.contentEditable = "true";
}

export {createProject, projectNum, updateProjectNum, storageDisplay, updateStorageDisplay, createDefaultProj}