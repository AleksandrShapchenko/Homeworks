// С помощью замыкания написать ф-цию structureUserInfo, которая собирает инфо-объект о пользователе из аргументов.
// Пример её работы
// structureUserInfo('John')('Admin') // {role: "Admin", name: "John"}

// function structureUserInfo(name) {

//     return function (role) {
//         return obj = {
//             role,
//                 name,
//         }
//     }
// }

// console.log(structureUserInfo('John')('User'));

//* addition task

// С помощью замыкания напишите калькулятор, который бы работал следующим образом:

// const calculator = createCalculator(10); 
// calculator.add(45) // возвращает 55 
// calculator.sub(45) // возвращает -35 
// calculator.divide(5) // возвращает 2 
// calculator.mult(5) // возвращает 50 
// calculator.set(100) // устанавливает базовое значение в 100 
// calculator.mult(5) // возвращает 500

// Подсказка: возвращаемое значение от ф-ции createCalculator - объект с методами;

// function createCalculator(fNumber) {
//     return obj = {
//         add(lNumber) {
//             return fNumber + lNumber;
//         },
//         sub(lNumber) {
//             return fNumber - lNumber;
//         },
//         divide(lNumber) {
//             return fNumber / lNumber;
//         },
//         mult(lNumber) {
//             return fNumber * lNumber;
//         },
//         set(neededNumber) {
//             return fNumber = neededNumber;
//         },
//     };
// }

// const calculator = createCalculator(10);
// console.log(calculator.add(13));
// console.log(calculator.sub(66));
// console.log(calculator.divide(74));
// console.log(calculator.mult(49));
// console.log(calculator.set(330));
// console.log(calculator.divide(30));
// console.log(calculator.add(30));

