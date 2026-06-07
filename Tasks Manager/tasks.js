// Select DOM Elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const searchInput = document.getElementById('taskSearch');

const totalCountE1 = document.getElementById('total-count');
const completedCountE1 = document.getElementById('completed-count');
const pendingCountE1 = document.getElementById('pending-count');

// Listen for real-time keystrokes
searchInput.addEventListener('input', () => {
    render();
});

// Load existing tasks from LocalStorage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks array into LocalStorage whenever it changes
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const text = taskInput.value.trim();
    if(!text) return;

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });
    taskInput.value = '';    
    saveToLocalStorage();
    render();
});

// Primary Render Engine
function render() {
    taskList.innerHTML = '';

    const searchText = searchInput.value.toLowerCase();

    const filteredTasks = tasks.filter(task => 
        task.text.toLowerCase().includes(searchText)
    );

    // Counters initialization
    let total = tasks.length;

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `<li class="no-tasks">No tasks found.</li>`;
        return; 
    }
    completed = tasks.filter(task => task.completed).length;
    pending = tasks.filter(task => !task.completed).length;

    filteredTasks.forEach(task => {
        // Node creation
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'done' : ''}`;

        li.innerHTML = `
        <span>${task.text}</span>

            <div class="task-buttons">
                <button class="complete-btn" onclick="toggleTask(${task.id})">✔</button>
                <button class="edit-btn" onclick="editTask(${task.id})">📝</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">✖</button>
            </div>
        `;
        taskList.appendChild(li);   
        });
        // Update Counter Elements
        totalCountE1.textContent = total;
        completedCountE1.textContent = completed;
        pendingCountE1.textContent = pending;
}

// Action Handlers
window.toggleTask = function(id) {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    saveToLocalStorage();
    render();
};

window.deleteTask = function(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveToLocalStorage();
    render();
};

window.editTask = function(id) {
    const task = tasks.find(t => t.id === id);

    const newText = prompt("Edit task:", task.text);

    if (newText === null) return;

    if (newText.trim() === "") {
        alert("Task cannot be empty.");
        return;
    }

    if (newText.trim() === task.text)
    return;

    task.text = newText.trim();
    saveToLocalStorage(); 
    render();
};  

render();