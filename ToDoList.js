var itemInput = document.getElementById("todo-form");
itemInput.addEventListener("submit", function(event) {
  event.preventDefault();

  let todoItemText = document.getElementById("todo-input").value;

  if (todoItemText.length > 0) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    const item = {
      text: todoItemText,
      checked: false,
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1
    };
  
    renderToDoItem(item);

    document.getElementById("todo-input").value = "";


    todos.push(item);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});

function renderToDoItem(item) {
  let li = createLiElement(item);

  let completeBtn = createCompletedButton();
  li.appendChild(completeBtn);

  let deleteButton = createDeleteButton();
  li.appendChild(deleteButton);

  var toDoList = document.getElementById("todo-list");
  toDoList.appendChild(li);
}

function createLiElement(todoItem) {
  const liElement = document.createElement('LI');
  liElement.className = 'list-item';
  liElement.setAttribute('data-id', todoItem.id);
  liElement.appendChild(document.createTextNode(todoItem.text))
  return liElement
}

function createCompletedButton() {
  const completedButton = document.createElement('input');
  completedButton.className = 'btn btn-danger btn-sm float-right delete';
  completedButton.appendChild(document.createTextNode('Completed'));
  completedButton.setAttribute('type', 'checkbox');
  completedButton.addEventListener('click', function(e) {
    strikethrough(e);
    toggleDelete(e);
  });
  return completedButton
}

function createDeleteButton() {
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.appendChild(document.createTextNode("X"));
  deleteButton.style.visibility = "hidden";
  deleteButton.style.background = "red";
  deleteButton.style.color = "white";
  deleteButton.style.font = "bold";
  deleteButton.addEventListener('click', function(e) {
    remove(e);
  })
  return deleteButton;
}

function strikethrough(event) {
  const strike = event.target.previousSibling;

  if (event.target.checked) {
    strike.parentElement.style.textDecoration = "line-through";
  } else {
    strike.parentElement.style.textDecoration = "";
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

function toggleDelete(event) {
  const completed = event.target;

  if (completed.checked) {
    completed.nextSibling.style.visibility = "visible";
  } else {
    completed.nextSibling.style.visibility = "hidden";
  }
}

function remove(event) {
  let id = event.target.parentElement.getAttribute("data-id");
  let ul = event.target.parentElement;

  todos = todos.filter(function(todoItem) {
    return todoItem.id !== Number(id);
  });

  var toDoList = document.getElementById("todo-list");
  toDoList.removeChild(ul);
  localStorage.setItem("todos", JSON.stringify(todos));
}

let todos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < todos.length; i++) {

  renderToDoItem(todos[i]);
  localStorage.setItem("todos", JSON.stringify(todos));
}