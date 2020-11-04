const url = 'https://jsonplaceholder.typicode.com/';
const photoUrl = 'photos';
let photoHistory = [];

let photContainer = document.querySelector('.photo-container');
let request = document.querySelector('#request');
let photoInput = document.querySelector('#photoInput');

request.addEventListener('click', main);
photoInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        main()
    } else {
        event.preventDefault()
    }
});

function main() {

    let id = photoInput.value;
    if (!isNaN(id)) {
        photoInput.disabled = true;

        getImageByRequest();
    }


    async function getImageByRequest() {
        let response = await fetch(`${url}${photoUrl}/${id}`);
        let data = await response.json();

        console.log(loadImage(data));
        let imgObj = await loadImage(data);
        console.log(imgObj);
        await showImg(imgObj);
    }

}

async function showImg({
    image,
    data
}) {
    photContainer.append(image);
    photoHistory.push(data);
    console.log(photoHistory);
    photoInput.disabled = false;
    photoInput.focus();
}

function loadImage(data) {
    return new Promise(function (resolve, reject) {
        let image = new Image();
        image.src = data.url;
        image.onload = () => resolve({
            image,
            data
        });
        image.onerror = () => reject();
    })
}

// async function loadImage(data) {
//     let image = new Image();
//     image.src = await data.url;
//     image.onload = () => {
//         return ({
//             image,
//             data,
//         })
//     }
//     image.onerror = () => Promise.reject();
// }

