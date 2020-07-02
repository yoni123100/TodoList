
//Main Task List Adder
const todoListInput = document.querySelector(".todo-list-input");
const todoListButton = document.querySelector(".todo-list-button");
const todoContainers = document.querySelector(".todo-container-list");
var globalTempContainer;

//Starter
loadTodos();

//Listeners
todoListButton.addEventListener("click",function(event){
    event.preventDefault();
    if(localStorage.getItem(todoListInput.value + ".todos") != null) {
        alert("This Container Already Exists!");
    } else {
        addTaskList(todoListInput.value);
        localStorage.setItem(todoListInput.value + ".todos",null);
    }
});

//Functions

function addTaskToContainer(todoContainer, containerName, todoObject) {
    //Todo div
    const todoDiv = document.createElement("div");
    todoDiv.addEventListener("click", function(event) {
    const clickedItem = event.target;
    const parent = clickedItem.parentElement;
    if(clickedItem.classList[0] === "delete-btn") {
            //Getting the Div (Parent) and removing it ~ Deleting him
            parent.remove();
            removeTodo(containerName, todoObject);
            //Remove todo from database
    } else if(clickedItem.classList[0] === "checked-btn") {
            parent.classList.toggle("checked");
            todoObject.done = parent.classList.contains("checked");
            updateTodo(containerName, todoObject);
            //Update check state in database
    } else if(clickedItem.classList[0] === "edit-btn") {
            var newName = prompt("Enter new name for the task");
            addedTodo.innerText = newName;
            todoObject.taskName = newName;
            //Update the name in database
            updateTodo(containerName, todoObject);
        }
    });
    todoDiv.classList.add("todo");
    
    const addedTodo = document.createElement("li");
    addedTodo.innerText = todoObject.taskName;
    addedTodo.classList.add("todo-item");
    todoDiv.appendChild(addedTodo);
    
    const checkButton = document.createElement("button");
    checkButton.textContent = "Done";
    checkButton.classList.add("checked-btn");
    if(todoObject.done) {
        todoDiv.classList.toggle("checked");
    }
    todoDiv.appendChild(checkButton);
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);
    
    todoContainer.appendChild(todoDiv);
}

function addTaskList(containerName) {

    //Creating the Container
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");

    const containerNameElement = document.createElement("h5");
    containerNameElement.textContent = containerName;
    todoContainer.appendChild(containerNameElement);

    const containerInput = document.createElement("input");
    containerInput.classList.add("todo-input");
    containerInput.placeholder = "Enter your task";
    todoContainer.appendChild(containerInput);

    const containerDeleteBtn = document.createElement("button");
    containerDeleteBtn.textContent = "Delete Container";
    containerDeleteBtn.addEventListener("click",function(event) {
        const clickedItem = event.target;
        const parent = clickedItem.parentElement;
        parent.remove();
        removeContainer(containerName);
    });
    todoContainer.appendChild(containerDeleteBtn);

    const containerAddTaskBtn = document.createElement("button");
    containerAddTaskBtn.textContent = "Add Task";
    containerAddTaskBtn.addEventListener("click", function(event){
        var taskObject = {taskID:(countTodosInContainer(containerName) + 1),taskName:containerInput.value, done:false};
        addTaskToContainer(todoContainer,containerName, taskObject);
        saveTodo(containerName, taskObject)
    });
    todoContainer.appendChild(containerAddTaskBtn);

    todoContainers.appendChild(todoContainer);
    globalTempContainer = todoContainer;
}

function removeContainer(containerName) {
    if(localStorage.getItem(containerName + ".todos") != null) {
        localStorage.removeItem(containerName + ".todos");
    }
}

function removeTodo(containerName, todoObject) {
    var todos = [];
    if(localStorage.getItem(containerName + ".todos") != null) {
        todos = JSON.parse(localStorage.getItem(containerName + ".todos"));
        for(i = 0; i < todos.length; i++) {
            if(todos[i].taskID == todoObject.taskID) {
                todos.splice(i,i+1);
                localStorage.setItem(containerName + ".todos", JSON.stringify(todos));
                if(todos.length == 0) 
                    localStorage.removeItem(containerName + ".todos");
                break;
            }
        }
    }
}

function updateTodo(containerName, todoObject) {
    var todos = [];
    if(localStorage.getItem(containerName + ".todos") == null) {
        saveTodo(containerName, todoObject);
    } else {
        todos = JSON.parse(localStorage.getItem(containerName + ".todos"));
        if(todos != null) {
            for(i = 0; i < todos.length; i++) {
                if(todos[i].taskID == todoObject.taskID) {
                    todos[i].taskName = todoObject.taskName;
                    todos[i].done = todoObject.done;
                    localStorage.setItem(containerName + ".todos", JSON.stringify(todos));
                    break;
                }
            }
        }
    }
}

function saveTodo(containerName, todoObject) {
    //Todo Object - taskID,taskName,done
    var todos = [];
    if(localStorage.getItem(containerName + ".todos") != null) {
        todos = JSON.parse(localStorage.getItem(containerName + ".todos")); //Array of objects
        if(todos == null)
            todos = [];
    } 
    todos.push(todoObject);
    localStorage.setItem(containerName + ".todos", JSON.stringify(todos));
}

function countTodosInContainer(containerName) {
    var todos = [];
    if(localStorage.getItem(containerName + ".todos") != null) {
        todos = JSON.parse(localStorage.getItem(containerName + ".todos")); //Array of objects
        if(todos == null) 
            return 0;
    }
    return todos.length;
}

function loadTodos() {
    var tempTodoObjects = [];
    var keys = Object.keys(localStorage);
    var tempContainerName;

    for(i = 0; i < keys.length; i++) {
        tempContainerName = keys[i].split(".")[0]; //Container name
        tempTodoObjects = JSON.parse(localStorage.getItem(tempContainerName + ".todos"));
        addTaskList(tempContainerName);
        if(tempTodoObjects != null) {
            for(j = 0; j < tempTodoObjects.length; j++) {
                addTaskToContainer(globalTempContainer, tempContainerName, tempTodoObjects[j]);
            }
        }
    }
}