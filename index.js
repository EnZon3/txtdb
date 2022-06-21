const fs = require('fs');

let dbFileLocation;
let allowDBOverwrite = false;
let del;

async function encode(text) {
    const encoded = Buffer.from(text).toString('base64');
    return encoded;
}

async function decodeDB(text) {
    const decoded = Buffer.from(text, 'base64').toString('ascii');
    return decoded;
}

const binarySearch = (arr, x , start=0, end=arr.length) => {
    // If the item does not exist, return -1
    if(end < start) return -1;
    
    // Calculate middle index of the array
    let mid = Math.floor((start + end) / 2);
    
    // Is the middle a match?
    if(arr[mid] === x) return mid;
    // Is the middle less than x
    if(arr[mid] < x) return binarySearch(arr, x, mid+1, end);
    // Else the middle is more than x
    else return binarySearch(arr, x , start, mid-1);
}

function setup(dbFile, overwrite, delimiter) {
    dbFileLocation = dbFile;
    allowDBOverwrite = overwrite;
    del = delimiter;

    if (!del) {
        console.log('No delimiter specified, using default ","');
        del = ',';
    }

    if (!fs.existsSync(dbFileLocation)) {
        console.log('DB file does not exist, creating new file');
        fs.writeFileSync(dbFileLocation, '');
    }

    console.log(`DB initialized, settings: DB locatation: ${dbFileLocation}, AllowOverwrite: ${overwrite}, Delimiter: ${del}`);
}

async function getKey(key) {
    const db = await decodeDB(fs.readFileSync(dbFileLocation, 'utf8'));
    const splitDB = db.split(del);
    const keyIndex = binarySearch(splitDB, key);

    if (keyIndex === -1) {
        return 'Key not found';
    }
    
    return splitDB[keyIndex + 1];
}

async function overwriteKey(key, value) {
    const db = await decodeDB(fs.readFileSync(dbFileLocation, 'utf8'));
    const splitDB = db.split(del);
    const keyIndex = binarySearch(splitDB, key);

    if (keyIndex === -1) {
        return 'Key not found';
    }

    splitDB[keyIndex + 1] = value;
    const newDB = splitDB.join(del);
    const encodedDB = await encode(newDB);
    fs.writeFileSync(dbFileLocation, encodedDB);
    return 0;
}

async function setKey(key, value) {

    const getkey = await getKey(key);

    if (getkey === 'Key not found') {
        const db = await decodeDB(fs.readFileSync(dbFileLocation, 'utf8'));
        let serializedKey = `${key}${del}${value}`;
        let newDB = `${db}${del}${serializedKey}`;
        let encodedDB = await encode(newDB);
        fs.writeFileSync(dbFileLocation, encodedDB);
        return 0;
    } else {
        if (allowDBOverwrite) {
            return await overwriteKey(key, value);
        } else {
            throw new Error('Key already exists');
        }
    }
}

async function deleteKey(key) {
    const db = await decodeDB(fs.readFileSync(dbFileLocation, 'utf8'));
    const splitDB = db.split(del);
    const keyIndex = binarySearch(splitDB, key);

    if (keyIndex === -1) {
        return 'Key not found';
    }

    splitDB.splice(keyIndex, 1);
    splitDB.splice(keyIndex, 1);
    const newDB = splitDB.join(del);
    const encodedDB = await encode(newDB);
    fs.writeFileSync(dbFileLocation, encodedDB);
    return 0;
}

module.exports = { setup, getKey, setKey, deleteKey };