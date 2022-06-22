
var t1;
var t2;

async function search(array, key) {

    t1 = await search_t1(array, key);
    t2 = await search_t2(array, key);

    console.log(t1, t2);

    if (t1 === -1 && t2 === -1) {
        return -1;
    }

    if (t1 === -1 && t2 !== -1) {
        return t2 + array.length / 2;
    }

    if (t2 === -1 && t1 !== -1) {
        return t1;
    }
}

async function search_t1(arr, key) {
    for (let i = 0; i < arr.length / 2; i++) {
        if (arr[i] === key) {
            return i;
        }
    }

    return -1;
}

async function search_t2(array, key) {
    for (let i = array.length / 2 + 1; i < array.length; i++) {
        if (array[i] === key) {
            return i;
        }
    }

    return -1;
}

module.exports = { search };