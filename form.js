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

class Form {
  static patternName = /^[а-яёА-ЯЁ\s]+$/;
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

  constructor(form) {
    this.form = form;
    this.fields = this.form.querySelectorAll(".field");
    this.buttonRegistration = this.document.querySelector(
      ".buttonRegistration"
    );
    this.iserror = false;
    this.registerEventsHandler();
  }
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

  let errors = document.querySelectorAll(".errorMessage");
  for (let i = 0; i < errors.length; i++) {
    errors[i].remove();
  }

  for (let i = 0; i < fields.length; i++) {
    if (fields[i].value == "") {
      let error = generateError(Form.errorMessage[0]);
      fields[i].after(error);
    }
  }

  if (firstpassword.value !== "") {
    if (secondpassword.value !== firstpassword.value) {
      let error = generateError(Form.errorMessage[4]);
      secondpassword.after(error);
      secondpassword.style.border = "red solid 1px";
    } else {
      secondpassword.style.border = "green solid 1px";
    }
  }

  validateName(firstname);
  validateName(lastname);
  validateDay();
  validateYear();
  validateEmail();
  validateFirstpassword();
  validatePhone();

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

function generateError(text) {
  let error = document.createElement("div");
  error.setAttribute("class", "errorMessage");
  error.innerHTML = text;
  return error;
}

function validateName(name) {
  if (name.value !== "") {
    if (name.value.match(Form.patternName)) {
      name.style.border = "green solid 1px";
      return true;
    } else {
      let error = generateError(Form.errorMessage[1]);
      name.after(error);
      name.style.border = "red solid 1px";
    }
  }
}

function validateFirstpassword() {
  if (firstpassword.value !== "") {
    if (firstpassword.value.match(Form.patternFirstpassword)) {
      firstpassword.style.border = "green solid 1px";
      return true;
    } else {
      let error = generateError(Form.errorMessage[3]);
      firstpassword.after(error);
      firstpassword.style.border = "red solid 1px";
    }
  }
}

function validateEmail() {
  if (email.value !== "") {
    if (email.value.match(Form.patternMail)) {
      email.style.border = "green solid 1px";
      return true;
    } else {
      let error = generateError(Form.errorMessage[2]);
      email.after(error);
      email.style.border = "red solid 1px";
    }
  }
}

function validateDay() {
  if (day.value !== "") {
    if (day.value >= 1 && day.value <= 31) {
      day.style.border = "green solid 1px";
      return true;
    } else {
      let error = generateError(Form.errorMessage[5]);
      day.after(error);
      day.style.border = "red solid 1px";
    }
  }
}

function validateYear() {
  if (year.value !== "") {
    if (year.value >= 1923 && year.value <= 2023) {
      year.style.border = "green solid 1px";
      return true;
    } else {
      let error = generateError(Form.errorMessage[6]);
      year.after(error);
      year.style.border = "red solid 1px";
    }
  }
}

function validatePhone() {
  if (phone.value !== "") {
    if (phone.value.match(Form.patternPhone)) {
      phone.style.border = "green solid 1px";
      return true;
    } else {
      let error = generateError(Form.errorMessage[7]);
      phone.after(error);
      phone.style.border = "red solid 1px";
    }
  }
}

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
