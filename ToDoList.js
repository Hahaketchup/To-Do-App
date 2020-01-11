//states where the functions go
var itemInput = document.getElementById('todo-input');
var toDoList = document.getElementById('todo-list');

//adds specifications to the functions
itemInput.addEventListener('submit', addItem);

toDoList.addEventListener('click', strikethrough);

toDoList.addEventListener('click', remove);

toDoList.addEventListener('click', toggleDelete);

const todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos);
console.log(typeof(todos));



//allows an item input
function addItem(event) {
    event.preventDefault();

    let newItem = document.getElementById('todo-input').value;

    let ul = document.createElement('li');
    ul.className = 'list-item';
    ul.appendChild(document.createTextNode(newItem));

    let completeBtn = document.createElement('input');
    completeBtn.className = 'checkbox btn-success btn-sm float right mt-1 mr-2 mb-1 completeBtn';
    completeBtn.appendChild(document.createTextNode('Completed'));
    completeBtn.setAttribute("type", "checkbox");
    ul.appendChild(completeBtn);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm float-right delete';
    deleteButton.appendChild(document.createTextNode('X'));
    deleteButton.style.visibility = "hidden";
    deleteButton.style.background = "red";
    deleteButton.style.color = "white";
    deleteButton.style.font = "bold";
    ul.appendChild(deleteButton);

    toDoList.appendChild(ul);

    document.getElementById('todo-input').value =''; 

    todos.push(newItem);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderList() {
    const list = [document.getElementById('toDo')];

    for(let i = 0; i < todos.length; i++) {
        console.log(todos[i]);

        let ul = document.createElement('li');
        ul.className = 'list-item';
        ul.appendChild(document.createTextNode(todos[i]));

        let completeBtn = document.createElement('input');
        completeBtn.className = 'checkbox btn-success btn-sm float right mt-1 mr-2 mb-1 completeBtn';
        completeBtn.appendChild(document.createTextNode('Completed'));
        completeBtn.setAttribute("type", "checkbox");
        ul.appendChild(completeBtn);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm float-right delete';
        deleteButton.appendChild(document.createTextNode('X'));
        deleteButton.style.visibility = "hidden";
        deleteButton.style.background = "red";
        deleteButton.style.color = "white";
        deleteButton.style.font = "bold";
        ul.appendChild(deleteButton);

        toDoList.appendChild(ul);
    }
};

function remove(event) {

    if(event.target.classList.contains('delete')) {
        let i = 0;
        let ul = event.target.parentElement;
        toDoList.removeChild(ul);
        todos.splice(i, 1);
        }

    localStorage.setItem('todos', JSON.stringify(todos));
};

function toggleDelete(event) {
    const completed = event.target;
    if(event.target.classList.contains('completeBtn')) {
        if(completed.checked) {
            completed.nextSibling.style.visibility = "visible";
        } else {
            completed.nextSibling.style.visibility = "hidden";
        }
    }
};

function strikethrough(event) {
    let i = 0;
    const strike = event.target.previousSibling;
    if(event.target.classList.contains('completeBtn')) {
        if(event.target.checked) {
            strike.parentElement.style.textDecoration = "line-through";
        } else {
            strike.parentElement.style.textDecoration = "";
        }
    }    
    localStorage.setItem('todos', JSON.stringify(todos));
};

renderList();