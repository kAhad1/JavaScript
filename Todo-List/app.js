
var idCount = 1;

function addTodo() {
    var todos = document.getElementById('todos');
    var inpVal = document.getElementById('inp').value.trim();

    if (inpVal === "") {
        alert("Please enter a todo.");
        return;
    }

    // Create a new todo item
    var element = document.createElement('div');
    element.setAttribute('id', idCount);
    element.setAttribute('class', "todo");
    element.innerHTML = `
        <p>${inpVal}</p>
        <button onclick="deleteTodo(${idCount})">Delete</button>
        <button onclick="updateTodoPrompt(${idCount})">Update</button>
    `;

    // Append the new todo item to the list
    todos.appendChild(element);

    // Clear input and increment id count
    document.getElementById('inp').value = "";
    idCount++;
}

function deleteTodo(id) {
    var deletedItem = document.getElementById(id);
    deletedItem.remove();
}

function updateTodoPrompt(id) {
    var inpVal = document.getElementById('inp').value.trim();
    if (inpVal === "") {
        alert("Please enter a new value to update the todo.");
        return;
    }

    var todoItem = document.getElementById(id);
    todoItem.innerHTML = `
        <p>${inpVal}</p>
        <button onclick="deleteTodo(${id})">Delete</button>
        <button onclick="updateTodoPrompt(${id})">Update</button>
    `;

    document.getElementById('inp').value = "";
}
