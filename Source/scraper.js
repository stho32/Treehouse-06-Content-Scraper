/**
 * Scraper for http://shirts4mike.com
 * 
 * Lets get them prices into an csv file :).
 */

 /**
  * Check if the sub-folder "data" exists.
  * If it does not exist, create it.
  */
function createDataFolderIfNeeded() {
    var fs = require('fs');
    if (!fs.existsSync("data")) {
        fs.mkdirSync("data");
    }
}


// Requirement 1: Create that data folder if it does not exist...
createDataFolderIfNeeded();