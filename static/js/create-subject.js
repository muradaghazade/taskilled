var plus_btn = document.querySelector('.created');
var form = document.querySelector('form');
var next = document.querySelector('.next');
// console.log(form);
// console.log($(".form_subject")); 
plus_btn.addEventListener('click', event => {
    form.style='display:block'
    next.style='display:block'
});