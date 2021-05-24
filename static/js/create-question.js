var yes_btn = document.querySelector('.yes')
var no_btn = document.querySelector('.no')
var correct_ans = document.querySelector('.correct_answer')
var other = document.querySelector('.other')


yes_btn.addEventListener('click', event => {
    correct_ans.style = 'display:block'
    other.style = 'display:none'
});

no_btn.addEventListener('click', event => {
    correct_ans.style = 'display:none'
    other.style = 'display:block'
});