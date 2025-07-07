if (!window.alt1) alt1 = {};
if (!window.a1lib) a1lib = {};

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
  
  const action = skillActions[skill] || "Do"; // fallback if not defined
  
  document.getElementById("task-overlay").innerText = `${action}  ${quantity} ${task}`;
  document.getElementById("task-progress").innerText = `0/${quantity}`;

}

let currentCount = 0;
let quantity = 100; // ← or dynamically set via showTask()

function incrementProgress() {
  if (currentCount < quantity) {
    currentCount++;
    document.getElementById("task-progress").innerText = `${currentCount}/${quantity}`;
    document.getElementById("progress-bar-fill").style.width = `${(currentCount / quantity) * 100}%`;
  }
}

// 💡 Place your OCR function here:
function trackProgressOCR() {
  if (!window.alt1 || !alt1.captureSupport) {
    alert("Alt1 is not running or capture is not supported.");
    return;
  }

  const img = a1lib.captureHoldFullRs();
  if (!img) return;

  const ocrText = img.readText();
  console.log("OCR Output:", ocrText);

  if (ocrText.includes("You gain")) { // Adjust based on task type
    incrementProgress();
  }
}

setInterval(trackProgressOCR, 5000); // Scan every 5 seconds

window.showTask = showTask;