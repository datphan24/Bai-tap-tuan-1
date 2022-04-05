let inputContent = document.querySelector('.add-input');
let form = document.querySelector('form');
let todos = document.querySelector('.list-todo');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    let contentValue = inputContent.value.trim();
    if(contentValue) {
        addTodoElement({
            text: contentValue,
        })
    }
    inputContent.value = '';
})
function addTodoElement(todo) {
    var li = document.createElement('li');
    
    li.innerHTML = `
        <span>${todo.text}</span>
        <span><i class="fa fa-times-circle" aria-hidden="true"></i></span>
    `
    li.setAttribute('class', 'item-todo general-size')
    li.querySelector('span:first-child').addEventListener('click', function(e) {
        this.classList.toggle('completed')
    })
    li.querySelector('span:last-child').addEventListener('click', function(e) {
        this.parentElement.remove()
    })
    todos.appendChild(li)
}
