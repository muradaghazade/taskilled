let is_auto;

var yes_btn = document.querySelector('.yes')
var no_btn = document.querySelector('.no')
const correct_ans = document.querySelector('.correct_answer_div')
var other = document.querySelector('.other')
var options_div = document.querySelector('.options_div')
var video_spn = document.querySelector('#video1')
var image_spn = document.querySelector('#image1')
var link_spn = document.querySelector('#link1')

var upl_video = document.querySelector('#video')
var upl_image = document.querySelector('#image')
var upl_link = document.querySelector('#link')

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

yes_btn.addEventListener('click', event => {
    correct_ans.style = 'display:block'
    other.style = 'display:none'
    options_div.style = 'display:block'
    is_auto = true
    console.log(is_auto);
});

no_btn.addEventListener('click', event => {
    correct_ans.style = 'display:none'
    other.style = 'display:block'
    options_div.style = 'display:none'
    is_auto = false
    console.log(is_auto);
});

video_spn.addEventListener('click', event => {
    if(document.getElementById('video').style = 'display:none'){
        document.getElementById('video').style = 'display:flex'
        document.getElementById('video').style = 'justify-content:center'
    }
    else if(document.getElementById('video').style = 'display:block'){
        document.getElementById('video').style = 'display:none'
    }
    
});

image_spn.addEventListener('click', event => {
    document.getElementById('image').style = 'display:flex'
    document.getElementById('image').style = 'justify-content:center'
});

link_spn.addEventListener('click', event => {
    document.getElementById('link').style = 'display:flex'
    document.getElementById('link').style = 'justify-content:center'
});


questionUrl = 'http://127.0.0.1:8000/api/v1/core/question/';
optionUrl = 'http://127.0.0.1:8000/api/v1/core/option/';


questionCreate = (title, question,correct_answer,subject_id,options, is_auto) => {
    
    data = {
        title: title,
        description: question,
        correct_answer:correct_answer,
        is_auto:is_auto,
        is_success:0,
        subject:subject_id
        
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
        //   localStorage.setItem('question_id',data.id)
          console.log('buradaaaaa');
          for (let i of options) {
            if (i != "") {
                console.log('burada');
                optionCreate(i, data.id)
            }
        }
        })
}

async function manualQuestionCreate(title, question,image = null, video = null, edu_url,subject_id, is_auto) {
    console.log(image);
    console.log(video);
    data = {
        title: title,
        description: question,
        edu_url:edu_url,
        is_auto:is_auto,
        is_success:0,
        subject:subject_id
        
    }
    if (image != null) {
        img_file = await toBase64(image)
        data.image = img_file

    }

    if (video != null) {
        video_file = await toBase64(video)
        data.video = video_file
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
        //    localStorage.setItem('question_id', data.id)
           console.log('buradaaaaa');
        })
}

document.querySelector(".question_form").addEventListener('submit', (e) => {
    e.preventDefault()
    let title = document.getElementById('title').value;
    let question = document.getElementById('question').value
    let correct_answer = document.getElementById('correct_answer').value;
    let image = document.getElementById('image').files[0];
    let video = document.getElementById('video').files[0];
    let link = document.getElementById('link').value;
    var inputs = document.querySelectorAll('.option')
    subject_id = localStorage.getItem('subject_id')

    var options = []
    
    for (let i of inputs){
        options.push(i.value)
    }

    console.log(options);
   
    

    

    if(document.querySelector('.correct_answer_div').style.display == 'block'){
        questionCreate(title,question,correct_answer,subject_id, options, is_auto)
        console.log('bura girdim');
        // for (let i of options) {
        //     if (i != "") {
        //         console.log('burada');
        //         optionCreate(i, localStorage.getItem("question_id"))
        //     }
        // }
    }
    else if(other.style.display == 'block'){
        manualQuestionCreate(title, question, image, video, link,subject_id, is_auto)
    }
   
    

});






optionCreate = (content, question) => {
    
    data = {
        content: content,
        question: question,
        
    }
    fetch(optionUrl, {
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

