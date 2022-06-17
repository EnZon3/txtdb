# txtdb

txtdb is a simple database based on text files formatted in a special way.

## Installation

Use the package manager [npm](https://npmjs.com) to install txtdb.
```bash
npm i txtdb
```

## Usage

### Setup up txtdb
```javascript
const db = require('txtdb');
db.setup('./db.txt');
```

### Get a value
```javascript
async function getKey() {
    const key = 'Test';
    const value = await db.getKey(key);
    console.log(value);
}

getKey();
```

### Set a value
Quick warning, when you set a key, if there was a key of the same name before, this command would ***overwrite*** it.
```javascript
db.setKey('test', '123');
```

### Delete a value
```javascript
db.deleteKey('test');
```