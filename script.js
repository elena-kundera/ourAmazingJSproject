const postDetails = document.querySelector("#postDetails");
const modalCommentsContainer = document.querySelector(
  ".modalCommentsContainer"
);
const buttonPublish = document.querySelector("#buttonPublish");
const commentinput = document.getElementById("commentinput");
const titleСomment = document.getElementById("titleСomment");
let obj = JSON.parse(localStorage.getItem("user"));
let today = new Date();
let newPosts = [];

class Comment2 {
  constructor(options) {
    this.userId = options.userId;
    this.id = options.id;
    this.title = options.title;
    this.body = options.body;
  }
}

function finalArray() {
  let getThatPost = localStorage.getItem("newPosts");
  if (getThatPost != null) {
    let getThatPostParsed = JSON.parse(getThatPost);
    return getThatPostParsed;
  }
}

async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
}

async function main() {
  const postsData = await getData();
  const gotThatPostParsed = finalArray();
  let allThePosts;

  let currentPage = 1;
  let rows = 7;

  if (gotThatPostParsed != null) {
    allThePosts = gotThatPostParsed.concat(postsData);
  } else {
    allThePosts = postsData;
  }

  localStorage.setItem("postList", JSON.stringify(allThePosts));
  displayList(allThePosts, rows, currentPage);
  displayPagination(allThePosts, rows, currentPage);
}

main();

// Рандомная дата
function getRandomDate() {
  let start = new Date();
  start.setDate(1);
  start.setMonth(8);
  start.setFullYear(2022);
  let startTime = start.getTime();

  let end = new Date();
  end.setDate(11);
  end.setMonth(1);
  end.setFullYear(2023);
  let endTime = end.getTime();

  let randomDate = new Date();
  let randomDateTime = startTime + Math.random() * (endTime - startTime);
  randomDate.setTime(randomDateTime);

  let rndDate = randomDate.getDate();
  let rndMonth = randomDate.getMonth() + 1;
  let rndYear = randomDate.getFullYear();

  return rndDate + " / " + rndMonth + " / " + rndYear;
}

function postDetailsClose() {
  postDetails.style.display = "none";
  enableScroll();
}

function closeCommentsContainer() {
  modalCommentsContainer.style.display = "none";
  enableScroll();
}

function modalCommentsContainerOpen() {
  modalCommentsContainer.style.display = "block";
  disableScroll();
}

buttonPublish.addEventListener("click", function showMessage() {
  modalCommentsContainer.style.display = "grid";
  enableScroll();

  let comment2 = new Comment2({
    body: commentinput.value,
    id: obj.firstname,
    title: titleСomment.value,
    userId: today.toLocaleDateString(),
  });

  //ввыводим ошибку
  let mistake = document.createElement("div");
  if (titleСomment.value === "" || commentinput.value === "") {
    if (document.getElementById("mistake").innerText === "") {
      let mistake = document.createElement("div");
      mistake.innerText = `Поле 'Тема поста' или  'Мой пост'не заполнен(ы)`;
      document.getElementById("mistake").setAttribute("class", "errorMessage");
      document.getElementById("mistake").appendChild(mistake);
    }
    return;
  }
  //

  const postsFromNewPosts = finalArray();

  if (postsFromNewPosts != null) {
    let allNewPosts = postsFromNewPosts.concat(comment2);
    localStorage.setItem("newPosts", JSON.stringify(allNewPosts));
  } else {
    newPosts.push(comment2);
    localStorage.setItem("newPosts", JSON.stringify(newPosts));
  }

  window.location.reload(); //обновление страницы
  commentinput.value = "";
  titleСomment.value = "";

  modalCommentsContainer.style.display = "none";
});
