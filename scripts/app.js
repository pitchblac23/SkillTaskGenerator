const skillActions = {
  Woodcutting: "Chop",
  Fishing: "Catch",
  Mining: "Mine",
  // Add more if you include new skills later
};

const skillTasks = {
  Woodcutting: ["choking ivy", "yew trees"],
  Fishing: ["Fish sharks at Menaphos", "Try barbarian fishing at Otto's Grotto"],
  Mining: ["Mine Seren Stones in Prifddinas", "Banite rocks in Fremennik"]
};

function showTask() {
  const skill = document.getElementById("skill-select").value;
  const tasks = skillTasks[skill];
  const task = tasks[Math.floor(Math.random() * tasks.length)];

  // Add a randomized quantity between 10 and 100 (you can tweak this per skill)
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