const fs = require('fs');

let dbFileLocation;

async function encode(text) {
    const encoded = Buffer.from(text).toString('base64');
    return encoded;
}

async function decodeDB(text) {
    const decoded = Buffer.from(text, 'base64').toString('ascii');
    return decoded;
}

//Function shamelessly stolen from grepper, to find it search in google 'binary search grepper', it should be the second snippet
function binarySearch(arr, val) {
    let start = 0;
    let end = arr.length - 1;
  
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
  
      if (arr[mid] === val) {
        return mid;
      }
  
      if (val < arr[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return -1;
}

function setup(dbFile) {
  dbFileLocation = dbFile;
}

async function getKey(key) {
    const db = await decodeDB(fs.readFileSync(dbFileLocation, 'utf8'));
    const splitDB = db.split(',');
    const keyIndex = splitDB.indexOf(key);

    if (keyIndex === -1) {
        return 'Key not found';
    }
    
    return splitDB[keyIndex + 1];
}

async function setKey(key, value) {

    const getKey = await getKey(key);

    if (getKey === 'Key not found') {
        throw new Error('Key already exists');
    } else {
        const db = await decodeDB(fs.readFileSync(dbFileLocation, 'utf8'));
        let serializedKey = `${key},${value}`;
        let newDB = `${db},${serializedKey}`;
        let encodedDB = await encode(newDB);
        fs.writeFileSync(dbFileLocation, encodedDB);
        return 0;
    }
}

async function deleteKey(key) {
    const db = await decodeDB(fs.readFileSync(dbFileLocation, 'utf8'));
    const splitDB = db.split(',');
    const keyIndex = splitDB.indexOf(key);

    if (keyIndex === -1) {
        return 'Key not found';
    }

    const newDB = db.replace(`${splitDB[keyIndex]},${splitDB[keyIndex + 1]},`, '');
    const encodedDB = await encode(newDB);
    fs.writeFileSync(dbFileLocation, encodedDB);
    return 0;
}

module.exports = { setup, getKey, setKey, deleteKey };