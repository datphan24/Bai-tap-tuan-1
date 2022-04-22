const inputContent = document.querySelector('.add-content .add-input')
const form = document.querySelector('form')
const todos = document.querySelector('.list-todo')
const checkBox = document.querySelector('.checkbox');
const all = 'all'
const active = 'active'
const completed = 'completed'
const buttonAll = document.getElementById(all)
const buttonActive = document.getElementById(active)
const buttonCompleted = document.getElementById(completed)

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let contentValue = inputContent.value.trim()
  inputContent.parentElement.firstElementChild.checked = false
  if (contentValue) {
    addTodoElement({
      text: contentValue,
      status: '',
    })
    checkActive()
    saveTodoList()
  }
  inputContent.value = ''
})
function addTodoElement(todo) {
  let liTodo = document.createElement('li')

  liTodo.innerHTML = `
    <span class='${todo.status}'>${todo.text}</span>
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
  //delete a todo use icon x
  liTodo.querySelector('span:last-child')
    .addEventListener('click', function(e) {
      this.parentElement.remove()
      //delete a todo then update the quantity
      count()
      hiddenFooter()
      saveTodoList()
      tickAllTodo()
    })
  // tick todo completed
  let spanTodo = liTodo.querySelector('span:first-child')
  spanTodo.addEventListener('click', function(e) {
    this.classList.toggle('completed')
    checkActive()
    //checked checkbox when all span completed
    tickAllTodo()
    //completed a todo then update the quantity
    count()
    saveTodoList()
  })
  // edit todo
  spanTodo.addEventListener('dblclick', function(e) {
    this.classList.add('hidden')
    if (spanTodo.classList.contains('hidden')) {
      let editTodo = liTodo.querySelector('.add-input')
      editTodo.classList.remove('hidden')
      editTodo.focus()
      editTodo.setSelectionRange(editTodo.value.length, editTodo.value.length);
      editTodo.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
          spanTodo.innerText = editTodo.value.trim()
          spanTodo.classList.remove('hidden')
          editTodo.classList.add('hidden')
          saveTodoList()
        }
      })
      editTodo.addEventListener('blur', (e) => {
        if (editTodo.value === '') {
          this.parentElement.remove()
          count()
        }
        spanTodo.innerText = editTodo.value.trim()
        editTodo.classList.add('hidden')
        spanTodo.classList.remove('hidden')
        saveTodoList()
      })
    }
  })

  todos.appendChild(liTodo)
  getActive()
  count()
  tickAllTodo()
  deleteCompleted()
  hiddenFooter()
}
function tickAllTodo() {
  let listAllSpan = document.querySelectorAll('.item-todo span:first-child')
  let listAllSpanComplete = document.querySelectorAll('.item-todo .completed')
  checkBox.checked = false
  //if there isn't value then hidden
  if (listAllSpan.length === 0) {
    checkBox.style.opacity = 0
  }else {
    checkBox.style.opacity = 1;
  }
  //if all span completed then checked checkbox
  if (listAllSpan.length === listAllSpanComplete.length) {
    checkBox.checked = true
  }
  checkBox.addEventListener('click', function() {
    if (this.checked == true) {
      listAllSpan.forEach(item => {
        if (!item.classList.contains('completed')) {
          item.classList.add('completed');
          count()
          checkActive()
          saveTodoList()
        }
      })
    } else {
      listAllSpan.forEach(item => {
        if (item.classList.contains('completed')) {
          item.classList.remove('completed');
          count()
          checkActive()
          saveTodoList()
        }
      })
    }
  })
}

function getActive() {
  let itemTodos = document.querySelectorAll('.item-todo')

  //button all
  buttonAll.addEventListener('click', function() {
    this.classList.add('on')
    buttonActive.classList.remove('on')
    buttonCompleted.classList.remove('on')

    itemTodos.forEach(item => {
      if (item.classList.contains('hidden')) {
        item.classList.remove('hidden')
      }
    })
  })
  //button active
  buttonActive.addEventListener('click', function() {
    this.classList.add('on')
    buttonAll.classList.remove('on')
    buttonCompleted.classList.remove('on')

    itemTodos.forEach(item => {
      if (item.querySelector('span:first-child').classList.contains('completed')) {
        item.classList.add('hidden')
      } else {
        item.classList.remove('hidden')
      }
    })
  })
  //button completed
  buttonCompleted.addEventListener('click', function() {
    this.classList.add('on')
    buttonAll.classList.remove('on')
    buttonActive.classList.remove('on')

    itemTodos.forEach(item => {
      if (item.querySelector('span:first-child').classList.contains('completed')) {
        item.classList.remove('hidden')
      } else {
        item.classList.add('hidden')
      }
    })
  })
}
function count() {
  let listAllSpan = document.querySelectorAll('.item-todo span:first-child')
  let listSpanCompleted = document.querySelectorAll('.item-todo .completed')
  let countNumber = document.querySelector('.number-item')
  let count = listAllSpan.length - listSpanCompleted.length

  countNumber.innerHTML = `${count}`
}
function deleteCompleted() {
  let buttonClearCompleted = document.querySelector('#clear-completed')

  buttonClearCompleted.addEventListener('click', function () {
    let listSpanCompleted = document.querySelectorAll('.item-todo .completed')
    listSpanCompleted.forEach(listSpanCompleted => {
      listSpanCompleted.parentElement.remove()
      hiddenFooter()
      tickAllTodo()
      saveTodoList()
    })
  })
}
function hiddenFooter() {
  let itemTodos = document.querySelectorAll('.item-todo')
  let stat = document.querySelector('.stat')
  let footer = document.querySelector('footer')

  if (itemTodos.length == 0) {
    stat.classList.add('hidden')
    footer.classList.add('hidden')
  } else {
    stat.classList.remove('hidden')
    footer.classList.remove('hidden')
  }
}
function checkActive() {
  let liTodo = document.querySelectorAll('.item-todo')
  liTodo.forEach(item => {
    let spanTodo = item.querySelector('span:first-child')

    if (buttonActive.classList.contains('on')) {
      if (spanTodo.classList.contains('completed')) {
        item.classList.add('hidden')
      } else {
        item.classList.remove('hidden')
      }
    } else if (buttonCompleted.classList.contains('on')) {
      if (!spanTodo.classList.contains('completed')) {
        item.classList.add('hidden')
      } else {
        item.classList.remove('hidden')
      }
    }
  })
}
function saveTodoList() {
  let todoList = document.querySelectorAll('.item-todo')
  let todoStorage = []
  todoList.forEach((item) => {
    let text = item.querySelector('span:first-child').innerText
    let status = item.querySelector('span:first-child').getAttribute('class')

    todoStorage.push({
      text,
      status
    })
  })
  localStorage.setItem('todoList', JSON.stringify(todoStorage))
}

function init() {
  let data = JSON.parse(localStorage.getItem('todoList'))
  data.forEach(item => {
    addTodoElement(item)
  })
}
init()
