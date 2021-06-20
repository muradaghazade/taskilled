url = "/api/v1/core/all-courses/";

getCourseList = () => {
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      let courses = []
      data.forEach(e => {
        console.log(e.category);
        if (e.category == 1 && e.is_shared == true) {
          courses.push(e)
        }
      })
      console.log(courses);
      console.log(courses.slice(0,4));
      console.log(document.querySelector(".fleximg"));
      courses.slice(0,4).forEach(element => {
          document.querySelector(".fleximg").innerHTML += `
          
          <div class="col-12 col-md-4 col-sm-6" style="background: url(${element.image}); background-size: cover; background-repeat: no-repeat; height: 200px; border-radius: 5px;">
            <h3>Price ${element.price}$</h3>
            <span style="color: white;">${element.title}</span>
            <img
              src=""
              alt=""
            />
          </div>
        
        
          `
      });
    })
}

getInternshipList = () => {
  fetch(url)
  .then((resp) => resp.json())
  .then((data) => {
    let courses = []
    data.forEach(e => {
      console.log(e.category);
      if (e.category == 2 && e.is_shared == true) {
        courses.push(e)
      }
    })
    console.log(courses);
    console.log(courses.slice(0,4));
    console.log(document.querySelector("#fleximg2"));
    courses.slice(0,4).forEach(element => {
        document.querySelector("#fleximg2").innerHTML += `
        
        <div style="background: url(${element.image}); background-size: cover; background-repeat: no-repeat; height: 200px; width: 300px; border-radius: 5px;">
          <h3>Price ${element.price}$</h3>
          <span style="color: white;">${element.title}</span>
          <img
            src=""
            alt=""
          />
        </div>
      
      
        `
    });
  })
}

getBTaskList = () => {
  fetch(url)
  .then((resp) => resp.json())
  .then((data) => {
    let courses = []
    data.forEach(e => {
      console.log(e.category);
      if (e.category == 3 && e.is_shared == true) {
        courses.push(e)
      }
    })
    console.log(courses);
    console.log(courses.slice(0,4));
    console.log(document.querySelector("#fleximg3"));
    courses.slice(0,4).forEach(element => {
        document.querySelector("#fleximg3").innerHTML += `
        
        <div style="background: url(${element.image}); background-size: cover; background-repeat: no-repeat; height: 200px; width: 300px; border-radius: 5px;">
          <h3>Price ${element.price}$</h3>
          <span style="color: white;">${element.title}</span>
          <img
            src=""
            alt=""
          />
        </div>
      
      
        `
    });
  })
}

// url_users = "http://localhost:8000/api/v1/show-users/";

// getUsersList = () => {
//     fetch(url)
//     .then((resp) => resp.json())
//     .then((data) => {
//       console.log(data.slice(0,4));
//       console.log(document.querySelector(".fleximg"));
//       data[0].forEach(element => {
//           document.querySelector(".instructor__title").innerHTML += `
          
//           <div class="insimg">
//             <img src="${element.image}" alt="" />
//           </div>
//           <div class="instext">
//             <h3>Become an instructor</h3>
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
//               molestiae nulla veritatis esse quam soluta atque eum vel. A esse
//               alias obcaecati suscipit dolorem maxime consequatur corrupti
//               temporibus voluptatibus qui?
//             </p>
//             <button>Start teaching today</button>
//           </div>
          
        
//           `
//       });
//     })
// }

// getCourseList()

getCourseList()
getInternshipList()
getBTaskList()