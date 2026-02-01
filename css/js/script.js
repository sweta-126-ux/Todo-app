let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let theme = localStorage.getItem("theme") || "dark";

document.body.classList.toggle("light", theme === "light");

document.querySelectorAll("#themeToggle").forEach(btn => {
  btn.onclick = () => {
    document.body.classList.toggle("light");
    theme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", theme);
  };
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = document.getElementById("taskInput").value;
  const reminder = document.getElementById("reminderInput").value;

  if (!text.trim()) return;

  tasks.push({
    text,
    completed: false,
    reminder: reminder || null
  });

  saveTasks();
  alert("Task added!");
}

function loadTasks() {
  const list = document.getElementById("taskList");
  if (!list) return;

  list.innerHTML = "";

  tasks.forEach((task, i) => {
    const div = document.createElement("div");
    div.className = "task" + (task.completed ? " completed" : "");

    div.innerHTML = `
      <div>
        <span>${task.text}</span>
        ${task.reminder ? `<small>⏰ ${new Date(task.reminder).toLocaleString()}</small>` : ""}
      </div>
      <div>
        <button onclick="toggleTask(${i})">✔</button>
        <button onclick="deleteTask(${i})">🗑</button>
      </div>
    `;
    list.appendChild(div);
  });
}

function toggleTask(i) {
  tasks[i].completed = !tasks[i].completed;
  saveTasks();
  loadTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  saveTasks();
  loadTasks();
}

/* Reminder check */
setInterval(() => {
  const now = new Date().toISOString();
  tasks.forEach(task => {
    if (task.reminder && task.reminder <= now && !task.completed) {
      alert("⏰ Reminder: " + task.text);
      task.reminder = null;
      saveTasks();
    }
  });
}, 60000);

loadTasks();
