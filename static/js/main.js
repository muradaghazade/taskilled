url = "http://127.0.0.1:8000/api/v1/core/all-courses/";

getCourseList = () => {
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data.slice(0,4));
      console.log(document.querySelector(".fleximg"));
      data.slice(0,4).forEach(element => {
          document.querySelector(".fleximg").innerHTML += `
          
          <div>
            <h3>Price ${element.price}$</h3>
            <span>21 school</span>
            <img
              src="${element.image}"
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