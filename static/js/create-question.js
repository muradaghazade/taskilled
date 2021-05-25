var yes_btn = document.querySelector('.yes')
var no_btn = document.querySelector('.no')
const correct_ans = document.querySelector('.correct_answer_div')
var other = document.querySelector('.other')


yes_btn.addEventListener('click', event => {
    correct_ans.style = 'display:block'
    other.style = 'display:none'
});

no_btn.addEventListener('click', event => {
    correct_ans.style = 'display:none'
    other.style = 'display:block'
});


questionUrl = 'http://127.0.0.1:8000/api/v1/core/question/';



questionCreate = (title, question,correct_answer) => {
    
    data = {
        title: title,
        description: question,
        correct_answer:correct_answer,
        is_auto:1,
        is_success:0,
        subject:1
        
    }
    fetch(questionUrl, {
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

manualQuestionCreate = (title, question,correct_answer) => {
    
    data = {
        title: title,
        description: question,
        correct_answer:correct_answer,
        is_auto:1,
        is_success:0,
        subject:1
        
    }
    fetch(questionUrl, {
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

document.querySelector(".question_form").addEventListener('submit', (e) => {
    e.preventDefault()
    let title = document.getElementById('title').value;
    let question = document.getElementById('question').value
    let correct_answer = document.getElementById('correct_answer').value;
    title.innerText = ''
    question.innerText = ''
    

    if(document.querySelector('.correct_answer_div').style.display == 'block'){
        questionCreate(title,question,correct_answer)
    }
    else if(other.style.display == 'block'){
        console.log('qalx duzul')
    }
   
    

});