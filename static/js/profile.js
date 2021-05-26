getUsersUrl = 'http://127.0.0.1:8000/api/v1/core/all-courses/';


getCourseList = () => {

  let jwt = `Bearer ${localStorage.getItem("token")}`
  console.log(jwt);
  fetch("http://127.0.0.1:8000/api/v1/user-data/", {
      method: "POST",
      headers: {
          "Content-type": "application/json",
          "Authorization": jwt
      },
      // body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((user) => {
        console.log(user);
        fetch(getUsersUrl)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      data.forEach(element => {
        console.log(user ,"yeaa");
        console.log(element.teacher, "dfdfdhfd");
        if (user.id == element.teacher) {
          document.getElementById("course-here").innerHTML += `
          <div class="col-3 created">
                        <div class="card">
                            <div class="for-image">
                                <img src="${element.image}" class="card-img-top" alt="...">
                            </div>
                            <div class="card-body p-0">
                              <h5 class="card-title text-center mt-2">${element.title}</h5>
                            </div>
                          </div>
                    </div>`
        }
        else {
          document.getElementById("course-here").innerHTML += "noo"
        }
          
      });
    })
      })

    
}

getCourseList()


