var plus_btn = document.querySelector('.created');
var form = document.querySelector('form');
var next = document.querySelector('.next');
// console.log(form);
// console.log($(".form_subject")); 
plus_btn.addEventListener('click', event => {
    form.style='display:block'
    next.style='display:block'
});

subjectURL = 'http://127.0.0.1:8000/api/v1/core/create-subject/';



subject = (subject_name, deadline) => {
    
    data = {
        title: subject_name,
        deadline: deadline,
        course:1
        
    }
    fetch(subjectURL, {
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

document.querySelector(".from_subject").addEventListener('submit', (e) => {
    e.preventDefault()
    let subject_name = document.getElementById('name').value;
    let deadline = document.getElementById('deadline').value;
    subject_name.innerHTML = ''
    deadline.innerHTML = ''
    
    console.log(subject_name);
    subject(subject_name,deadline)

});