/**
 * These tools help you with grabbing
 * the data from http://shirts4mike.com.
 */
const scrapeIt = require("scrape-it");

/**
 * Extract all shirt links from a start url 
 * of a shirts4mike similar shop. Actually we really want
 * only to scrape shirts4mike.
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

/**
 * This function can extract the shirt information
 * from a given detail page.
 * 
 * @param {string} url 
 */
function grabShirtData(url, baseUrl) {
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
                imageUrl: baseUrl + "/" + data.imageUrl
            }

            return shirt;
        });
}


/**
 * Scrapes shirts4mike and returns all data it can get!
 * 
 * @param {string} baseUrl http://shirts4mike.com 
 * @param {string} startUrl http://shirts4mike.com/shirts.php
 */
function grabShirt4MikeShopData(baseUrl, startUrl) {
    // Requirement 4: Dynamically load all urls from this page that point
    //                to shirts!
    let shirtDataGrabbers = [];

    return grabShirtLinks(startUrl)
        .then(({ data, response }) => {
            for (let i = 0; i < data.links.length; i++) {
                let link = data.links[i].link;

                console.log("grabbing " + link + " ...");

                // Requirement 5 : Then grab data from the shirts...
                shirtDataGrabbers.push(grabShirtData(baseUrl + "/" + link, baseUrl));
            }

            // After all data is grabbed we can save it to a csv file
            return Promise.all(shirtDataGrabbers);
        });
}


module.exports = {}
module.exports.grabShirt4MikeShopData = grabShirt4MikeShopData;