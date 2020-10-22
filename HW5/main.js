let num = 1;
let string = "abc";

function checkFunc(arg) {
    if (typeof (arg) == typeof (num)) {
        return 1;
    }
    else if (typeof (arg) == typeof (string)) {
        return 0;
    }
    else {
        return -1;
    }
}