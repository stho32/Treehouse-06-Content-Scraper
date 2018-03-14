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
            listItem: ".products li",
            data: {
                link: {
                    selector: "a",
                    attr: "href"
                }
            }
        }
    });
}

function grabShirtData(url) {
    return scrapeIt(url, {
        price: { selector: ".price" },
        title: { selector: "head title" },
        imageUrl: { selector: ".shirt-picture img", attr: "src" }
    });
}

// Requirement 1: Create that data folder if it does not exist...
createDataFolderIfNeeded();

// Requirement 4: Dynamically load all urls from this page that point
//                to shirts!
grabShirtLinks("http://shirts4mike.com/shirts.php")
    .then(({ data, response }) => {

        for (let i = 0; i < data.links.length; i++) {
            let link = data.links[i].link;

            console.log("grabbing " + link + " ...");

            // Requirement 5 : Then grab data from the shirts...
            grabShirtData("http://shirts4mike.com/" + link)
                .then(({ data, response }) => {
                    let shirt = {
                        price: data.price,
                        title: data.title,
                        url: link,
                        imageUrl: data.imageUrl
                    }
                    console.log(shirt);
                });
        }
    });
