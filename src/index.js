let currentTask = "";
let progress = 0;
let goal = 100;

function updateUI() {
  const taskEl = document.getElementById("tasktext");
  const barEl = document.getElementById("progressbar");
  const valueEl = document.getElementById("progressvalue");

  if (taskEl) taskEl.textContent = currentTask;
  if (barEl) barEl.style.width = `${(progress / goal) * 100}%`;
  if (valueEl) valueEl.textContent = `${progress} / ${goal}`;
}

function incrementProgress() {
  if (progress < goal) {
    progress++;
    updateUI();
  }
}

function showTask() {
  const tasks = [
    "Catch 10 fish",
    "Chop 100 logs",
    "Burn 50 logs",
    "Mine 20 ores",
    "Craft 10 runes",
    "Kill 5 goblins"
  ];
  currentTask = tasks[Math.floor(Math.random() * tasks.length)];
  progress = 0;
  goal = Math.floor(Math.random() * 51) + 50; // random goal between 50–100
  updateUI();
}

// 🔁 Automatically load a task when the overlay starts
document.addEventListener("DOMContentLoaded", showTask);

// Make functions available to Alt1 and HTML buttons
window.SkillTask = {
  incrementProgress,
  showTask
};

