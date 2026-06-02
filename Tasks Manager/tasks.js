// Array holding internal task states
let tasks = [];

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');

const totalCountE1 = document.getElementById('total-count');
const completedCountE1 = document.getElementById('completed-count');
const pendingCountE1 = document.getElementById('pending-count');

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const text = taskInput.value.trim();
    if(!text) return;

    tasks.push({id: Date.now(), text: text, completed: false});
    taskInput.value = '';

    render();
});

// Primary Render Engine
function render() {
    taskList.innerHTML = '';

    // Counters initialization
    let total = tasks.length;
    let pending = 0;
    let completed = 0;

    tasks.forEach(task => {
        if (task.completed) completed++;
        else pending++;

        // Node creation
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'done' : ''}`;

        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-buttons">
                <button class="complete-btn" onclick="toggleTask(${task.id})">✔</button>
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
    render();
};

window.deleteTask = function(id) {
    tasks = tasks.filter(t => t.id !== id);
    render();
};