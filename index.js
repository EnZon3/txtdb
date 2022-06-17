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

    const getkey = await getKey(key);

    if (getkey === 'Key not found') {
        const db = await decodeDB(fs.readFileSync(dbFileLocation, 'utf8'));
        let serializedKey = `${key},${value}`;
        let newDB = `${db},${serializedKey}`;
        let encodedDB = await encode(newDB);
        fs.writeFileSync(dbFileLocation, encodedDB);
        return 0;
    } else {
        throw new Error('Key already exists');
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