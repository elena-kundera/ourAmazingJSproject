const postDetails = document.querySelector("#postDetails");
const modalCommentsContainer = document.querySelector(".modalCommentsContainer");

async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
}

async function main() {
  const postsData = await getData();
  localStorage.setItem("postList", JSON.stringify(postsData));

  let currentPage = 1;
  let rows = 7;

  displayList(postsData, rows, currentPage);
  displayPagination(postsData, rows, currentPage);
}

main();

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

document.addEventListener("DOMContentLoaded", function (event) {
  const name = localStorage.getItem("user");
  obj = JSON.parse(name);
  let author = document.createElement("div");
});

const btn = document.querySelector("#btn");
class Comment2 {
  constructor(options) {
    this.userId = options.userId;
    this.id = options.id;
    this.title = options.title;
    this.body = options.body;
  }
}

function modalCommentsContainerOpen ( ) {
  modalCommentsContainer.style.display = "block";  
  disableScroll();
}

btn.addEventListener("click", function showMessage() {
  modalCommentsContainer.style.display = "grid";
  disableScroll();
  let commentinput = document.getElementById("commentinput").value;
  let titleСomment = document.getElementById("titleСomment").value;
  let today = new Date();

  let comment2 = new Comment2({
    body: commentinput,
    id: obj.firstname,
    title: titleСomment,
    userId: today.toLocaleDateString(),
  });

  let posts = JSON.parse(localStorage.getItem("postList"));
  posts.push(comment2);
  localStorage.setItem("postList", JSON.stringify(posts));

  // Очищаем таблицу
  clearPostList();

  // Очищаем поле поиска
  clearSearchInput();

  // Задаем текущую страницу и количество строк
  const currentPage = 1;
  const rows = 7;

  // Выводим список
  createPostContainerChilds();
  displayList(posts, rows, currentPage);
  displayPagination(posts, rows, currentPage);

  document.getElementById("commentinput").value = "";
  document.getElementById("titleСomment").value = "";

  modalCommentsContainer.style.display = "none";  
  enableScroll();
});

