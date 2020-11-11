narcissistic(371);

function narcissistic(value) {
    if (value > 0 && value < 10) {
        console.log(true);
        return true;
    } else if (value >= 10) {
        let strValue = value.toString();
        let res = 0;
        for (let i = 0; i < strValue.length; i++) {
            console.log(+strValue[i]);
            res += Math.pow(+strValue[i], strValue.length);
        }
        if (res === value) {
            console.log(true);
            return true
        } else {
            console.log(false);
            return false;
        }
    } else {
        console.log(false);
        return false;
    }
}