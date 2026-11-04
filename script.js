// ===== Grab elements from the page =====
const taskInput = document.getElementById("taskInput");
const dueInput = document.getElementById("dueInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const taskCount = document.getElementById("taskCount");
const clearBtn = document.getElementById("clearBtn");

// ===== Task data =====
// Each task is an object: { id, text, due, completed }
// Try to load previously saved tasks from localStorage; default to an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ===== Save tasks to localStorage =====
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== Format a due date string for display, and check if it's overdue =====
function formatDue(dueStr) {
  if (!dueStr) return null;

  const due = new Date(dueStr + "T23:59:59"); // task isn't overdue until the day ends
  const now = new Date();
  const isOverdue = due < now;

  const label = due.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return { label: `Due ${label}`, isOverdue };
}

// ===== Render the entire task list =====
function renderTasks() {
  taskList.innerHTML = "";

  // Sort by due date: tasks with no due date go last, earlier dates come first
  const sorted = [...tasks].sort((a, b) => {
    if (!a.due && !b.due) return 0;
    if (!a.due) return 1;
    if (!b.due) return -1;
    return new Date(a.due) - new Date(b.due);
  });

  sorted.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    // Checkbox for completion status
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleComplete(task.id));

    // Task text + due date
    const textWrap = document.createElement("div");
    textWrap.className = "task-text";

    const nameSpan = document.createElement("span");
    nameSpan.className = "task-name";
    nameSpan.textContent = task.text;
    textWrap.appendChild(nameSpan);

    const dueInfo = formatDue(task.due);
    if (dueInfo) {
      const dueSpan = document.createElement("span");
      dueSpan.className = "due-date" + (dueInfo.isOverdue && !task.completed ? " overdue" : "");
      dueSpan.textContent = dueInfo.label + (dueInfo.isOverdue && !task.completed ? " (overdue)" : "");
      textWrap.appendChild(dueSpan);
    }

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "✕";
    delBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(textWrap);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  // Empty state message
  emptyMessage.style.display = tasks.length === 0 ? "block" : "none";

  // Task counter
  const activeCount = tasks.filter((t) => !t.completed).length;
  taskCount.textContent = `${activeCount} task${activeCount === 1 ? "" : "s"} left`;
}

// ===== Add a new task =====
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return; // ignore empty input

  tasks.push({
    id: Date.now(), // timestamp as a simple unique id
    text: text,
    due: dueInput.value || null,
    completed: false,
  });

  taskInput.value = "";
  dueInput.value = "";
  taskInput.focus();

  saveTasks();
  renderTasks();
}

// ===== Toggle a task's completed status =====
function toggleComplete(id) {
  tasks = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTasks();
  renderTasks();
}

// ===== Delete a single task =====
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

// ===== Remove all completed tasks =====
function clearCompleted() {
  tasks = tasks.filter((t) => !t.completed);
  saveTasks();
  renderTasks();
}

// ===== Event bindings =====
addBtn.addEventListener("click", addTask);

// Allow pressing Enter in the text field to add a task
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

clearBtn.addEventListener("click", clearCompleted);

// ===== Initial render =====
renderTasks();
