// let randomNumber = Math.floor(Math.random() * 100);
// let attempts = 5;


// function checkGuessingNumber() {
//     let numberDirection = userGuessingNumber > randomNumber ? 'Нужное число меньше' :
//         userGuessingNumber < randomNumber ? 'Нужное число больше' : `Вы выиграли, нужное число ${randomNumber}`;
// }

// function checkEnteredData(userGuessingNumber) {

// }

// startLoop:
// while (attempts) {
//     let userGuessingNumber = prompt('Попробуйте угадать число', 0);
//     if (userGuessingNumber == randomNumber) {
//         alert(`Вы выиграли!, правильное число = ${randomNumber}`);
//         break;
//     } else if (userGuessingNumber < 0 || userGuessingNumber > 100) {
//         alert('Что то пошло не так, попробуйте ввести число от 0 до 100');
//         continue startLoop;
//     } else {
//         alert('Что то пошло не так, попробуйте ввести число от 0 до 100');
//         continue startLoop;
//     }
//     --attempts;
//     if (attempts) {
//         continue startLoop;
//     } else {
//         alert(`Вы проиграли, число было ${randomNumber}`)
//     }
// }


// const randomNumber = generateRandomNumber(100);
// const attempts = 5;

// function generateRandomNumber(maxNumber) {
//     return Math.floor(Math.random() * maxNumber);
// }

// function validateInput(enteredNumber) {
//     if (enteredNumber !== enteredNumber) {
//         alert("Введите число!");
//         return true;
//     }
//     else
//         return false;
// }

// function success() {
//     alert("Вы выиграли!, правильное число " + randomNumber);
// }

// function checkNumber(enteredNumber) {
//     if (enteredNumber < 0 || enteredNumber > 100) {
//         alert("Что то пошло не так, попробуйте ввести число от 0 до 100");
//     } else if (enteredNumber > randomNumber) {
//         alert('Нужное число меньше');
//     } else if (enteredNumber < randomNumber) {
//         alert('Нужное число больше');
//     }
// }

// for (let i = 0; i < attempts; i++) {
//     let userGuessedNumber = +prompt("Попробуйте угадать число", "");
//     let guess = validateInput(userGuessedNumber);

//     if (guess)
//         --i;

//     if (userGuessedNumber === randomNumber) {
//         success();
//         break;
//     }
//     else
//         checkNumber(userGuessedNumber);

//     if (i === attempts - 1)
//         alert("Вы проиграли, число было " + randomNumber)
// }