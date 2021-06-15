getUsersUrl = '/api/v1/core/all-courses/';


getCourseList = () => {

  let jwt = `Bearer ${localStorage.getItem("token")}`
  // console.log(jwt,'salammmm');
  fetch("/api/v1/user-data/", {
      method: "POST",
      headers: {
          "Content-type": "application/json",
          "Authorization": jwt
      },
     
    })
      .then((resp) => resp.json())
      .then((user) => {
        console.log(user);
        localStorage.setItem('user_id',user.id)
        fetch(getUsersUrl)
    .then((resp) => resp.json())
    .then((data) => {
      // console.log(data,'jnasjcknascksancksancskancsajkcnsajcsajsnans');
      data.forEach(element => {
        
        // console.log(element.teacher, "dfdfdhfd");
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
                            <div>
                            <a href="/edit-course/${element.id}">Edit</a>
                            </div>
                          </div>
                    </div>
                    `
        }
        else {
          document.getElementById("course-here").innerHTML += ""
        }
          
      });
    })
      })

    
}

getCourseList()


