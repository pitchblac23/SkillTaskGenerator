"use strict";
// Create and initialize the chatbox reader
const reader = new window.ChatboxReader();
reader.find();
function scanChatForProgress() {
    const lines = reader.read();
    const newLines = lines.slice();
    for (const line of newLines) {
        const text = line.text.toLowerCase();
        if (text.includes("you gain") ||
            text.includes("you chop") ||
            text.includes("you catch") ||
            text.includes("you mine")) {
            incrementProgress();
            break;
        }
    }
}
// Define showTask() BEFORE exposing it to window!
function showTask() {
    console.log("✅ showTask() was called");
    // ... your existing task logic here
}
window.showTask = showTask;
