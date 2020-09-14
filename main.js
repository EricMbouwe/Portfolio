const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const comment = document.getElementById("comment");

let followers = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
  sendInfos();
  resetForm(); 
});

function checkInputs() {
  const nameValue = name.value.trim();
  const emailValue = email.value.trim();
  const commentValue = comment.value.trim();

  if (nameValue === "") {
    setErrorFor(name, "Name can't be blank");
  } else {
    setSuccessFor(name);
  }

  if (emailValue === "") {
    setErrorFor(email, "Email can't be blank");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Not a valid email");
  } else {
    setSuccessFor(email);
  }

  if (commentValue === "") {
    setErrorFor(comment, "Message can't be blank");
  } else {
    setSuccessFor(comment);
  }
}

name.onkeyup = () => {
  const nameVal = name.value.trim();
  if (nameVal !== '') {
    setSuccessFor(name);
  }else {
  setErrorFor(name, 'Enter your name please');
  }
}

email.onkeyup = () => {
  const emailVal = email.value.trim();
  if (isEmail(emailVal)) {
    setSuccessFor(email);
  } else {
    setErrorFor(email, "Your email is not valid");
  }
};

comment.onkeyup = () => {
  const commentVal = comment.value.trim();
  if (commentVal !== '') {
    setSuccessFor(comment);
  } else {
    setErrorFor(comment, "Say Hello!!");
  }
};
  

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-group error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-group success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

const sendInfos = () => {
  const nameValue = name.value.trim();
  const emailValue = email.value.trim();
  const commentValue = comment.value.trim();

  const follower = { name : nameValue,
                     email : emailValue,
                     message : commentValue
  }
  
  if(follower['name'] != ' ' && follower['email'] != ' ' && follower['message'] != ' ') {
    followers.push(follower);
  }
};

const resetForm = () => {
  name.value = '';
  email.value = '';
  comment.value = '';
}
