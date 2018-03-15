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

shirts4mike.grabShirt4MikeShopData("http://shirts4mike.com", "http://shirts4mike.com/shirts.php")
.then(
    data => {
        const filename = moment();

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

)


// NEXT: 
// Filename by date (R7)
// momentjs is installed