const postDetails = document.querySelector("#postDetails");

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
}
document.addEventListener("DOMContentLoaded" ,function(event){
  let name=localStorage.getItem('user');
  obj = JSON.parse(name)
  let author = document.createElement("div");
  if(name!=null){
      author.innerText =`Пользователь:${obj.firstname}`;
      document.getElementById("author").appendChild(author);
  }
  });
const btn = document.querySelector('.btn');
class Comment2 {
 constructor(options) {
 this.date= options.date; 
 this.author = options.author;
 this.text=options.text
}
LSitem(){
  localStorage.setItem(this.author+this.date,this.text)
}
}
btn.addEventListener('click',function showMessage(){
let commentinput=document.getElementById("commentinput").value;
let today= new Date;
let comment2= new Comment2({
  author:obj.firstname,
  date: today.toLocaleDateString(),
  text:commentinput
});
comment2.LSitem()
let result = document.createElement("div");
let varr=comment2.author+comment2.date
let fullcomment=localStorage.getItem(varr);
result.innerText =`Пользователь:${comment2.author}
                   Дата:${comment2.date}
                   ${fullcomment}`;
document.getElementById("result").appendChild(result);
document.querySelector("#posts").appendChild(result)
})