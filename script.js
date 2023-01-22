function highlightKeywords(logText, keywords, className) {
    //Iterate through the list of keywords
    for (let i = 0; i < keywords.length; i++) {
        let keyword = keywords[i];
        //Check if the keyword is present in the log file
        if (logText.indexOf(keyword) !== -1) {
            //If present, replace the keyword with a span element with the className class
            let span = `<span class="${className}">${keyword}</span>`;
            logText = logText.replace(keyword, span);
        }
    }
    return logText;
}

//Read the log file
let logFile = "path/to/log/file.txt";
let logText = readFileSync(logFile, 'utf8');

//Create a list of keywords for each class
let logDangerKeywords = ["error", "danger", "fail"];
let logGoodKeywords = ["success", "good", "completed"];
let logInfoKeywords = ["info", "notification", "status"];

//Apply the highlightKeywords function to each keyword list
logText = highlightKeywords(logText, logDangerKeywords, "logdanger");
logText = highlightKeywords(logText, logGoodKeywords, "loggood");
logText = highlightKeywords(logText, logInfoKeywords, "loginfo");

//Display the log file with the keywords highlighted in the appropriate class
console.log(logText);
