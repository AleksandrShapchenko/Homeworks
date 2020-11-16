class User {
    constructor({ name, email, password }) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
// get & post - users
// put & delete - users/idUSer
class UserApi {
    static baseUrl = 'users';

    static getUsers() {
        return fetch(UserApi.baseUrl);
    }

    static sendUser(user) {
        console.log(UserApi.baseUrl);
        return fetch(UserApi.baseUrl, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });
    }

    static deleteUser(id) {
        return fetch(`${UserApi.baseUrl}/${id}`, {
          method: "delete",
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
        });
      }

    static putUser(user, userId) {
        let userIdUrl = UserApi.baseUrl + '/' + userId;
        return fetch(UserApi.baseUrl, {
            method: "put",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })
        
    }
}

document.addEventListener('DOMContentLoaded', () => {

    let regForm = document.querySelector('#regForm');
    let delForm = document.querySelector('#delForm');
    let putForm = document.querySelector('#putForm');
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
            .then(response => {
                console.log(response);
                regForm.style.display = "none";
                usersContainer.style.display = "block";
            })
    })

    delForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let userId = delForm.elements.delete.value;

        UserApi.deleteUser(userId)
            .then(response => {
                console.log(response);
                delForm.style.display = "none";
                usersContainer.style.display = "block";
            })
    })

    putForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let { name, email, password, userId } = putForm.elements;
        let user = new User({
            name: name.value,
            email: email.value,
            password: password.value
        });
        console.log(user);

        UserApi.putUser(user)
            .then(response => {
                console.log(response);
                regForm.style.display = "none";
                usersContainer.style.display = "block";
            })
    })



    let controls = document.querySelector('#controls');
    controls.addEventListener('click', (e) => {
        if (e.target.id == "add") {
            regForm.style.display = "block";
            usersContainer.style.display = "none";
            delForm.style.display = "none";
            putForm.style.display = "none";
        }
        if (e.target.id == "delete") {
            delForm.style.display = "block";
            usersContainer.style.display = "none";
            regForm.style.display = "none";
            putForm.style.display = "none";
        }
        if (e.target.id == "put") {
            putForm.style.display = "block";
            usersContainer.style.display = "none";
            regForm.style.display = "none";
            delForm.style.display = "none";
        }
        if (e.target.id == "get") {
            usersContainer.style.display = "block";
            regForm.style.display = "none";
            delForm.style.display = "none";
            putForm.style.display = "none";

            renderUserList()
        }

    })

    function renderUserList() {
        UserApi.getUsers()
            .then(res => res.json())
            .then(data => data.data)
            .then(users => {
                usersContainer.innerHTML = '';
                users.forEach(user => {
                    usersContainer.innerHTML += `
                            <h1 class="name">${user.name}</h1>
                            <p class="email">${user.email}</p>
                        `
                })
            })
    }
})

