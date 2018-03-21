/**
 * FolderTool 
 * 
 * Just the part that is about the folder. 
 */
const fs = require('fs');

/**
 * Check if the sub-folder "data" exists.
 * If it does not exist, create it.
 */
function createFolderIfItDoesNotExistsSync(directoryName) {
    if (!fs.existsSync(directoryName)) {
        fs.mkdirSync(directoryName);
    }
}

module.exports = {}
module.exports.createFolderIfItDoesNotExistsSync = createFolderIfItDoesNotExistsSync;