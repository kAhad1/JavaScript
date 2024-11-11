let todos = [];

function render() {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = ''; 

  todos.forEach((todo, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
      ${todo.isEditing ? 
        `<input type="text" class="edit-input" value="${todo.text}" onblur="saveEdit(${index})" />`
        : `<span class="todo-text ${todo.completed ? 'completed' : ''}" onclick="toggleComplete(${index})">${todo.text}</span>`}
      <button class="edit" onclick="editOrSave(${index})">${todo.isEditing ? 'Save' : 'Edit'}</button>
      <button class="delete" onclick="deleteTodo(${index})">Delete</button>`;
    todoList.appendChild(li);
  });
}

function addTodo() {
  const todoText = document.getElementById('newTodo').value.trim();
  if (todoText === '') return;

  const newTodo = { text: todoText, completed: false, isEditing: false };
  todos.push(newTodo);

  render();

  document.getElementById('newTodo').value = '';
}

function deleteTodo(index) {
  todos.splice(index, 1);

  render();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;

  render();
}

function editOrSave(index) {
  const todo = todos[index];
  if (todo.isEditing) {
    const editedText = document.querySelector(`#todoList li:nth-child(${index + 1}) .edit-input`).value.trim();
    if (editedText !== '') {
      todo.text = editedText;
    }
  }
  todo.isEditing = !todo.isEditing;

  render();
}

function saveEdit(index) {
  const editedText = document.querySelector(`#todoList li:nth-child(${index + 1}) .edit-input`).value.trim();
  if (editedText !== '') {
    todos[index].text = editedText;
  }
  todos[index].isEditing = false;

  render();
}

render();