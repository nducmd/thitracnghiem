var x = document.getElementById("login");
var y = document.getElementById("register");

function register() {
  x.style.display = "none";
  y.style.display = "flex";
}

function login() {
  y.style.display = "none";
  x.style.display = "flex";
}

function checkLogin() {
  var inputUsername = document.getElementById("usernameLogin").value;
  var inputPassword = document.getElementById("passwordLogin").value;

  if (inputUsername === "admin" && inputPassword === "admin") {
    window.location.href = "admin.html";
    return false;
  }
  if (inputUsername === "user" && inputPassword === "user") {
    window.location.href = "exam.html";
    return false;
  }
}

function checkEmail() {
  var input = document.getElementById("email");
  var value = input.querySelector("input").value;
  var message = input.querySelector(".message");
  var icon = input.querySelector(".icon i");

  var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (value.match(pattern)) {
    input.classList.add("valid");
    input.classList.remove("invalid");
    message.innerHTML = "";
    icon.classList.remove("ri-mail-fill");
    icon.classList.add("ri-checkbox-circle-fill");
    icon.classList.remove("ri-close-circle-fill");
  } else {
    input.classList.remove("valid");
    input.classList.add("valid");
    message.innerHTML = "Email không hợp lệ";
    icon.classList.remove("ri-mail-fill");
    icon.classList.remove("ri-checkbox-circle-fill");
    icon.classList.add("ri-close-circle-fill");
  }

  if (value == "") {
    input.classList.remove("valid");
    input.classList.remove("invalid");
    message.innerHTML = "";
    icon.classList.add("ri-mail-fill");
    icon.classList.remove("ri-checkbox-circle-fill");
    icon.classList.remove("ri-close-circle-fill");
  }
}

function checkUsername() {
  var input = document.getElementById("username");
  var value = input.querySelector("input").value;
  var message = input.querySelector(".message");
  var icon = input.querySelector(".icon i");

  icon.classList.remove("ri-user-3-fill");
  icon.classList.add("ri-checkbox-circle-fill");
  icon.classList.remove("ri-close-circle-fill");

  if (value == "") {
    input.classList.remove("valid");
    input.classList.remove("invalid");
    message.innerHTML = "";
    icon.classList.add("ri-user-3-fill");
    icon.classList.remove("ri-checkbox-circle-fill");
    icon.classList.remove("ri-close-circle-fill");
  }
}

function checkPassword() {
  var first = document
    .getElementById("first-password")
    .querySelector("input").value;
  var label = document.getElementById("second-password");
  var icon = label.querySelector(".icon i");
  var second = label.querySelector("input").value;
  var message = label.querySelector(".message");

  if (second == "") {
    message.innerHTML = "";
    icon.classList.add("ri-eye-close-line");
    icon.classList.remove("ri-checkbox-circle-fill");
    icon.classList.remove("ri-close-circle-fill");
  } else if (second == first) {
    message.innerHTML = "";
    icon.classList.remove("ri-eye-close-line");
    icon.classList.add("ri-checkbox-circle-fill");
    icon.classList.remove("ri-close-circle-fill");
  } else {
    message.innerHTML = "Mật khẩu không khớp";
    icon.classList.remove("ri-eye-close-line");
    icon.classList.remove("ri-checkbox-circle-fill");
    icon.classList.add("ri-close-circle-fill");
  }
}
