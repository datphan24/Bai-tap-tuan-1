const inputContent = document.querySelector('.add-content .add-input');
const form = document.querySelector('form');
const todos = document.querySelector('.list-todo');
const all = 'all';
const active = 'active';
const completed = 'completed';

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let contentValue = inputContent.value.trim();
    if(contentValue) {
        addTodoElement({
            text: contentValue,
        })
    }
    inputContent.value = '';
})
function addTodoElement(todo) {
    let liTodo = document.createElement('li');
    
    liTodo.innerHTML = `
        <span class="">${todo.text}</span>
        <input
            type="text"
            value="${todo.text}"
            class="add-input hidden"
        />
        <span>
              <i class="fa fa-times-circle" aria-hidden="true"></i>
        </span>
    `
    
    liTodo.setAttribute('class', 'item-todo general-size')
    //delete a todo
    liTodo.querySelector('span:last-child')
        .addEventListener('click', function (e) {
            this.parentElement.remove()
        })
    
    var spanTodo = liTodo.querySelector('span:first-child')
    // tick todo completed
    spanTodo.addEventListener('click', function(e) {
        this.classList.toggle('completed')
    })
    // edit todo
    spanTodo.addEventListener('dblclick', function(e) {
        this.classList.add('hidden')
        if (spanTodo.classList.contains('hidden')) {
            let editTodo = liTodo.querySelector('.add-input')
            editTodo.classList.remove('hidden')
            editTodo.addEventListener('keyup', function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    spanTodo.innerText = editTodo.value.trim()
                    spanTodo.classList.remove('hidden')
                    editTodo.classList.add('hidden')
                }
            })
        }  
    })
    
    todos.appendChild(liTodo)
}

function getActive() {
    let buttonAll = document.getElementById(all);
    let buttonActive = document.getElementById(active);
    let buttonCompleted = document.getElementById(completed);
    let listTodo = document.querySelectorAll('.item-todo')

    buttonAll.addEventListener('click', function() {
        this.classList.add('on')
        buttonActive.classList.remove('on')
        buttonCompleted.classList.remove('on')
    })
    buttonActive.addEventListener('click', function() {
        this.classList.add('on')
        buttonAll.classList.remove('on')
        buttonCompleted.classList.remove('on')
        listTodo.forEach(item => {
            // if (item.querySelector('span:first-child').classList.contains('hidden')) {
            //     item.classList.add('hidden')
            // }
            console.log(item)
        })
    })
    buttonCompleted.addEventListener('click', function() {
        this.classList.add('on')
        buttonAll.classList.remove('on')
        buttonActive.classList.remove('on')
    })
}
getActive()