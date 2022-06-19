# txtdb

txtdb is a simple database based on text files formatted in a special way.

## Installation

Use the package manager [npm](https://npmjs.com) to install txtdb.
```bash
npm i @enzon3/txtdb
```

## Usage

### Setup up txtdb
```javascript
const db = require('txtdb');
db.setup('[insert db file location here].txt');
```

### Get a value
```javascript
async function getKey() {
    const key = 'key';
    const value = await db.getKey(key);
    console.log(value);
}

getKey();
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
