registerURL = 'http://127.0.0.1:8000/api/v1/register/';



register = (username, firstname, lastname, email, password1, password2, age) => {
    // formdata = new FormData();
    // formdata.append("firstname", firstname);
    // formdata.append("lastname", lastname);
    // formdata.append("email", email);
    // formdata.append("password1", password1);
    // formdata.append("password2", password2);
    // formdata.append("age", age);
    // formdata.append("is_teacher", true);
    // formdata.append("is_student", false);
    // for (const [k, v] of formdata) {
    //     console.log(k, v);
    //   }
    data = {
        username: username,
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password1,
        password2: password2,
        age: age,
        is_teacher: false,
        is_student: true
    }
    fetch(registerURL, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
        })
}

document.getElementById("regForm").addEventListener('submit', (e) => {
    e.preventDefault()
    let username = document.getElementById('username').value;
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let password1 = document.getElementById('password1').value;
    let password2 = document.getElementById('password2').value;
    let age = document.getElementById('age').value;
    console.log(firstname);
    register(username, firstname, lastname, email, password1, password2, age)
})