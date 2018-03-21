/**
 * Scraper for http://shirts4mike.com
 * 
 * Lets get them prices into an csv file :).
 */
const folderTool = require("./lib/folderTool");
const shirts4mike = require("./lib/shirts4mike");
const moment = require("moment");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const errorLog = require("./lib/error-log");
errorLog.SetFilename("scraper-error.log");

console.log(`
---------------------------------------------------------------------------------

    Shirt4Mike Scraper - scraping the same 8 shirts over and over since 2018

---------------------------------------------------------------------------------
`);


// Requirement 1: Create that data folder if it does not exist...
folderTool.createFolderIfItDoesNotExistsSync("data");

let url = "http://shirts4mike.com";

// 404-test
//url = "http://realmbender.de/404";

shirts4mike.grabShirt4MikeShopData(url)
    .then(
        data => {
            const filename = moment().format("YYYY-MM-DD");

            const csvWriter = createCsvWriter({
                path: 'data/' + filename + '.csv',
                header: [
                    { id: 'title',    title: 'title'    },
                    { id: 'price',    title: 'price'    },
                    { id: 'imageUrl', title: 'imageUrl' },
                    { id: 'url',      title: 'url'      },
                    { id: 'time',     title: 'time'     }
                ]
            });

            csvWriter.writeRecords(data)
                .then(() => { console.log('...Done'); },
                    error => { 
                        errorLog.Log("Error during saving data : " + error); 
                    }
                );
        },
        error => {
            if (error.code === "ENOTFOUND" && error.syscall === "getaddrinfo") {
                errorLog.Log("The domain " + error.hostname + " cannot be resolved. Are you offline?");
                return;
            }

            errorLog.Log(error);
        }
    );
