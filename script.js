// Add event listener for dAV log file input
document.getElementById("file-upload-dav").addEventListener("change", function(event) {
  processFile(event, 'dav-logs');
});

// Add event listener for dEDR log file input
document.getElementById("file-upload-dedr").addEventListener("change", function(event) {
  processFile(event, 'dedr-logs');
});

function processFile(event, logContainerId) {
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.onload = function(event) {
    let logText = event.target.result;
    // Process log text (highlight keywords, convert timestamps, etc.)
    logText = processLogText(logText); // Implement this function as needed
    document.getElementById(logContainerId).innerHTML = logText;
  };
  reader.readAsText(file);
}

function processLogText(logText) {
  // Implement the logic for processing log text (highlighting, timestamp conversion, etc.)
  return logText;
}

// Other functions (highlightKeywords, convertTimestamps, convertTimestampsOnHover, etc.)
function processLogText(logText) {
  // Split the log text into lines
  const lines = logText.split("\n");

  // Define mappings between log level labels and CSS classes
  const logLevelMappings = {
    "[INF]": "loginfo",
    "[ERR]": "logdanger",
    // Add other mappings as needed
  };

  // Process each line and apply the appropriate class and timestamp conversion
  const processedLines = lines.map(line => {
    let processedLine = line;

    // Apply log level class
    for (const [label, className] of Object.entries(logLevelMappings)) {
      if (processedLine.includes(label)) {
        processedLine = `<span class="${className}">${processedLine}</span>`;
        break; // Stop checking for other log levels if a match is found
      }
    }

    // Apply timestamp conversion
    processedLine = convertTimestamps(processedLine);

    return processedLine;
  });

  // Join the processed lines back into a single string
  return processedLines.join("\n");
}

function convertTimestamps(logText) {
  // Create a regular expression to match timestamps in the format "YYYY-MM-DD HH:mm:ss UTC"
  let regex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} UTC/g;
  
  // Replace all occurrences of the timestamp with a span element with the "timestamp" class
  return logText.replace(regex, match => `<span class="timestamp">${match}</span>`);
}

// Continue with the rest of your code...
