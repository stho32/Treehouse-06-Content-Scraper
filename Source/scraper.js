/**
 * Scraper for http://shirts4mike.com
 * 
 * Lets get them prices into an csv file :).
 */

const scrapeIt = require("scrape-it")

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

/**
 * perform scraping of mikes shirt shop
 * 
 * @param {string} startUrl url to start from
 */
function grabShirtLinks(startUrl) {
    return scrapeIt(startUrl, {
        links: {
            listItem : ".products li",
            data : {
                link: { 
                    selector: "a",
                    attr : "href"
                }
            }
        }
    });
}


// Requirement 1: Create that data folder if it does not exist...
createDataFolderIfNeeded();


grabShirtLinks("http://shirts4mike.com/shirts.php")
.then(({ data, response }) => {
    console.log(data.links);
});


