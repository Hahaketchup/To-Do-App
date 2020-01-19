//states where the functions go
var itemInput = document.getElementById("todo-form");
var toDoList = document.getElementById("todo-list");

//adds specifications to the functions
itemInput.addEventListener("submit", addItem);

toDoList.addEventListener("click", strikethrough);

toDoList.addEventListener("click", remove);

toDoList.addEventListener("click", toggleDelete);

const todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos);
console.log(typeof todos);

//allows an item input
function addItem(event) {
  event.preventDefault();

  let newItem = document.getElementById("todo-input").value;

  if (newItem.length > 0) {
    const item = {
      newItem,
      checked: false,
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1
    };

    let li = document.createElement("li");
    li.className = "list-item";
    li.setAttribute("data-id", item.id);
    li.appendChild(document.createTextNode(newItem));

    let completeBtn = document.createElement("input");
    completeBtn.className =
      "checkbox btn-success btn-sm float right mt-1 mr-2 mb-1 completeBtn";
    completeBtn.appendChild(document.createTextNode("Completed"));
    completeBtn.setAttribute("type", "checkbox");
    li.appendChild(completeBtn);

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm float-right delete";
    deleteButton.appendChild(document.createTextNode("X"));
    deleteButton.style.visibility = "hidden";
    deleteButton.style.background = "red";
    deleteButton.style.color = "white";
    deleteButton.style.font = "bold";
    li.appendChild(deleteButton);

    toDoList.appendChild(li);

    document.getElementById("todo-input").value = "";

    todos.push(item);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function renderList() {
  const list = [document.getElementById("todo-list")];

  list.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    console.log(todos[i].id);

    let text = todos[i].text;
    list.innerHTML += `
        <li class='todo-item'
            onclick='strikethrough(${todos[i].id})'
            id='${todos[i].id}'>
            ${todos[i].checked ? text.strike() : text}
        <span class='delete-todo js=delete=todo'
            onclick='remove(${todos[i].id})'>
            </span>
            </li>`;

    let li = document.createElement("li");
    li.className = "list-item";
    li.setAttribute('data-id', todos[i].id);
    li.appendChild(document.createTextNode(todos[i].newItem));

    let completeBtn = document.createElement("input");
    completeBtn.className =
      "checkbox btn-success btn-sm float right mt-1 mr-2 mb-1 completeBtn";
    completeBtn.appendChild(document.createTextNode("Completed"));
    completeBtn.setAttribute("type", "checkbox");
    li.appendChild(completeBtn);

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm float-right delete";
    deleteButton.appendChild(document.createTextNode("X"));
    deleteButton.style.visibility = "hidden";
    deleteButton.style.background = "red";
    deleteButton.style.color = "white";
    deleteButton.style.font = "bold";
    li.appendChild(deleteButton);

    toDoList.appendChild(li);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function remove(event) {
  if (event.target.classList.contains("delete")) {
      debugger;
    let id = event.target.parentElement.getAttribute('data-id');
    let ul = event.target.parentElement;

    const todo = todos.filter(function(todoItem) {
        return todoItem.id != todoItem.id;
        console.log(todoItem);
    });

    todos.splice(parseInt(id) -1 , 1);
    toDoList.removeChild(ul);
  }

  localStorage.setItem("todos", JSON.stringify(todos));
}

function toggleDelete(event) {
  const completed = event.target;
  if (event.target.classList.contains("completeBtn")) {
    if (completed.checked) {
      completed.nextSibling.style.visibility = "visible";
    } else {
      completed.nextSibling.style.visibility = "hidden";
    }
  }
  
}

function strikethrough(event) {
  let i = 0;
  const strike = event.target.previousSibling;
  if (event.target.classList.contains("completeBtn")) {
    if (event.target.checked) {
      strike.parentElement.style.textDecoration = "line-through";
    } else {
      strike.parentElement.style.textDecoration = "";
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

renderList();