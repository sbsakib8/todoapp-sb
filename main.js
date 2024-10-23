const todoForm = document.querySelector('.todo_form');
const todoInput = document.querySelector('.todo_input');
const searchInput = document.querySelector('.search_input');
const todoOutput = document.querySelector('.todo_output');

// addtodo item start
const addTodo =(e)=>{
    e.preventDefault();
    let todo = todoInput.value;
    if(todo){
     const id = Date.now();
     addTodoToLocalStorage({id,todo,completed:false});
     const todoItem = document.createElement('div');
     todoItem.classList = `todo_item ${id}`;
     todoItem.innerHTML = `
     <input type="checkbox" class= "todo_check">
     <input type= "text" class="todo_text" value=${todo} disabled>
     <button class="todo_edit">Edit</button>
     <button class="todo_delete">Delete</button>
     `;
     todoOutput.prepend(todoItem);
     todoInput.value = "";
    }

};

const addTodoToLocalStorage = (todo)=>{
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if(!tasks){
       tasks = [];
    }
    tasks.push(todo);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

const getTodo =(e)=>{
    let tasks = localStorage.getItem("tasks");
    if(tasks){
     tasks =JSON.parse(tasks);
     tasks.forEach((task)=>{
        const todoItem = document.createElement('div');
     todoItem.classList = `todo_item ${task.id}`;
     todoItem.innerHTML = `
     <input type="checkbox" class= "todo_check" ${task.completed?"checked":""}>
     <input type= "text" class="todo_text ${task.completed ? "strike": ""}" value=${task.todo} disabled>
     <button class="todo_edit">Edit</button>
     <button class="todo_delete">Delete</button>
     `;
     todoOutput.prepend(todoItem);
     })
    }
};
// addtodo item end
// ========================
// delete todo item start
const deleteTodo = (e) => {
    if(e.target.className === "todo_delete"){
        deleteTodoFromLocalStorage(e.target.parentElement.classList[1]);
        e.target.parentElement.remove();
    }
};
const deleteTodoFromLocalStorage = (id)=> {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter((task) => task.id !== parseInt(id));
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// delete todo item end
// =======================
// checkedtodo item start
const chechedTodo =(e)=>{
    if(e.target.className === "todo_check"){
        const id = e.target.parentElement.classList[1];
        const checked = e.target.checked;

        if(checked){
            e.target.nextElementSibling.style.textDecoration = "line-through";

        }else{
            e.target.nextElementSibling.style.textDecoration = "none";
        }

        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks = tasks.map(task => {
            if(task.id === parseInt(id)){
                task.completed = checked;
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
};

// // checkedtodo item end
// +============================
// editTodo item start
const editTodo =(e)=>{
    if(e.target.className === "todo_edit"){
        const id = e.target.parentElement.classList[1];
        const todoText = e.target.parentElement.querySelector(".todo_text");
        if(todoText.disabled){
            todoText.disabled = false;
            e.target.textContent = "Save";
        }else{
            todoText.disabled = true;
            e.target.textContent = "Edit";
            editTodoInLocalstorage(id,todoText.value);
        }
    }
};

const editTodoInLocalstorage = (id ,todo)=>{
     let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.map(task =>{
        if(task.id === parseInt(id) ){
          task.todo = todo;
        }
        return task ;
    });  
    localStorage.setItem("tasks", JSON.stringify(tasks));  
}
// editTodo item end
// ========================
// searchTodo item start

const searchTodo =(e)=>{
    const searchText = e.target.value.toLowerCase();
    const todoItems = document.querySelectorAll(".todo_item");
    todoItems.forEach(todoItem =>{
        const todo = todoItem.querySelector(".todo_text").value.toLowerCase();
        if(todo.indexOf(searchText) !== -1){
            todoItem.style.display = "flex";
        }else{
            todoItem.style.display = "none";
        }
    })
};

// searchTodo item end

// event listeners 
todoForm.addEventListener("submit",addTodo);
todoOutput.addEventListener("click",deleteTodo);
todoOutput.addEventListener("click",chechedTodo);
todoOutput.addEventListener("click",editTodo);
document.addEventListener("DOMContentLoaded",getTodo);
searchInput.addEventListener("keyup",searchTodo);
