let number = +prompt('Write a number bigger than 10', 0);
let sum = 0;

if (number > 10) {
    for (let x = 1; x < number; x++) {
        sum += x;
    }
} else if (number == 0) {
    alert('You canceled input');
} else {
    alert('Error');
}

if (sum) {
    alert(sum);
}