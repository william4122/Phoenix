let input = document.getElementById("file-upload");
input.addEventListener("change", function(event) {
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.onload = function(event) {
    let logText = event.target.result;
    // Create a list of keywords for each class
    let logDangerKeywords = ["ERR", "Could not fetch jobs: Invalid server response: 404", "fail"];
    let logGoodKeywords = ["success", "Results sent, scan is complete", "completed"];
    let logInfoKeywords = ["[INF", "Waiting for remote API to approve upload", "status"];

    // Apply the highlightKeywords function to each keyword list
    logText = highlightKeywords(logText, logDangerKeywords, "logdanger");
    logText = highlightKeywords(logText, logGoodKeywords, "loggood");
    logText = highlightKeywords(logText, logInfoKeywords, "loginfo");

    // Display the log file with the keywords highlighted in the appropriate class
    let logsElement = document.getElementById("logs");
    logsElement.innerHTML = logText2;
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
