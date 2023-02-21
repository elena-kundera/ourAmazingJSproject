const postDetails = document.querySelector("#postDetails");

async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
}

async function main() {
  // Если список не отображается, закомментируйте этот код:
  /*let postsData = await getData();
  const currentUserPosts = JSON.parse(localStorage.getItem("postList"));
  if (currentUserPosts != null){
    postsData = currentUserPosts;
  }
  else{
    localStorage.setItem("postList", JSON.stringify(postsData));
  }*/
  // и раскомментируйте этот:
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
}

const newPosts = document.querySelector("#newPosts");

document.addEventListener("DOMContentLoaded", function (event) {
  const name = localStorage.getItem("user");
  obj = JSON.parse(name);
  let author = document.createElement("div");

  if (name != null) {
    author.innerText = `Автор: ${obj.firstname}`;
    document.getElementById("author").appendChild(author);
  }

  //Выводит блок с новым сообщением, но main тоже выводит свой блок

  // let posts = JSON.parse(localStorage.getItem("postList"));
  // const currentPage = 1;
  // const rows = 7;
  // displayList(posts, rows, currentPage);
  // displayPagination(posts, rows, currentPage);
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

btn.addEventListener("click", function showMessage() {
  let commentinput = document.getElementById("commentinput").value;
  let titleСomment = document.getElementById("titleСomment").value;
  let today = new Date();

  let comment2 = new Comment2({
    body: commentinput,
    id: today.toLocaleDateString(),
    title: titleСomment,
    userId: obj.firstname,
  });

  /*let result = document.createElement("div");
  result.setAttribute("class", "posts");
  document.getElementById("result").appendChild(result);

  const newPostsDate = document.createElement("div");
  result.appendChild(newPostsDate);

  const newPostsAuthor = document.createElement("div");
  result.appendChild(newPostsAuthor);

  const newPostsTitle = document.createElement("div");
  newPostsTitle.setAttribute("class", "post");
  result.appendChild(newPostsTitle);

  const newPostsText = document.createElement("div");
  newPostsText.setAttribute("class", "post_body");
  result.appendChild(newPostsText);

  const more = document.createElement("button");
  more.setAttribute("class", "button_more");
  more.innerText = "Подробнее";
  more.onclick = function () {
    postDetails.innerHTML = `<div class="postDetailsBlock"><div class="close" onclick="postDetailsClose()">x</div><h2 class="postDetailsHeader">Тема: ${comment2.title}</h2><p class="postDetailsBody">Пост: ${comment2.body}</p></div>`;
    postDetails.style.display = "block";
  };
  result.appendChild(more);

  newPostsDate.innerText = "Дата: " + comment2.id;
  newPostsAuthor.innerText = "Автор: " + comment2.userId;
  newPostsTitle.innerText = "Тема: " + comment2.title;
  newPostsText.innerText = "Пост: " + comment2.body;

  newPosts.appendChild(result);

  document.getElementById("commentinput").value = "";
  document.getElementById("titleСomment").value = "";*/

  let posts = JSON.parse(localStorage.getItem("postList"));
  posts.push(comment2);
  localStorage.setItem("postList", JSON.stringify(posts));
  
  // Очищаем таблицу
  clearPostList();

  // Задаем текущую страницу и количество строк
  const currentPage = 1;
  const rows = 7;
  
  // Выводим список 
  displayList(posts, rows, currentPage);
  displayPagination(posts, rows, currentPage);

});
