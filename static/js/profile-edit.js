
currentUserId = localStorage.getItem('user_id')
console.log(currentUserId,'ssasasasasasasasas');


getUsersUrl = `api/v1/edit-user/${currentUserId}/`;

getUserData = () => {
  fetch(getUsersUrl)
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data.number);

    document.getElementById('username').value = data.username
    document.getElementById('firstname').value = data.first_name
    document.getElementById('email').value = data.email
    document.getElementById('lastname').value = data.last_name
    document.getElementById('age').value = data.age    
    document.getElementById('number').value = data.number    
    document.getElementById('occupation').value = data.occupation    
  })
}




edtUserData = () => {
  username = document.getElementById('username').value 
  first_name = document.getElementById('firstname').value 
  email = document.getElementById('email').value 
  last_name = document.getElementById('lastname').value 
  number = document.getElementById('number').value 
  occupation = document.getElementById('occupation').value 
  age = document.getElementById('age').value 
  let jwt = `Bearer ${localStorage.getItem("token")}`
  console.log('EDITUSERFUNC');

  new_data = {
    username:username,
    first_name:first_name,
    email:email,
    last_name:last_name,
    age:age,
    occupation:occupation,
    number:number
  }

fetch(getUsersUrl, {
  method: "PATCH",
  headers: {
      "Content-type": "application/json",
     
  },
  body: JSON.stringify(new_data),
})
  .then((resp) => resp.json())
  .then((new_data) => {
    console.log(new_data);
    document.location.href = '/'
  })
}


document.getElementById('editForm').addEventListener('submit',(e) => {
  console.log('in addevent submit');
  e.preventDefault();
  edtUserData()
 
})

getUserData()
// editUserData()



