let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("taskList");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

function renderTasks() {
  taskList.innerHTML = "";
  let completed = 0;

  const search = document.getElementById("searchTask").value.toLowerCase();
  const filterPriority = document.getElementById("filterPriority").value;

  tasks.forEach((task, index) => {
    if (
      (filterPriority === "All" || task.priority === filterPriority) &&
      (task.title.toLowerCase().includes(search) ||
       task.subject.toLowerCase().includes(search))
    ) {
      const li = document.createElement("li");
      li.className = `task-item priority-${task.priority} ${task.completed ? "completed" : ""}`;

      li.innerHTML = `
        <div class="task-details">
          <strong>${task.title}</strong> (${task.subject})<br>
          Due: ${task.dueDate} | Priority: ${task.priority}
        </div>
        <div>
          <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "✔"}</button>
          <button onclick="deleteTask(${index})">🗑</button>
        </div>
      `;

      taskList.appendChild(li);
      if (task.completed) completed++;
    }
  });

  // Progress bar update
  let percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  progressFill.style.width = percent + "%";
  progressText.textContent = percent + "%";
}

function addTask() {
  const title = document.getElementById("taskTitle").value;
  const subject = document.getElementById("taskSubject").value;
  const dueDate = document.getElementById("taskDueDate").value;
  const priority = document.getElementById("taskPriority").value;

  if (!title || !subject || !dueDate) {
    alert("Please fill all fields!");
    return;
  }

  tasks.push({ title, subject, dueDate, priority, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskSubject").value = "";
  document.getElementById("taskDueDate").value = "";

  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.getElementById("searchTask").addEventListener("input", renderTasks);
document.getElementById("filterPriority").addEventListener("change", renderTasks);

renderTasks();
