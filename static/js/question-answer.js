pk = document.getElementById("pk").innerText;

userAnswerUrl = 'http://127.0.0.1:8000/api/v1/core/user-answer/';
userAnswerDataUrl = `http://127.0.0.1:8000/api/v1/core/question/${pk}/`;

console.log(userAnswerDataUrl);



getQuestionOptions = () => {
  fetch(`http://127.0.0.1:8000/api/v1/core/all-options/`)
        .then((resp) => resp.json())
        .then((data) => {
          // console.log(data);
          data.forEach(element => {
            if (element.question == pk) {
              document.querySelector(".radio-butto-container").innerHTML += 
              `<div class="rad-small" val="${element.content}">
    
              <input type="radio" name="q" id="optionn">
              <span class="option">${element.content}</span>
          </div>`
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
            user:user.id,
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
              })
                }
                else {
                  document.getElementById("success-here").innerHTML = "Question answered unsuccessfully!"
                }
    
              })
    
            })
        })
    
    
}

document.getElementById("next").addEventListener('click', (e) => {
  e.preventDefault()
  optionss = document.querySelectorAll("#optionn")
  optionss.forEach(e => {
    if (e.checked){
      answerQuestion(e.parentElement.getAttribute("val"))
      // console.log(e.parentElement.getAttribute("val"))
    }
  })
    // title = document.getElementById('title').value;
    // description = document.getElementById("description").value;
    // price = document.getElementById("price").value;
    // minimum_age = document.getElementById("age").value;
    // course_deadline = document.getElementById("time").value;
    // image = document.getElementById("image").files[0];
    // createCourse(title,1, price,image, description,course_deadline,minimum_age)
  })

  getQuestionData()