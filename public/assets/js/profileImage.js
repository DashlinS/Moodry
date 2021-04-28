var radios = document.getElementsByTagName("input");

var picked;
var image;

document.querySelector('#submit').addEventListener('click', check)

function check(){
  let myName = document.querySelector('.name').value
  let username = document.querySelector('.username').value
  let age = document.querySelector('.age').value
  let birthday = document.querySelector('.birthday').value
  let grade = document.querySelector('.grade').value
  let favorite = document.querySelector('.favorite').value
  console.log(birthday, myName)
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].type === "radio" && radios[i].checked) {
      // get value, set checked flag or do whatever you need to
      picked = radios[i].value;
      image = radios[i].getAttribute("data-image");
    }
  }
  let userInfo = {
    profileImage: image,
    myName: myName,
    username: username,
    age: age,
    birthday: birthday,
    grade: grade,
    favorite: favorite,
  };

  fetch("/onboard", {
    method: "POST",
    body: JSON.stringify({ 
      userInfo : userInfo
     }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());
}
