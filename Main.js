//Variables

//Main Task List Adder
const todoListInput = document.querySelector(".todo-list-input");
const todoListButton = document.querySelector(".todo-list-button");
const todoContainers = document.querySelector(".todo-container-list");


//Listeners
todoListButton.addEventListener("click",addTaskList);

//Functions

function addTaskList(event) {
    event.preventDefault();

    //Creating the Container
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");

    const containerName = document.createElement("h5");
    containerName.textContent = todoListInput.value;
    todoContainer.appendChild(containerName);

    const containerInput = document.createElement("input");
    containerInput.classList.add("todo-input");
    containerInput.placeholder = "Enter your task";
    todoContainer.appendChild(containerInput);

    const containerAddTaskBtn = document.createElement("button");
    containerAddTaskBtn.textContent = "Add Task";
    containerAddTaskBtn.addEventListener("click", function(event){

            //Todo div
            const todoDiv = document.createElement("div");
            todoDiv.addEventListener("click", function(event) {
                const clickedItem = event.target;
                const parent = clickedItem.parentElement;
                if(clickedItem.classList[0] === "delete-btn") {
                    //Getting the Div (Parent) and removing it ~ Deleting him
                    parent.remove();
                } else if(clickedItem.classList[0] === "checked-btn") {
                    parent.classList.toggle("checked");
                } else if(clickedItem.classList[0] === "edit-btn") {
                    var newName = prompt("Enter new name for the task");
                    addedTodo.innerText = newName;
                }
            });
            todoDiv.classList.add("todo");

            const addedTodo = document.createElement("li");
            addedTodo.innerText = containerInput.value;
            addedTodo.classList.add("todo-item");
            todoDiv.appendChild(addedTodo);

            const checkButton = document.createElement("button");
            checkButton.textContent = "Done";
            checkButton.classList.add("checked-btn");
            todoDiv.appendChild(checkButton);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-btn");
            todoDiv.appendChild(deleteButton);

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("edit-btn");
            todoDiv.appendChild(editButton);

            containerTodoList.appendChild(todoDiv);
    });
    todoContainer.appendChild(containerAddTaskBtn);

    const containerDeleteBtn = document.createElement("button");
    containerDeleteBtn.textContent = "Delete Container";
    containerDeleteBtn.addEventListener("click",function(event) {
        const clickedItem = event.target;
        const parent = clickedItem.parentElement;
        parent.remove();
    });
    todoContainer.appendChild(containerDeleteBtn);

    const containerTodoList = document.createElement("u1");
    containerTodoList.classList.add("todo-list");
    todoContainer.appendChild(containerTodoList);

    todoContainers.appendChild(todoContainer);
}