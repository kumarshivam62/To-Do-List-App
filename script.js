const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage when the app starts
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div class="actions">
                <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Done'}</button>
                <button onclick="deleteTask(${index})" style="color:red;">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
    // Save the current state to localStorage
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// Add a new task
addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text !== "") {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        renderTasks();
    }
});

// Toggle Complete
window.toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
};

// Delete Task
window.deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
};

// Initial render
renderTasks();