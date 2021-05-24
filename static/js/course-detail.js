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
  fetch(`http://127.0.0.1:8000/api/v1/core/all-subjects/`)
        .then((resp) => resp.json())
        .then((data) => {
          data.forEach(e => {
            if(e.course == pk) {
              document.querySelector(".subjects-here").innerHTML += 
              `<div style="border: 1px solid lightgray; border-radius: 5px;" class="px-3 pt-3">
  <h5>${e.title}</h5>
  <div style="color: gray;" class="d-flex">
      <div class="d-flex">
          <i class="fas fa-birthday-cake"></i>
          <p class="ml-1">${e.deadline}</p>
      </div>
      <div class="d-flex ml-3">
  
      </div>
  </div>
  </div>`

  console.log(data.length);
  document.querySelector(".len").innerHTML = `${data.length} subjects`
            }
            
          })
       
    })
}

renderSubjects()


