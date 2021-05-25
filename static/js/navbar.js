userTokenUrl = "http://127.0.0.1:8000/api/v1/user-data/";


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
          document.querySelector(".user-data-here").innerHTML = `<button class="btn auth-reg my-2 my-sm-0 ml-4" type="submit">${data.username}</button>` 
        })
}

getTokenData()