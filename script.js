const postDetails = document.querySelector("#postDetails");
const modalCommentsContainer = document.querySelector(
  ".modalCommentsContainer"
);
const buttonPublish = document.querySelector("#buttonPublish");
const commentinput = document.getElementById("commentinput");
const titleСomment = document.getElementById("titleСomment");
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

document.addEventListener("DOMContentLoaded", function (event) {
  const name = localStorage.getItem("user");
  obj = JSON.parse(name);
  let author = document.createElement("div");

  if (name != null) {
    author.innerText = `${obj.firstname}`;
    document.getElementById("author").appendChild(author);
  }
});

function postDetailsClose() {
  postDetails.style.display = "none";
}

function closeCommentsContainer() {
  modalCommentsContainer.style.display = "none";
}

function modalCommentsContainerOpen() {
  modalCommentsContainer.style.display = "block";
}

buttonPublish.addEventListener("click", function showMessage() {
  modalCommentsContainer.style.display = "grid";

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
      document.getElementById("mistake").setAttribute("class", "mistakeShow");
      document.getElementById("mistake").appendChild(mistake);
    }
    return;
  }
  //

  newPosts.push(comment2);
  localStorage.setItem("newPosts", JSON.stringify(newPosts));

  //Пока оставила прежний вывод из общего ключа postList (вдруг придется вернуться) - потом удалить!

  // let posts = JSON.parse(localStorage.getItem("postList"));
  // posts.push(comment2);
  // localStorage.setItem("postList", JSON.stringify(posts));

  // Очищаем таблицу
  // clearPostList();

  // Выводим список
  // const currentPage = 1;
  // const rows = 7;
  // createPostContainerChilds();
  // displayList(posts, rows, currentPage);
  // displayPagination(posts, rows, currentPage);

  commentinput.value = "";
  titleСomment.value = "";

  modalCommentsContainer.style.display = "none";
});
