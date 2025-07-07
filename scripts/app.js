// ===== Skill & Task Definitions =====
const skillActions = {
  Woodcutting: "Chop",
  Fishing: "Catch",
  Mining: "Mine",
};

const skillTasks = {
  Woodcutting: ["Trees", "Oak Trees", "Willow Trees", "Teak Trees", "Maple Trees", "Acadia Trees", "Mahogany Trees", "Choking Ivy", "Yew Trees", "Magic Trees", "Elder Trees"],
  Fishing: ["Sharks", "Shrimps"],
  Mining: ["Coal Rocks", "Runeite Rocks"]
};

// ===== Global State =====
let progress = 0;
let goal = 100;

// ===== Task Logic =====
function showTask() {
  const skill = document.getElementById("skill-select").value;
  const tasks = skillTasks[skill];
  const task = tasks[Math.floor(Math.random() * tasks.length)];

  goal = Math.floor(Math.random() * 301) + 100; // 100–400
  progress = 0;

  const action = skillActions[skill] || "Do";
  document.getElementById("task-overlay").innerText = `${action} ${goal} ${task}`;
  updateProgressUI();
}

// ===== Progress Tracking =====
function incrementProgress() {
  if (progress < goal) {
    progress++;
    updateProgressUI();
  }
}

function updateProgressUI() {
  document.getElementById("task-progress").innerText = `${progress}/${goal}`;
  const bar = document.getElementById("progressbar");
  if (bar) {
    bar.style.width = `${(progress / goal) * 100}%`;
  }
}

// ===== Initialize App =====
document.addEventListener("DOMContentLoaded", () => {
  showTask(); // generate initial task
});

// ===== Global Exports for UI =====
window.showTask = showTask;
window.incrementProgress = incrementProgress;