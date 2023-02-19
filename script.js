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
