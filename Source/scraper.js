/**
 * Scraper for http://shirts4mike.com
 * 
 * Lets get them prices into an csv file :).
 */
const folderTool = require("./lib/folderTool");
const shirts4mike = require("./lib/shirts4mike");
const moment = require("moment");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


// Requirement 1: Create that data folder if it does not exist...
folderTool.createFolderIfItDoesNotExistsSync("data");

shirts4mike.grabShirt4MikeShopData("http://shirts4mike.com")
.then(
    data => {
        const filename = moment().format("YYYY-MM-DD");

        const csvWriter = createCsvWriter({
            path: 'data/' + filename + '.csv',
            header: [
                {id: 'title',    title: 'title'   },
                {id: 'price',    title: 'price'   },
                {id: 'imageUrl', title: 'imageUrl'},
                {id: 'url',      title: 'url'     },
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

)


// NEXT: 
// Filename by date (R7)
// momentjs is installed