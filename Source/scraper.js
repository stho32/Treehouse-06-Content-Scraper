/**
 * Scraper for http://shirts4mike.com
 * 
 * Lets get them prices into an csv file :).
 */

const scrapeIt = require("scrape-it")
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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
    })
    .then(({ data, response }) => {
        let shirt = {
            price: data.price,
            title: data.title,
            url: url,
            imageUrl: "http://shirts4mike.com/" + data.imageUrl
        }

        return shirt;
    });
}

// Requirement 1: Create that data folder if it does not exist...
createDataFolderIfNeeded();

// Requirement 4: Dynamically load all urls from this page that point
//                to shirts!
let shirtDataGrabbers = [];
let shirtData = [];

grabShirtLinks("http://shirts4mike.com/shirts.php")
    .then(({ data, response }) => {
        for (let i = 0; i < data.links.length; i++) {
            let link = data.links[i].link;

            console.log("grabbing " + link + " ...");

            // Requirement 5 : Then grab data from the shirts...
            shirtDataGrabbers.push(grabShirtData("http://shirts4mike.com/" + link));
        }

        // After all data is grabbed we can save it to a csv file
        Promise.all(shirtDataGrabbers).then(
            data => {
                const csvWriter = createCsvWriter({
                    path: 'data/file.csv',
                    header: [
                        {id: 'title',    title: 'title'   },
                        {id: 'price',    title: 'price'   },
                        {id: 'url',      title: 'url'     },
                        {id: 'imageUrl', title: 'imageUrl'}
                    ]
                });

                csvWriter.writeRecords(data)     
                .then(() => {
                    console.log('...Done');
                },
                error => {
                    console.error("Error during saving data : " + error);
                });
            },
            error => {
                console.error("An error occured: " + error);
            }
        );
    });

