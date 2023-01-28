// Wait for the page to fully load before running the code
document.addEventListener("DOMContentLoaded", function() {
  // Get the file upload element
  let fileUpload = document.getElementById("file-upload");
  // Listen for changes to the file upload element
  fileUpload.addEventListener("change", function() {
    // Get the selected file
    let file = this.files[0];
    // Create a new FileReader object
    let reader = new FileReader();
    // Listen for the file to finish loading
    reader.onload = function() {
      // Get the log file text
      let logText = reader.result;
      // Convert the timestamps to a more human-readable format
      logText = convertTimestamps(logText);
      // Display the log file text on the page
      document.getElementById("logs").innerHTML = logText;
      // Add hover functionality to the timestamps
      convertTimestampsOnHover();
    };
    // Start reading the file
    reader.readAsText(file);
  });
});

// This function converts timestamps in the format "YYYY-MM-DD HH:mm:ss UTC" to a more human-readable format
function convertTimestamps(logText) {
  // Create a regular expression to match timestamps in the format "YYYY-MM-DD HH:mm:ss UTC"
  let regex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} UTC/g;
  // Replace all occurrences of the timestamp with a span element with the "timestamp" class
  return logText.replace(regex, `<span class="timestamp">$&</span>`);
}

// This function adds hover functionality to the timestamps
function convertTimestampsOnHover() {
  // Get all elements with the "timestamp" class
  let timestampElements = document.getElementsByClassName("timestamp");
  // Iterate through the timestamp elements
  for (let i = 0; i < timestampElements.length; i++) {
    let timestampElement = timestampElements[i];
    // Listen for the mouseover event on the timestamp element
    timestampElement.onmouseover = function() {
      // Get the UTC timestamp from the element
      let utcTimestamp = timestampElement.textContent;
      // Convert the UTC timestamp to a local timestamp
      let localTimestamp = new Date(utcTimestamp);
      localTimestamp = localTimestamp.toLocaleString();
      // Update the element with the local timestamp
      timestampElement.textContent = localTimestamp;
    }
  }
}
// Get the file upload element
let input = document.getElementById("file-upload");
// Listen for changes to the file upload element
input.addEventListener("change", function(event) {
  // Get the selected file
  let file = event.target.files[0];
  // Create a new FileReader object
  let reader = new FileReader();
  // Listen for the file to finish loading
  reader.onload = function(event) {
    // Get the log file text
    let logText =
event.target.result;
// Create a list of keywords for each class
let logDangerKeywords = ["ERR", "Could not fetch jobs: Invalid server response: 404", "fail", "Service stop signal received.", "Cannot save RTS data: unable to open database file", "Received stop signal from service controller", "Cannot finish fetching user accounts:"];
let logGoodKeywords = ["success", "Results sent, scan is complete", "completed", "Agent has started", "Found matches!", "Yara scan completed." ];
let logInfoKeywords = ["INF", "Waiting for remote API to approve upload", "status", "Starting as windows service"];
    // Apply the highlightKeywords function to each keyword list
logText = highlightKeywords(logText, logDangerKeywords, "logdanger");
logText = highlightKeywords(logText, logGoodKeywords, "loggood");
logText = highlightKeywords(logText, logInfoKeywords, "loginfo");
// Display the log file with the keywords highlighted in the appropriate class
let logsElement = document.getElementById("logs");
logsElement.innerHTML = logText;
    event.target.result;
  };
// Read the selected file as text
reader.readAsText(file);
});
function highlightKeywords(logText, keywords, className) {
// Iterate through the list of keywords
for (let i = 0; i < keywords.length; i++) {
let keyword = keywords[i];
// Create a regular expression with the keyword and the global flag
let regex = new RegExp(keyword, "g");
// Replace all occurrences of the keyword with a span element with the className class
logText = logText.replace(regex, <span class="${className}">${keyword}</span>);
}
return logText;
}
