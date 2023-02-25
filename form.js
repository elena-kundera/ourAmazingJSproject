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
      let error = generateError("Поле не заполнено");
      fields[i].after(error);
    }
  }

  if (user.firstname !== "") {
    firstname.style.border = "green solid 1px";
  }

  if (user.lastname !== "") {
    lastname.style.border = "green solid 1px";
  }

  if (firstpassword.value !== "") {
    if (secondpassword.value !== firstpassword.value) {
      let error = generateError("Пароль не совпадает");
      secondpassword.after(error);
      secondpassword.style.border = "red solid 1px";
    } else {
      secondpassword.style.border = "green solid 1px";
    }
  }

  validateDay(day);
  validateYear(year);
  validateEmail(email);
  checkValidity(firstpassword);
  validatePhone(phone);

  let phoneFormat = /^[\d\+][\d\(\)\ -]{4,14}\d$/;

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
    user.phone.match(phoneFormat)
  ) {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Регистрация прошла успешно!");
    modalcontainer.style.display = "none";
    buttonAddPost.style.display = "block";
    buttonModalOpen.style.display = "none";
  }
};

function generateError(text) {
  let error = document.createElement("div");
  error.setAttribute("class", "errorMessage");
  error.innerHTML = text;
  return error;
}

function checkValidity(firstpassword) {
  if (firstpassword.value !== "") {
    let firstpasswordFormat =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-#!$@%^&*_+~=:;?\/])[-\w#!$@%^&*+~=:;?\/]{8,}$/;
    if (firstpassword.value.match(firstpasswordFormat)) {
      firstpassword.style.border = "green solid 1px";
      return true;
    } else {
      let error = generateError(
        "Пароль должен содержать от 8 до 20 символов, минимум одну цифру, буквы в верхем и нижнем регистре и символы"
      );
      firstpassword.after(error);
      firstpassword.style.border = "red solid 1px";
    }
  }
}

function validateDay(day) {
  if (day.value !== "") {
    if (day.value >= 1 && day.value <= 31) {
      day.style.border = "green solid 1px";
      return true;
    } else {
      let error = generateError("Такого числа в месяце не бывает");
      day.after(error);
      day.style.border = "red solid 1px";
    }
  }
}

function validateYear(year) {
  if (year.value !== "") {
    if (year.value >= 1923 && year.value <= 2023) {
      year.style.border = "green solid 1px";
      return true;
    } else {
      let error = generateError(
        "Год должен содежать только реальные цифры в формате 'xxxx'"
      );
      year.after(error);
      year.style.border = "red solid 1px";
    }
  }
}

function validateEmail(email) {
  if (email.value !== "") {
    let mailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    if (email.value.match(mailFormat)) {
      email.style.border = "green solid 1px";
      return true;
    } else {
      let error = generateError("Неверный формат адреса электронной почты");
      email.after(error);
      email.style.border = "red solid 1px";
    }
  }
}

function validatePhone(phone) {
  if (phone.value !== "") {
    let phoneFormat = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    if (phone.value.match(phoneFormat)) {
      phone.style.border = "green solid 1px";
      return true;
    } else {
      let error = generateError("Номер телефона указан неверно");
      phone.after(error);
      phone.style.border = "red solid 1px";
    }
  }
}

function modalClose() {
  modalcontainer.style.display = "none";
  buttonModalOpen.style.display = "block";
  enableScroll();
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
