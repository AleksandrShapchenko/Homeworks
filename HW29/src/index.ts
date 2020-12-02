const url: string = 'https://jsonplaceholder.typicode.com/';
const postUrl: string = 'posts';
const commentsUrl: string = 'comments';
const postHistory: any[] = [];
let postNumber: number = 0;

interface PostResponse {
    'userId': number;
    'id': number;
    'title': string;
    'body': string;
}

interface CommentsResponse {
    [index: number]: {
        'body': string;
        'email': string;
        'id': number;
        'name': string;
        'postId': number;
    }
}

document.addEventListener('DOMContentLoaded', init);

function init(): void {

    const postContainer = document.querySelector('.post-container') as HTMLDivElement;
    const request = document.querySelector('#request') as HTMLButtonElement;
    const postInput = document.querySelector('#postInput') as HTMLInputElement;

    request.addEventListener('click', main);
    postInput.addEventListener('keyup', (event) => {
        if (event.key === "Enter") {
            main()
        } else {
            event.preventDefault()
        }
    });

    function main(): void {
        let id: number = Number(postInput.value);

        if (!isNaN(id) && id > 0) {
            postInput.disabled = true;

            getPostById().then((post) => {

                getCommentsByPostId(post)
            }).catch((error) => {
                postInput.disabled = false;
                console.log(error);
            })
        }

        async function getPostById(): Promise<HTMLPreElement> {
            const response: Response = await fetch(`${url}${postUrl}/${id}`);
            if (response.ok) {
                const data: PostResponse = await response.json();
                console.log(data);

                const post = document.createElement('pre');
                post.className = 'post';
                const span = document.createElement('span');

                const header = document.createElement('h2');
                header.innerHTML = `Post№ ${++postNumber}`;
                header.className = 'post-header';

                post.append(header);
                for (const [key, value] of Object.entries(data)) {

                    if (key != 'userId' && key != 'id') {
                        const keyValue: string = `${key}: ${value}\n`;
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

        async function getCommentsByPostId(post: HTMLPreElement) {
            const response: Response = await fetch(`${url}${postUrl}/${id}/${commentsUrl}`);
            if (response.ok) {
                const data: CommentsResponse[] = await response.json();

                const commentsHeader = document.createElement('h3');
                commentsHeader.innerHTML = 'Comments: '
                commentsHeader.className = 'post-header';

                const span = document.createElement('span');

                (await post).append(commentsHeader);
                for (const entry of data) {
                    for (const [key, value] of Object.entries(entry)) {

                        if (key == 'email' || key == 'body') {
                            const keyValue: string = `${key}: ${value}\n`;
                            span.append(keyValue);
                        }

                    }
                }
                (await post).append(span);
            } else {
                throw new Error('error with getting comments');
            }
        }
    }
}