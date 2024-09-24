// data.js
const fs = require('fs');
const path = require('path');

let data_worldList = [];
let data_worldListLength = 0;

const directoryName = path.join(process.env.HOME || process.env.APPDATA, '.m4kc');
const optionsFileName = path.join(directoryName, 'm4kc.conf');
const worldsDirectoryName = path.join(directoryName, 'worlds');
const screenshotsDirectoryName = path.join(directoryName, 'screenshots');

// Initialize data module
function data_init() {
    try {
        ensureDirectoryExists(directoryName);
        ensureDirectoryExists(worldsDirectoryName);
        ensureDirectoryExists(screenshotsDirectoryName);
    } catch (error) {
        return 1; // Non-zero on failure
    }
    return 0; // Success
}

// Check if a directory exists
function data_directoryExists(dir) {
    return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
}

// Ensure directory exists
function data_ensureDirectoryExists(dir) {
    if (!data_directoryExists(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Check if a file exists
function data_fileExists(filePath) {
    return fs.existsSync(filePath);
}

// Remove directory recursively
function data_removeDirectory(dir) {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach((file) => {
            const curPath = path.join(dir, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                data_removeDirectory(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(dir);
    }
}

// Get options file name
function data_getOptionsFileName() {
    return optionsFileName;
}

// Get world path
function data_getWorldPath(worldName) {
    data_ensureDirectoryExists(worldsDirectoryName);
    return path.join(worldsDirectoryName, worldName);
}

// Get screenshot path
function data_getScreenshotPath() {
    data_ensureDirectoryExists(screenshotsDirectoryName);
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    return path.join(screenshotsDirectoryName, `snip_${timestamp}.bmp`);
}

// Refresh world list
function data_refreshWorldList() {
    data_worldList = [];
    data_worldListLength = 0;
    
    if (!data_directoryExists(worldsDirectoryName)) return 1;

    const files = fs.readdirSync(worldsDirectoryName);
    for (const file of files) {
        if (file.startsWith('.')) continue;

        const worldPath = path.join(worldsDirectoryName, file);
        const item = { name: file, thumbnail: null }; // Add thumbnail logic as needed
        data_worldList.push(item);
        data_worldListLength++;
    }
    return 0;
}

module.exports = {
    data_init,
    data_getOptionsFileName,
    data_getWorldPath,
    data_getScreenshotPath,
    data_refreshWorldList,
};
