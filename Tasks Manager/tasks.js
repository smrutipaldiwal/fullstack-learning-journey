const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

//Trigger action on button click
addBtn.addEventListener('click', addTask);

//Trigger action on enter key press
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    // Prevent submission of empty fields
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Generate explicit list item wrapper
    const li = document.createElement('li');

    // Create container for task text
    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;
    li.appendChild(textSpan);

    // Create click interaction to cross off items
    textSpan.addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    // Generate removal button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    
    // Create click interaction to delete item
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(li);
    });

    // Append delete button to row, then row to container list
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Wipe previous input field clean
    taskInput.value = '';
}