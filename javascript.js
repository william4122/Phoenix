// JavaScript for processing the log file and applying the appropriate styles
document.getElementById('log-file').addEventListener('change', processLogFile);

function processLogFile() {
    // Get the selected log file
    let logFile = document.getElementById('log-file').files[0];

    // Read the log file
    let fileReader = new FileReader();
    fileReader.onload = function(e) {
        let logText = e.target.result;
        
        // Define the keywords and their corresponding styles
        let keywords = {
            "Agent has started": "logsuccess",
            "Starting as windows service": "logwarning",
            "Results sent scan is complete": "logsuccess",
            "Found matches!": "logsuccess",
            "Yara scan completed.": "logwarning",
            "Result=Good.": "logsuccess",
            "Cannot execute jobs: Unable to post data: error sending request for url": "logdanger",
            "Service stop signal received.": "logwarning",
            "Cannot save RTS data: unable to open database file": "logdanger",
            "Received stop signal from service controller": "logwarning",
            "Error communicating with API: Unable
