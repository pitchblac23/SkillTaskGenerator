const A1lib = require("alt1/base");

const skillActions = {
  // Add more if you include new skills later
  Woodcutting: "Chop",
  Fishing: "Catch",
  Mining: "Mine",
};

const skillTasks = {
  Woodcutting: ["Trees", "Oak Trees", "Willow Trees", "Teak Trees", "Maple Trees", "Acadia Trees", "Mahogany Trees", "Choking Ivy", "Yew Trees", "Magic Trees", "Elder Trees"],
  Fishing: ["Sharks", "Shrimps"],
  Mining: ["Coal Rocks", "Runeite Rocks"]
};

function showTask() {
  const skill = document.getElementById("skill-select").value;
  const tasks = skillTasks[skill];
  const task = tasks[Math.floor(Math.random() * tasks.length)];

  // Add a randomized quantity between 100 and 400 (you can tweak this per skill)
  const quantity = Math.floor(Math.random() * 301) + 100;
  progress = 0;
  
  const action = skillActions[skill] || "Do"; // fallback if not defined
  
  document.getElementById("task-overlay").innerText = `${action}  ${quantity} ${task}`;
  document.getElementById("task-progress").innerText = `0/${quantity}`;
  document.addEventListener("DOMContentLoaded", () => {
    showTask();
  });
}

// 🧠 Global state for tracking progress
let progress = 0;
let goal = 100;

function incrementProgress() {
  if (progress < goal) {
    progress++;
    updateProgressUI();
  }
}

function scanChatForProgress() {
  if (!A1lib.alt1) return; // Alt1 not running

  const chat = A1lib.getChatboxData(); // 🗨️ read RS chat text
  if (!chat?.length) return;

  const recent = chat.slice(-5).map(line => line.text.toLowerCase());

  for (const line of recent) {
    if (
      line.includes("you gain") ||
      line.includes("xp") ||
      line.includes("you catch") ||
      line.includes("you chop") ||
      line.includes("you mine")
    ) {
      console.log("📥 Chat Match:", line);
      incrementProgress();
      break;
    }
  }
}

function updateProgressUI() {
  document.getElementById("task-progress").innerText = `${progress}/${goal}`;

  const bar = document.getElementById("progressbar");
  if (bar) {
    bar.style.width = `${(progress / goal) * 100}%`;
  }
}

// ✅ Call showTask once on page load
document.addEventListener("DOMContentLoaded", showTask);

// 🌐 Make functions available to UI or Alt1
window.showTask = showTask;
window.incrementProgress = incrementProgress;
