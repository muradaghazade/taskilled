let jwt = `Bearer ${localStorage.getItem("token")}`
    console.log(jwt);
    fetch(`http://127.0.0.1:8000/api/v1/user-data/`, {
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
          localStorage.setItem('user_id',user.id)
          url = "/api/v1/core/all-courses/";

          getCourseList = () => {
              fetch(url)
              .then((resp) => resp.json())
              .then((data) => {
                console.log(data,'nedibubele');
                
                data.forEach(element => {
                    document.getElementById("created-section").innerHTML += `
                    <div class="col-3 created">
                    <div class="card">
                        <div class="for-image">
                            <img src="${element.image}"
                                class="card-img-top" alt="...">
                        </div>
                        <div class="card-body p-0">
                            <h5 class="card-title text-center mt-2">${element.title}</h5>
                            <p class="card-text">${element.description}</p> 
                            <a href="#" class="btn btn-primary">start</a>
                        </div>
                    </div>
                </div>
                    `
                });
              })
          }
          
          getCourseList()
        })