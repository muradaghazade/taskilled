createCourseUrl = "http://127.0.0.1:8000/api/v1/core/course/";

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

async function createCourse (title, teacher, price, image, description, course_deadline, minimum_age) {
    // formdata = new FormData();
    // formdata.append("title", title);
    // formdata.append("teacher", teacher);
    // formdata.append("price", price);
    // formdata.append("image", image);
    // formdata.append("description", description);
    // formdata.append("course_deadline", course_deadline);
    // formdata.append("minimum_age", minimum_age);
    // for (const [k, v] of formdata) {
    //     console.log(k, v);
    //   }
    file = await toBase64(image)
    data = {
        title: title,
        teacher: teacher,
        price: price,
        image: file,
        description: description,
        course_deadline: course_deadline,
        minimum_age: minimum_age
    }
    fetch(createCourseUrl, {
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

document.getElementById("courseForm").addEventListener('submit', (e) => {
  e.preventDefault()
  title = document.getElementById('title').value;
  description = document.getElementById("description").value;
  price = document.getElementById("price").value;
  minimum_age = document.getElementById("age").value;
  course_deadline = document.getElementById("time").value;
  image = document.getElementById("image").files[0];
  createCourse(title,1, price,image, description,course_deadline,minimum_age)
})