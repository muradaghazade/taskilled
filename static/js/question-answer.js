pk = document.getElementById("pk").innerText;

userAnswerUrl = 'http://127.0.0.1:8000/api/v1/core/user-answer/';
userAnswerDataUrl = `http://127.0.0.1:8000/api/v1/core/question/${pk}/`;

console.log(userAnswerDataUrl);

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

let usable_ids = localStorage.getItem('id_list').split(',')

let next_id = usable_ids.indexOf(pk) + 1

if(next_id != undefined){
  document.getElementById('next-a').href = `/core/question/${usable_ids[next_id]}`
}




getQuestionOptions = () => {
  fetch(`http://127.0.0.1:8000/api/v1/core/all-options/`)
    .then((resp) => resp.json())
    .then((data) => {
      // console.log(data);
      data.forEach(element => {
        console.log(element, 'amill');
        if (element.question == pk) {
          document.querySelector(".radio-butto-container").innerHTML +=
            `<div class="rad-small" val="${element.content}">
    
              <input type="radio" name="q" id="optionn">
              <span class="option">${element.content}</span>
          </div>
          
          
          `
          document.querySelector(".video").innerHTML +=
            `<video controls>
              <source src="${data.video}" type="video/mp4">  
        </video>
        <div>
          <img src="${data.image}">
        </div>
        `
        }

      });

    })
}

getQuestionData = () => {
  fetch(userAnswerDataUrl)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      getQuestionOptions()
      document.getElementById("question-title").innerHTML = data.title
      document.getElementById("question-desc").innerHTML = data.description
      document.getElementById("success-here").innerHTML = data.is_success
      if (data.is_auto === true){
        document.getElementById("video").style.display = "none";
      }else{
        document.getElementById("video").innerHTML =`<video width="320" height="240" controls>
        <source src="${data.video}" type="video/mp4">
        <source src="${data.video}" type="video/ogg">
        Your browser does not support the video tag.
      </video>` 

      }

      console.log(data.subject);
    })
}

answerQuestion = (answer) => {

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
      data = {
        answer: answer,
        question: pk,
        user: user.id,
        feedback: ""

      }
      fetch(userAnswerUrl, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);

          fetch(`http://127.0.0.1:8000/api/v1/core/question/${data.question}`)
            .then((resp) => resp.json())
            .then((question) => {
              if (question.correct_answer == data.answer) {

                fetch(`http://127.0.0.1:8000/api/v1/core/question/${question.id}/`, {
                    method: "PATCH",
                    headers: {
                      "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                      is_success: true
                    }),
                  })
                  .then((resp) => resp.json())
                  .then((result) => {
                    console.log(result);
                    document.getElementById("success-here").innerHTML = "Question answered successfully"
                    document.getElementById('next').style.display = 'none'
                    document.getElementById('next-a').style.display = 'block'
                  })
              } else {
                document.getElementById("success-here").innerHTML = "Question answered unsuccessfully!"
                document.getElementById('next').style.display = 'none'
                document.getElementById('next-a').style.display = 'block'
              }

            })

        })
    })


}







// async function answerOpenQuestion(video=null, image=null) {

//   let jwt = `Bearer ${localStorage.getItem("token")}`
//   console.log(jwt);
//   fetch(`http://127.0.0.1:8000/api/v1/user-data/`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         "Authorization": jwt
//       },
//       // body: JSON.stringify(data),
//     })
//     .then((resp) => resp.json())
//     .then( async (user) => {
//       console.log(user);
//       data = {
//         answer: "BLANK",
//         question: pk,
//         user: user.id,
//         feedback: "",
//         image: await toBase64(image),
//         video: await toBase64(video)

//       }
//       console.log(data);
//       fetch(userAnswerUrl, {
//           method: "POST",
//           headers: {
//             "Content-type": "application/json",
//           },
//           body: JSON.stringify(data),
//         })
//         .then((resp) => resp.json())
//         .then((data) => {
//           console.log(data);

          

//         })
//     })


// }







document.getElementById("next").addEventListener('click', (e) => {
  e.preventDefault()
  optionss = document.querySelectorAll("#optionn")
  
// console.log(video,image);
  optionss.forEach(e => {
    if (e.checked) {
      console.log(e.parentElement.getAttribute("val"),'salam'); 
      answerQuestion(e.parentElement.getAttribute("val"))
      
    }
  })
  
})

getQuestionData()



// document.getElementById("open-form").addEventListener('submit', (e) => {
//   e.preventDefault();
//   let video = document.getElementById("video-input").files[0]
//   let image = document.getElementById("image-input").files[0]
//   console.log(video, image);
//   answerOpenQuestion(video, image)
// })