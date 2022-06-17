# txtdb

txtdb is a simple database that is based off of text files formatted in a special way.

## Installation

Use the package manager [npm](https://npmjs.com) to install txtdb.
```bash
npm i txtdb
```

## Usage

    # Setup up txtdb
```js
const db = require('txtdb');
db.setup('./db.txt');
```

    # Get a value
```js
async function getKey() {
    const key = 'Test';
    const value = await db.getKey(key);
    console.log(value);
}

getKey();
```
