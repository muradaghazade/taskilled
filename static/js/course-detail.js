pk = document.getElementById("page-pk").innerText;

url = `http://127.0.0.1:8000/api/v1/core/course/${pk}`;

console.log(url);



getCourseDetail = () => {
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      document.querySelectorAll(".the-title").forEach(element => {
          element.innerHTML = data.title
      });
      document.querySelectorAll(".course-price").forEach(element => {
        element.innerHTML = `${data.price}$`
    });
    document.querySelectorAll(".deadline").forEach(element => {
      element.innerHTML = `${data.course_deadline}`
  });
      fetch(`http://127.0.0.1:8000/api/v1/edit-user/${data.teacher}`)
        .then((resp) => resp.json())
        .then((user) => {
        console.log(user.last_name);
        document.querySelectorAll(".teacher-here").forEach(element => {
            element.innerHTML = `${user.first_name} ${user.last_name}`
        });
    })
      document.querySelector(".description").innerHTML = data.description
      document.querySelector(".min-age").innerHTML = data.minimum_age
    })
}

getCourseDetail()

renderSubjects = () => {

  let id_list = []

  fetch(`http://127.0.0.1:8000/api/v1/core/all-subjects/`)
        .then((resp) => resp.json())
        .then((data) => {
          data.forEach(e => {
            if(e.course == pk) {
              document.querySelector(".subjects-here").innerHTML += 
              `<div style="border: 1px solid lightgray; border-radius: 5px;" class="px-3 pt-3 mb-3">
  <h5>${e.title}</h5>
  <div style="color: gray;" class="d-flex">
      <div class="d-flex">
          <i class="fas fa-birthday-cake"></i>
          <p class="ml-1">${e.deadline} weeks</p>
      </div>
      <div class="d-flex ml-3">
  
      </div>
  </div>
  </div>`

  document.querySelector(".len").innerHTML = `${data.length} subjects`



  fetch(`http://127.0.0.1:8000/api/v1/core/all-questions/`)
        .then((resp) => resp.json())
        .then((quest) => {
          console.log(quest);
          quest.forEach(el => {
            console.log(el.subject, e.id, "caaa");
            if(el.subject == e.id) {
              console.log(el.id);
              id_list.push(el.id)

            }
          })

          console.log(id_list);
       localStorage.setItem('id_list', id_list)
       let ids = localStorage.getItem('id_list')
       let usable_ids = ids.split(',');
       document.getElementById("start-a").href = `/core/question/${usable_ids[0]}`
        })



  
            }
            
          })
       
    })
}

renderSubjects()


createOrder = () => {
 



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
        .then((user_data) => {
          console.log(user_data);

          data = {
            user: user_data.id,
            course: pk
        }

        fetch(`http://127.0.0.1:8000/api/v1/core/order/`, {
    method: "POST",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data, 'yeaaaa');
      document.getElementById("congrats-div").innerHTML = `<p style="color: green;">You successfuly bought this course!</p>`
      // document.location.href = '/core/login'
      document.getElementById("start-course").style.display = 'block'
    })

        })




}

document.getElementById("order-button").addEventListener('click', () => {
  createOrder()
})



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
        .then((data) => {
          console.log(data);
          fetch(`http://127.0.0.1:8000/api/v1/core/all-order/`)
          .then((resp) => resp.json())
          .then((orders) => {
            console.log(orders);
            orders.forEach(e => {
             if (e.course == pk && e.user == data.id) {
              document.getElementById("congrats-div").innerHTML = `<p style="color: green;">You successfuly bought this course!</p>`
              // document.location.href = '/core/login'
              document.getElementById("start-course").style.display = 'block'
             }
            })
          })
        })







