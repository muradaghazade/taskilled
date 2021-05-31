userTokenUrl = "/api/v1/user-data/";


getTokenData = () => {
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
    let jwt = `Bearer ${localStorage.getItem("token")}`
    console.log(jwt);
    fetch(userTokenUrl, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": jwt
        },
        // body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          if (data.is_teacher == 1) {
            document.getElementById('cre-link').innerHTML = `<a class="nav-link" href="/create-course">Create Course</a>`
            
          }
         

          if (data.username != undefined) {
            document.querySelector(".user-data-here").innerHTML = `<a href="/profile"><button class="btn auth-reg my-2 my-sm-0 ml-4" type="submit">${data.username}</button></a>`
            if (data.is_student == 1) {
            document.querySelector(".user-data-here").innerHTML = `<a href="/student-profile"><button class="btn auth-reg my-2 my-sm-0 ml-4" type="submit">${data.username}</button></a>`
              
            }
          }
          else {
            document.querySelector(".user-data-here").innerHTML = `<a href="/login">
            <button class="btn auth my-2 my-sm-0 ml-4" type="submit">Login</button>
          </a>
          <a href="/register-type">
            <button class="btn auth-reg my-2 my-sm-0 ml-4" type="submit">Register</button>
          </a>`
          }
        })
}

getTokenData()