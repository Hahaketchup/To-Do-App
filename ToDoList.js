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

    var deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm float-right delete';
    deleteButton.appendChild(document.createTextNode('X'));

    ul.appendChild(deleteButton);

    toDoList.appendChild(ul);

    document.getElementById('input').value ='';    
}

function removeItem(event) {
    if(event.target.classList.contains('delete')) {
        var ul = event.currentTarget.parentElement;
        toDoList.removeChild(ul);
    }
}

function strikethrough(event) {
    if(event.target.classList.contains('list-item')) {
        if(toDoList.style.textDecoration != "line-through") {
            var ul = event.target.parentElement;
            toDoList.style.textDecoration = "line-through";
    }       else {
            var ul = event.target.parentElement;
            toDoList.style.textDecoration = "";

        // return event;
        }
    }
}