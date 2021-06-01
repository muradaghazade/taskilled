pk = document.getElementById("pk").innerText;

userAnswerUrl = '/api/v1/core/user-answer/';
userAnswerDataUrl = `/api/v1/core/question/${pk}/`;

console.log(userAnswerDataUrl);

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

let usable_ids = localStorage.getItem('id_list').split(',')

let next_id = usable_ids.indexOf(pk) + 1

console.log(next_id, 'ddddd');

console.log(usable_ids[usable_ids.length - 1],'aaaa');

if(usable_ids[next_id] == usable_ids[usable_ids.length - 1]){
  document.getElementById('next-a').href = `/`
  
}
else {
  document.getElementById('next-a').href = `/question/${usable_ids[next_id]}`
}




getQuestionOptions = () => {
  fetch(`/api/v1/core/all-options/`)
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
      // document.getElementById("success-here").innerHTML = data.is_success
      if (data.is_auto === true){
        document.getElementById("video").style.display = "none";
      }else{
        document.getElementById("open-form").style.display = "block";
        document.getElementById("video").innerHTML =`<video width="500" height="300" controls>
        <source src="${data.video}" type="video/mp4">
        <source src="${data.video}" type="video/ogg">
        Your browser does not support the video tag.
      </video>` 

      document.getElementById('q-image').innerHTML = `
      <img style="width: 200px;" src="${data.image}" />
      `

      }

      console.log(data, "adadada");

      if (data.is_auto == false) {
        document.getElementById("next").style.display = "none"
        document.getElementById("next-a").style.display = "block"
      }

    })
}

answerQuestion = (answer) => {

  let jwt = `Bearer ${localStorage.getItem("token")}`
  console.log(jwt);
  fetch(`/api/v1/user-data/`, {
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

          fetch(`/api/v1/core/question/${data.question}`)
            .then((resp) => resp.json())
            .then((question) => {
              if (question.correct_answer == data.answer) {

                fetch(`/api/v1/core/question/${question.id}/`, {
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







async function answerOpenQuestion(video=null, image=null, text=null) {

  let jwt = `Bearer ${localStorage.getItem("token")}`
  console.log(jwt);
  fetch(`/api/v1/user-data/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": jwt
      },
      // body: JSON.stringify(data),
    })
    .then((resp) => resp.json())
    .then( async (user) => {
      console.log(user);
      data = {
        answer: text,
        question: pk,
        user: user.id,
        feedback: "",
        image: await toBase64(image),
        video: await toBase64(video)

      }
      console.log(data);
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

          

        })
    })


}







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



document.getElementById("open-form").addEventListener('submit', (e) => {
  e.preventDefault();
  let ans_textt = document.getElementById("answer-textt").value
  let video = document.getElementById("video-input").files[0]
  let image = document.getElementById("image-input").files[0]
  console.log(video, image);
  answerOpenQuestion(video, image, ans_textt)
})