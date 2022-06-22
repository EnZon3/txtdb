# txtdb  ![GitHub](https://img.shields.io/github/license/enzon3/txtdb) ![npm](https://img.shields.io/npm/v/@enzon3/txtdb) ![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/enzon3/txtdb) ![npm bundle size](https://img.shields.io/bundlephobia/min/@enzon3/txtdb)

![logo](https://res.cloudinary.com/enzon3/image/upload/v1655678333/txtdb_logo_u0eo85.png)

txtdb is a simple key-based database based on text files formatted in a special way.

## Features

    Key-based
    Simple
    Fast
    Easy to use
    Cache
    Up to 2000 keys

## Installation

Use the package manager [npm](https://npmjs.com) to install txtdb.
```bash
npm i @enzon3/txtdb
```

## Usage

### Setup up txtdb
The second parameter is a boolean for whether or not to overwrite already existing keys.
```javascript
const settings = {
    dbFile: '[db file location here].txt',
    allowOverwrite: true,
    delimiter: 'any delimiter you want, for example: "|"',
    enableCache: false
}
db.setup(settings);
```

### Get a value
```javascript
async function getKey(key) {
    const value = await db.getKey(key);
    return value;
}

var key = getKey('key');
// do something with key
```

### Set a value
Quick warning, if the AllowOverwrite flag in the setup function is set to true, and if there was a key of the same name before, this command would ***overwrite*** it.
```javascript
db.setKey('key', 'value');
```

### Delete a value
```javascript
db.deleteKey('key');
```

## Contributing
Please don't request for write access to the repository, instead, fork the repository and open a PR describing what you would like to change in depth.
