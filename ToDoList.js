//states where the functions go
var itemInput = document.getElementById('main-input');
var toDoList = document.getElementById('toDo');

//adds specifications to the functions
itemInput.addEventListener('submit', addItem);

toDoList.addEventListener('click', strikethrough);

toDoList.addEventListener('click', remove);

const todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos);


//allows an item input
function addItem(event) {
    event.preventDefault();

    var newItem = document.getElementById('input').value;

    var ul = document.createElement('li');
    ul.className = 'list-item';
    ul.appendChild(document.createTextNode(newItem));

    var checkbox = document.createElement('input');
    checkbox.className = 'btn checkbox';
    checkbox.setAttribute('type', 'checkbox');
    ul.prepend(checkbox);

    var deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm float-right delete';
    deleteButton.appendChild(document.createTextNode('X'));
    deleteButton.style.visibility = "hidden";
    ul.appendChild(deleteButton);

    toDoList.appendChild(ul);

    document.getElementById('input').value =''; 

    if(newItem.length > 0) {
        const task = {
            newItem,
            checked: false,
            id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1
        };

    todos.push(newItem);
    localStorage.setItem("todos", JSON.stringify(todos));
    }
}

function renderList() {
const list = [document.getElementById('toDo')];

for(let i = 0; i < todos.length; i++) {
    console.log(todos[i]);
}
};

function remove(event) {
    if(event.target.classList.contains('delete')) {
            var ul = event.target.parentElement;
            toDoList.removeChild(ul);

        }
        localStorage.removeItem(JSON.stringify(todos));
        
    };

function strikethrough(event) {
    const strike = event.target.nextSibling;
    if(event.target.checked) {
        strike.parentElement.style.textDecoration = "line-through";
        strike.nextSibling.style.visibility = "visible"
    } else {
        strike.parentElement.style.textDecoration = "";
        strike.nextSibling.style.visibility = "hidden";
    }
    
};

const savedToDos = localStorage.getItem('todos');
console.log(savedToDos);
console.log(typeof(savedToDos));
const savedToDosArray = JSON.parse(localStorage.getItem(savedToDos));

// loop through each item in savedToDosArray
renderList();
// console.log(todoItemText)
console.log(todos);