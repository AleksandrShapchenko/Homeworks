let arr = [10, "Hello world", null, true, '', false, 255];
let newArr = [];

/**
 * Function that return array with positive value objects
 * @param {*} arr array
 * @returns array
 */

function explainer(arr) {

    for (let i = 0; i < arr.length; i++) {
        if (arr[i])
            newArr.push(createObject(arr[i]));
    }
    return newArr;
}

/**
 * Function that creates object with type, value and length if value is string
 * @param {*} item 
 * @returns array
 */

function createObject(item) {

    let obj = {
        type: typeof (item),
        value: item,
    }

    if (typeof (item) === "string")
        obj.length = item.length;
    return obj;
}

console.log(explainer(arr));