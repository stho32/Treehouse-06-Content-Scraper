# Requirements

  - [x] (R1) Create a scraper.js file that will contain your command line application. Your project should also include a package.json file that includes your project’s dependencies. The npm install command should install your dependencies.

  - [x] (R2) Program your scraper to check for a folder called ‘data’. If the folder doesn’t exist, the scraper should create one. If the folder does exist, the scraper should do nothing.

  - [x] (R3) Choose and use two third-party npm packages. One package should be used to scrape content from the site. The other package should create the CSV file. Be sure to research the best package to use (see the project resources for a link to the video about how to choose a good npm package) Both packages should meet the following requirements:
    - At least 1,000 downloads
    - Has been updated in the last six months

  - [ ] (R4) Program your scraper so that it visits the website http://shirts4mike.com and uses http://shirts4mike.com/shirts.php as single entry point to scrape information for 8 tee-shirts from the site, without using any hard-coded urls like http://www.shirts4mike.com/shirt.php?id=101. If you’re unsure of how to get started, try googling ‘node scraper’ to get a feel for what a scraper is and what it does.

    - [ ] (R5) Scraping and Saving Data:
      - [ ] (R6) The scraper should get the price, title, url and image url from the product page and save this information into a CSV file.
      - [ ] (R7) The information should be stored in an CSV file that is named for the date it was created, e.g. 2016-11-21.csv.
      - [ ] (R8) Assume that the the column headers in the CSV need to be in a certain order to be correctly entered into a database. They should be in this order: Title, Price, ImageURL, URL, and Time
      - [ ] (R9) The CSV file should be saved inside the ‘data’ folder.

  - [ ] If your program is run twice, it should overwrite the data in the CSV file with the updated information.
  - [ ] If http://shirts4mike.com is down, an error message describing the issue should appear in the console.

    - [ ] The error should be human-friendly, such as “There’s been a 404 error. Cannot connect to http://shirts4mike.com.”
    - [ ] To test and make sure the error message displays as expected, you can disable the wifi on your computer or device.

  - [ ] Edit your package.json file so that your program runs when the npm start command is run.
  
  - [ ] When an error occurs, log it to a file named scraper-error.log . It should append to the bottom of the file with a time stamp and error e.g. [Tue Feb 16 2016 10:02:12 GMT-0800 (PST)] <error message> 


# How you will be graded - section

  - [ ] Project includes a package.json file containing dependencies to run node scraper.js

  - [ ] Running npm install installs relevant dependencies

  - [ ] The scraper.js file can be run with the npm start command 

  - [ ] Program creates onedata folder if that folder doesn’t already exist. If the folder does exist, the program does nothing.

  - [ ] Chosen scraping and CSV packages meet the following requirements on npm:
    - 1,000 downloads
    - Updated in the last 6 months

  - [ ] The project uses the http://shirts4mike.com/shirts.php URL as an entry point to look through the links on the page to find 8 shirts

  - [ ] Project scrapes the product title, price, image and url, and all information is correct and in the correct place

  - [ ] A CSV is successfully saved to the ‘data’ folder in this format: ‘YYYY-MM-DD.csv’, e.g. ‘2016-12-30.csv’.

  - [ ] Column headers are in this order: Title, Price, ImageURL, URL, Time

  - [ ] If the script is run twice, the program overwrites the data. The file contains the data from the second call. 

  - [ ] The program displays a human-friendly error (not just the original error code) when it cannot connect to http://shirts4mike.com
