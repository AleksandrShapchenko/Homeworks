
class User {
    constructor({name, email, password}) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
// get & post - users
// put & delete - users/idUSer
class UserApi {
    static baseUrl = 'users';
    static userIdUrl = 'userId';

    static getUsers() {
        console.log(UserApi.baseUrl.userId);
        return fetch(UserApi.baseUrl);
    }

    static sendUser(user) {
        return fetch(UserApi.baseUrl, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });
    }

    static deleteUser(user) {
        return fetch(UserApi.baseUrl, {
            method: "delete",

        })
    }

    static putUser(user) {
        return fetch(UserApi.baseUrl, {
            method: "put",

        })
    }
}

document.addEventListener('DOMContentLoaded', () => {

    let regForm = document.querySelector('#regForm');
    let usersContainer = document.querySelector('#users');
    // console.dir(regForm.elements);

    regForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let { name, email, password } = regForm.elements;
        let user = new User({
            name: name.value,
            email: email.value,
            password: password.value
        });
        console.log(user);

        UserApi.sendUser(user)
                .then( response => {
                    console.log(response);
                    regForm.style.display = "none";
                    usersContainer.style.display = "block";
                })
    })



    let controls = document.querySelector('#controls');
    controls.addEventListener('click', (e) => {
        if(e.target.id == "add") {
            regForm.style.display = "block";
            usersContainer.style.display = "none";

        }
        if(e.target.id == "get") {
            usersContainer.style.display = "block";
            regForm.style.display = "none";
            
            renderUserList()
        }
    })

    function renderUserList() {
        UserApi.getUsers()
                .then( res => res.json())
                .then( data => data.data)
                .then( users => {
                    usersContainer.innerHTML = '';
                    users.forEach( user => {
                        usersContainer.innerHTML += `
                            <h1 class="name">${user.name}</h1>
                            <p class="email">${user.email}</p>
                        `
                    })
                })
    }
})

