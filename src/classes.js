class Project {
    constructor(title, description, urgency, date, data){
        this.title = title;
        this.description = description;
        this.urgency = urgency;
        this.date = date;
        this.data = data;
        this.items = []
    }
}

class TodoItem {
    constructor(title, description, urgency, date, data, checked){
        this.title = title;
        this.description = description;
        this.urgency = urgency;
        this.date = date;
        this.data = data;
        this.checked = checked;
    }
}

export {TodoItem, Project}