const postDetails = document.querySelector("#postDetails");

async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
}

async function main() {
  let postsData = await getData();
  const currentUserPostList = JSON.parse(localStorage.getItem("postList"));
  if (currentUserPostList != null) {
    localStorage.setItem("postList", JSON.stringify(postsData));
  } else {
    postsData = currentUserPostList;
  }

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

let commentsBlock1 = localStorage.getItem("commentsBlock");
let commentsBlock2 = JSON.parse(commentsBlock1);
const newPosts = document.querySelector("#newPosts");

document.addEventListener("DOMContentLoaded", function (event) {
  const name = localStorage.getItem("user");
  obj = JSON.parse(name);
  let author = document.createElement("div");

  if (name != null) {
    author.innerText = `Автор: ${obj.firstname}`;
    document.getElementById("author").appendChild(author);
  }

  if (commentsBlock1 != null) {
    for (let i = 0; i < commentsBlock2.length; i++) {
      const newPostsBlock = document.createElement("div");
      newPostsBlock.setAttribute("class", "posts");
      newPosts.appendChild(newPostsBlock);

      const newPostsDate = document.createElement("div");
      newPostsBlock.appendChild(newPostsDate);

      const newPostsAuthor = document.createElement("div");
      newPostsBlock.appendChild(newPostsAuthor);

      const newPostsTitle = document.createElement("div");
      newPostsTitle.setAttribute("class", "post");
      newPostsBlock.appendChild(newPostsTitle);

      const newPostsText = document.createElement("div");
      newPostsText.setAttribute("class", "post_body");
      newPostsBlock.appendChild(newPostsText);

      const more = document.createElement("button");
      more.setAttribute("class", "button_more");
      more.innerText = "Подробнее";
      more.onclick = function () {
        postDetails.innerHTML = `<div class="postDetailsBlock"><div class="close" onclick="postDetailsClose()">x</div><h2 class="postDetailsHeader">Тема: ${commentsBlock2[i].title}</h2><p class="postDetailsBody">Пост: ${commentsBlock2[i].text}</p></div>`;
        postDetails.style.display = "block";
      };
      newPostsBlock.appendChild(more);

      newPostsDate.innerText = "Дата: " + commentsBlock2[i].date;
      newPostsAuthor.innerText = "Автор: " + commentsBlock2[i].author;
      newPostsTitle.innerText = "Тема: " + commentsBlock2[i].title;
      newPostsText.innerText = "Пост: " + commentsBlock2[i].text;
    }
  }
});

const btn = document.querySelector("#btn");
class Comment2 {
  constructor(options) {
    this.userId = options.userId;
    this.Id = options.Id;
    this.title = options.title;
    this.body = options.body;
  }
}

let commentsBlock = [];
//commentsBlock = commentsBlock2;

btn.addEventListener("click", function showMessage() {
  let commentinput = document.getElementById("commentinput").value;
  let titleСomment = document.getElementById("titleСomment").value;
  let today = new Date();

  let comment2 = new Comment2({
    userId: obj.firstname,
    Id: today.toLocaleDateString(),
    title: titleСomment,
    body: commentinput,
  });

  commentsBlock.push(comment2);
  localStorage.setItem("commentsBlock", JSON.stringify(commentsBlock));

  let result = document.createElement("div");
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

  newPostsDate.innerText = "Дата: " + comment2.Id;
  newPostsAuthor.innerText = "Автор: " + comment2.userId;
  newPostsTitle.innerText = "Тема: " + comment2.title;
  newPostsText.innerText = "Пост: " + comment2.body;

  newPosts.appendChild(result);

  document.getElementById("commentinput").value = "";
  document.getElementById("titleСomment").value = "";
});
