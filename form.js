"use strict";

const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#mail");
const firstpassword = document.querySelector("#firstpassword");
const secondpassword = document.querySelector("#secondpassword");
const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const phone = document.querySelector("#phone");
const fields = document.querySelectorAll(".field");
const username = document.querySelector("#username");
const usernameBlock = document.querySelector(".username-block");
const buttonModalOpen = document.querySelector(".buttonModalOpen");
const buttonRegistration = document.querySelector(".buttonRegistration");
const buttonAddPost = document.querySelector("#buttonAddPost");

const modalcontainer = document.querySelector("#modalcontainer");
let userData = localStorage.getItem("user");
let errorMessage = document.querySelectorAll(".errorMessage");
class Form {
  static patternName = /^([а-яё]{3,15}|[a-z]{3,15})$/;
  static patternMail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  static patternPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  static patternFirstpassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-#!$@%^&*_+~=:;?\/])[-\w#!$@%^&*+~=:;?\/]{8,}$/;
  static errorMessage = [
    "Поле не заполнено", // 0
    "Введите Ваше реальное имя", // 1
    "Неверный формат адреса электронной почты", // 2
    "Пароль должен содержать от 8 до 20 символов, минимум одну цифру, буквы в верхем и нижнем регистре и символы", // 3
    "Пароль не совпадает", // 4
    "Такого числа в месяце не бывает", // 5
    "Год должен содежать только реальные цифры в формате 'xxxx'", // 6
    "Номер телефона указан неверно", // 7
  ];
}

document.addEventListener("DOMContentLoaded", function () {
  if (userData !== null) {
    username.innerHTML = JSON.parse(userData).firstname;
    buttonAddPost.style.display = "block";
    buttonModalOpen.style.display = "none";
  } else {
    usernameBlock.style.display = "none";
    buttonAddPost.style.display = "none";
  }
});

buttonRegistration.onclick = function (event) {
  event.preventDefault();

  let user = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    firstpassword: firstpassword.value,
    secondpassword: secondpassword.value,
    day: day.value,
    month: month.value,
    year: year.value,
    phone: phone.value,
  };

  for (let i = 0; i < fields.length; i++) {
    if (fields[i].value == "") {
      errorMessage[i].innerHTML = Form.errorMessage[0];
    }
  }

  if (
    user.firstname !== "" &&
    user.lastname !== "" &&
    user.email !== "" &&
    user.firstpassword !== "" &&
    user.secondpassword !== "" &&
    user.day !== "" &&
    user.month !== "" &&
    user.year !== "" &&
    user.phone !== "" &&
    user.phone.match(Form.patternPhone)
  ) {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Регистрация прошла успешно!");
    modalcontainer.style.display = "none";
    buttonAddPost.style.display = "block";
    buttonModalOpen.style.display = "none";
    window.location.reload();
  }
};

function Validate(object, pattern, errorMessage) {
  if (object.value !== "") {
    if (object.value.match(pattern)) {
      object.style.border = "green solid 1px";
      object.nextElementSibling.innerHTML = "";
      return true;
    } else {
      object.nextElementSibling.innerHTML = errorMessage;
      object.style.border = "red solid 1px";
    }
  }
}

function validateNumber(object, numberOne, numberTwo, errorMessage) {
  if (object.value !== "") {
    if (object.value >= numberOne && object.value <= numberTwo) {
      object.nextElementSibling.innerHTML = "";
      object.style.border = "green solid 1px";
      return true;
    } else {
      object.nextElementSibling.innerHTML = errorMessage;
      object.style.border = "red solid 1px";
    }
  }
}

function validateSelect(object, errorMessage) {
  if (object.value !== "") {
    object.style.border = "green solid 1px";
    object.nextElementSibling.innerHTML = "";
    return true;
  } else {
    object.nextElementSibling.innerHTML = errorMessage;
    object.style.border = "red solid 1px";
  }
}

function validateSecondpassword() {
  if (firstpassword.value !== "") {
    if (secondpassword.value !== firstpassword.value) {
      secondpassword.nextElementSibling.innerHTML = Form.errorMessage[4];
      secondpassword.style.border = "red solid 1px";
    } else {
      secondpassword.nextElementSibling.innerHTML = "";
      secondpassword.style.border = "green solid 1px";
    }
  }
}

firstname.addEventListener("input", function () {
  Validate(firstname, Form.patternName, Form.errorMessage[1]);
});

lastname.addEventListener("input", function () {
  Validate(lastname, Form.patternName, Form.errorMessage[1]);
});

email.addEventListener("input", function () {
  Validate(email, Form.patternMail, Form.errorMessage[2]);
});

firstpassword.addEventListener("input", function () {
  Validate(firstpassword, Form.patternFirstpassword, Form.errorMessage[3]);
});

secondpassword.addEventListener("input", function () {
  validateSecondpassword();
});

day.addEventListener("input", function () {
  validateNumber(day, 1, 31, Form.errorMessage[5]);
});

month.addEventListener("input", function () {
  validateSelect(month, Form.errorMessage[0]);
});

year.addEventListener("input", function () {
  validateNumber(year, 1923, 2023, Form.errorMessage[6]);
});

phone.addEventListener("input", function () {
  Validate(phone, Form.patternPhone, Form.errorMessage[7]);
});

function modalClose() {
  modalcontainer.style.display = "none";
  buttonModalOpen.style.display = "block";
  enableScroll();
  window.location.reload();
}

function modalOpen() {
  modalcontainer.style.display = "block";
  buttonModalOpen.style.display = "none";
  disableScroll();
}

function disableScroll() {
  const mainContainer = document.querySelector(".container");
  mainContainer.classList.add("scrollDisabling");
}

function enableScroll() {
  const mainContainer = document.querySelector(".container");
  mainContainer.classList.remove("scrollDisabling");
}
