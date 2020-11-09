const url = 'https://jsonplaceholder.typicode.com/';
const postUrl = 'posts';
const commentsUrl = 'comments';
let postHistory = [];
let postNumber = 0;

document.addEventListener('DOMContentLoaded', init);

function init() {

    let postContainer = document.querySelector('.post-container');
    console.log(postContainer);
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
        if (!isNaN(id)) {
            postInput.disabled = true;

            getPostById().then((post) => {

                getCommentsByPostId().then((comments) => {
                    showComments(post, comments);
                });
                
            })
        }

        async function getPostById() {
            let response = await fetch(`${url}${postUrl}/${id}`);
            let dataJSON = await response.json();
            let data = JSON.stringify(dataJSON);

            let post = await loadPost(data);
            showPost(post);
            return post.post;
        }

        async function getCommentsByPostId() {
            let response = await fetch(`${url}${postUrl}/${id}/${commentsUrl}`);
            let dataJSON = await response.json();
            let data = JSON.stringify(dataJSON);
           
            return data.name;
        }

        function showPost({
            post,
            data
        }) {
            postContainer.append(post);
            postHistory.push(data);
            // console.log(postHistory);
            postInput.disabled = false;
            postInput.focus();
        }

        function showComments(post, comments) {
            let commentsHeader = document.createElement('div');
            let header = 'Comments:';
            commentsHeader.className = 'post-header';
            commentsHeader.append(header);

            post.append(commentsHeader, comments);
        }
    }
}

function loadPost(data) {
    return new Promise(function (resolve) {
        let postHeader = document.createElement('div');
        let header = `Post№${++postNumber}`;
        postHeader.className = 'post-header';
        postHeader.append(header);

        let post = document.createElement('div');
        post.className = 'post';
        post.append(postHeader, data);
        resolve({
            post,
            data
        });
    })
}