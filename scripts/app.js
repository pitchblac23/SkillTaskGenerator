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
function incrementProgress() {
  if (currentCount < quantity) {
    currentCount++;
    document.getElementById("task-progress").innerText = `${currentCount}/${quantity}`;
  }
}

window.showTask = showTask;