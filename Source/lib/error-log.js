/**
 * Error log is an error handler that can be attached
 * to promises. 
 * 
 * You configure it with the name of a file. It will then
 * console.error errors and write them to that file with 
 * a timestamp.
 */
const fs = require('fs');
const moment = require('moment');
let logFilename = "error.log";

/**
 * SetFilename sets the file name for the log
 */
function SetFilename(filename) {
    logFilename = filename;
}

/**
 * Log error
 */
function Log(error) {
    console.error(error);

    let timestamp = moment().format("YYYY-MM-DD HH:mm:ss");

    fs.appendFile(logFilename, 
        timestamp + " " + error + "\n", 
        internalError => { if (internalError) throw internalError; });
}

module.exports = {};
module.exports.Log = Log;
module.exports.SetFilename = SetFilename;