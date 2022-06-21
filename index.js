const fs = require('fs');
const search = require('./search.js');

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
    const keyIndex = await search.search(splitDB, key);

    if (keyIndex === -1) {
        return 'Key not found';
    }
    
    return splitDB[keyIndex + 1];
}

async function overwriteKey(key, value) {
    const db = await decodeDB(fs.readFileSync(dbFileLocation, 'utf8'));
    const splitDB = db.split(del);
    const keyIndex = await search.search(splitDB, key);

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
    const keyIndex = await search.search(splitDB, key);

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