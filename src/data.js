// data.js

const fs = require('fs');
const path = require('path');

// WorldThumbnail structure
class WorldThumbnail {
    constructor() {
        this.buffer = new Array(16 * 16).fill(0); // Initialize buffer
    }
}

// WorldListItem structure
class WorldListItem {
    constructor(name) {
        this.thumbnail = new WorldThumbnail();
        this.name = name;
        this.next = null; // Pointer to next item
    }
}

// Global variables
let data_worldList = null; // Linked list head
let data_worldListLength = 0;

const directoryName = path.join(process.env.HOME || process.env.APPDATA, '.m4kc');
const optionsFileName = path.join(directoryName, 'm4kc.conf');
const worldsDirectoryName = path.join(directoryName, 'worlds');
const screenshotsDirectoryName = path.join(directoryName, 'screenshots');

// Initialize data module
function data_init() {
    try {
        data_ensureDirectoryExists(directoryName);
        data_ensureDirectoryExists(worldsDirectoryName);
        data_ensureDirectoryExists(screenshotsDirectoryName);
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

// Get world metadata path
function data_getWorldMetaPath(worldPath) {
    return path.join(worldPath, 'metadata');
}

// Get player file path
function data_getWorldPlayerPath(worldPath, playerName) {
    return path.join(worldPath, `${playerName}.player`);
}

// Get screenshot path
function data_getScreenshotPath() {
    data_ensureDirectoryExists(screenshotsDirectoryName);
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    return path.join(screenshotsDirectoryName, `snip_${timestamp}.bmp`);
}

// Refresh world list
function data_refreshWorldList() {
    data_worldList = null; // Reset list
    data_worldListLength = 0;

    if (!data_directoryExists(worldsDirectoryName)) return 1;

    const files = fs.readdirSync(worldsDirectoryName);
    let lastItem = null;

    for (const file of files) {
        if (file.startsWith('.')) continue;

        const item = new WorldListItem(file);
        if (!data_worldList) {
            data_worldList = item; // First item
        } else {
            lastItem.next = item; // Link to the next item
        }
        lastItem = item;

        // Logic for loading thumbnail can go here
        // item.thumbnail could be populated if you have a way to load it
        data_worldListLength++;
    }
    return 0;
}

// Exporting the global variables and functions
module.exports = {
    data_worldList,
    data_worldListLength,
    data_init,
    data_directoryExists,
    data_fileExists,
    data_ensureDirectoryExists,
    data_removeDirectory,
    data_getOptionsFileName,
    data_getWorldPath,
    data_getWorldMetaPath,
    data_getWorldPlayerPath,
    data_getScreenshotPath,
    data_refreshWorldList,
};
