const toDoform = document.querySelector(".js-todoForm"),
    toDoinput = toDoform.querySelector("input"),
    toDOList = document.querySelector(".js-todoList");
const TODOS_LS = 'toDos';




let toDos = [];

function delTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDOList.removeChild(li);
    const cleanToDos = toDos. filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos 
    saveToDos();
}
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    delBtn.addEventListener("click", delTodo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDOList.appendChild(li);
    const toDoObj = { 
        text:text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}
function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoinput.value;
    paintToDo(currentValue);
    toDoinput.value = "";
}
function loadTodos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const paredToDos = JSON.parse(loadedToDos);
        paredToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })

    }
}
function init(){
    loadTodos();
    toDoform.addEventListener("submit", handleSubmit)
}

init();