let pk = document.getElementById("pk").innerText

// console.log(pk);

let editUrl = `/api/v1/core/course/${pk}`

getCourseData = () => {
    fetch(editUrl)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      document.getElementById("title").value = data.title
      document.getElementById("description").value = data.description
      document.getElementById("price").value = data.price
      document.getElementById("age").value = data.minimum_age
      document.getElementById("time").value = data.course_deadline
    //   document.getElementById("image").files = data.image
    })
}

getCourseData()