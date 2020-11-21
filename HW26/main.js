const url = 'https://jsonplaceholder.typicode.com/';
const postUrl = 'posts';
const commentsUrl = 'comments';
let postHistory = [];
let postNumber = 0;

document.addEventListener('DOMContentLoaded', init);

function init() {

    let postContainer = document.querySelector('.post-container');
    let request = document.querySelector('#request');
    let postInput = document.querySelector('#postInput');

    request.addEventListener('click', main);
    postInput.addEventListener('keyup', (event) => {
        if (event.key === "Enter") {
            main()
        } else {
            event.preventDefault()
        }
    });

    function main() {
        let id = postInput.value;

        if (!isNaN(id) && id != '' && id > 0) {
            postInput.disabled = true;

            getPostById().then((post) => {

                getCommentsByPostId(post)
            }).catch((error) => {
                postInput.disabled = false;
                console.log(error);
            })
        }

        async function getPostById() {
            let response = await fetch(`${url}${postUrl}/${id}`);
            if (response.ok) {
                let response = await fetch(`${url}${postUrl}/${id}`);
                let data = await response.json();

                let post = document.createElement('pre');
                post.className = 'post';
                let span = document.createElement('span');
                let keyValue = '';

                let header = document.createElement('h2');
                header.innerHTML = `Post№ ${++postNumber}`;
                header.className = 'post-header';

                post.append(header);
                for (const [key, value] of Object.entries(data)) {

                    if (key != 'userId' && key != 'id') {
                        keyValue = `${key}: ${value}\n`;
                        span.append(keyValue);
                    }

                }

                post.append(span);
                postContainer.append(post);
                postHistory.push(data);
                postInput.disabled = false;
                postInput.focus();

                return post;
            } else {
                throw new Error('error with getting post');
            }
        }

        async function getCommentsByPostId(post) {
            let response = await fetch(`${url}${postUrl}/${id}/${commentsUrl}`);
            if (response.ok) {
                let response = await fetch(`${url}${postUrl}/${id}`);
                let data = await response.json();
    
                let post = document.createElement('pre');
                post.className = 'post';
                let span = document.createElement('span');
                let keyValue = '';
    
                let header = document.createElement('h2');
                header.innerHTML = `Post№ ${++postNumber}`;
                header.className = 'post-header';
    
                post.append(header);
                for (const [key, value] of Object.entries(data)) {
    
                    if (key != 'userId' && key != 'id') {
                        keyValue = `${key}: ${value}\n`;
                        span.append(keyValue);
                    }
    
                }
                
                post.append(span);
                postContainer.append(post);
                postHistory.push(data);
                postInput.disabled = false;
                postInput.focus();
    
                return post;
            } else {
                throw new Error('error with getting comments');
            }
        }
    }
}
