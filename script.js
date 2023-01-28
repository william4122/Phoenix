let input = document.getElementById("file-upload");
input.addEventListener("change", function(event) {
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.onload = function(event) {
    let logText = event.target.result;
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
  };
  reader.readAsText(file);
});

function highlightKeywords(logText, keywords, className) {
  // Iterate through the list of keywords
  for (let i = 0; i < keywords.length; i++) {
    let keyword = keywords[i];
    // Create a regular expression with the keyword and the global flag
    let regex = new RegExp(keyword, "g");
    // Replace all occurrences of the keyword with a span element with the className class
    logText = logText.replace(regex, `<span class="${className}">${keyword}</span>`);
  }
  return logText;
}
document.addEventListener("DOMContentLoaded", function() {
  convertTimestampsOnHover();
});
let file = document.getElementById("file-upload").files[0];
let reader = new FileReader();
reader.onload = function() {
  let logText = reader.result;
  logText = convertTimestamps(logText);
  document.getElementById("logs").innerHTML = logText;
  convertTimestampsOnHover();
};
document.getElementById("file-upload").addEventListener("change", function() {
  let file = this.files[0];
  let reader = new FileReader();
  reader.onload = function() {
    let logText = reader.result;
    logText = convertTimestamps(logText);
    document.getElementById("logs").innerHTML = logText;
    convertTimestampsOnHover();
  };
  reader.readAsText(file);
});
function convertTimestamps(logText) {
  // Create a regular expression to match timestamps in the format "YYYY-MM-DD HH:mm:ss UTC"
  let regex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} UTC/g;
  // Replace all occurrences of the timestamp with a span element with the "timestamp" class
  return logText.replace(regex, `<span class="timestamp">$&</span>`);
}
function convertTimestampsOnHover() {
  let timestampElements = document.getElementsByClassName("timestamp");
  for (let i = 0; i < timestampElements.length; i++) {
    let timestampElement = timestampElements[i];
    timestampElement.onmouseover = function() {
      let utcTimestamp = timestampElement.textContent;
      let localTimestamp = new Date(utcTimestamp);
      localTimestamp = localTimestamp.toLocaleString();
      timestampElement.textContent = localTimestamp;
    }
    timestampElement.onmouseout = function() {
      timestampElement.textContent = utcTimestamp;
    }
  }
}
