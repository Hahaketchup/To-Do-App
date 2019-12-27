//states where the functions go
var itemInput = document.getElementById('main-input');
var toDoList = document.getElementById('toDo');

//adds specifications to the functions
itemInput.addEventListener('submit', addItem);

toDoList.addEventListener('click', strikethrough);

// toDoList.addEventListener('click', removeStrike);

toDoList.addEventListener('click', removeItem);

//allows an item input
function addItem(event) {
    event.preventDefault();

    var newItem = document.getElementById('input').value;

    var ul = document.createElement('ul');
    ul.className = 'list-item';


    ul.appendChild(document.createTextNode(newItem));

    var checkbox = document.createElement('input');
    checkbox.className = 'btn checkbox';
    checkbox.setAttribute('type', 'checkbox');
    ul.prepend(checkbox);

    var deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm float-right delete';
    deleteButton.appendChild(document.createTextNode('X'));



    ul.appendChild(deleteButton);

    toDoList.appendChild(ul);

    document.getElementById('input').value ='';    
}

function removeItem(event) {
    if(event.target.classList.contains('delete')) {
        var ul = event.target.parentElement;
        toDoList.removeChild(ul);
    }
}

function strikethrough(event) {
    const strike = event.target.nextSibling;
    if(event.target.checked) {
        strike.style.textDecoration = "line-through";
    } else {
        strike.style.textDecoration = "";
    }
}