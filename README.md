# txtdb  ![GitHub](https://img.shields.io/github/license/enzon3/txtdb) ![npm](https://img.shields.io/npm/v/@enzon3/txtdb) ![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/enzon3/txtdb) ![npm bundle size](https://img.shields.io/bundlephobia/min/@enzon3/txtdb)

![logo](https://res.cloudinary.com/enzon3/image/upload/v1655678333/txtdb_logo_u0eo85.png)

txtdb is a simple database based on text files formatted in a special way.

## Installation

Use the package manager [npm](https://npmjs.com) to install txtdb.
```bash
npm i @enzon3/txtdb
```

## Usage

### Setup up txtdb
The second parameter is a boolean for whether or not to overwrite already existing keys.
```javascript
const db = require('txtdb');
db.setup('[insert db file location here].txt', true);
```

### Get a value
```javascript
async function getKey(key) {
    const value = await db.getKey(key);
    return value;
}

getKey(key);
```

### Set a value
Quick warning, when you set a key, if there was a key of the same name before, this command would ***overwrite*** it.
```javascript
db.setKey('key', 'value');
```

### Delete a value
```javascript
db.deleteKey('key');
```

## Contributing
Please don't request for write access to the repository, instead, fork the repository and open a PR describing what you would like to change in depth.
