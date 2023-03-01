function displayList(arrData, rowPerPage, page) {
  const postsEl = document.querySelector("#posts");
  postsEl.innerHTML = "";
  page--;

  const start = rowPerPage * page;
  const end = start + rowPerPage;
  const paginatedData = arrData.slice(start, end);

  paginatedData.forEach((el) => {
    const postEl = document.createElement("div");
    const postElBody = document.createElement("div");
    const postDate = document.createElement("div");
    const postUser = document.createElement("div");
    const more = document.createElement("button");
    const bottom = document.createElement("div");

    more.onclick = function () {
      disableScroll();
      const postDetails = document.querySelector("#postDetails");
      postDetails.innerHTML = "";
      const close = document.createElement("div");
      close.onclick = function () {
        postDetails.style.display = "none";
        enableScroll();
      };
      close.innerText = "x";
      close.classList.add("close");

      const postDetailsBlock = document.createElement("div");
      postDetailsBlock.setAttribute("class", "postDetailsBlock");
      const postDetailsContent = document.createElement("div");
      postDetailsContent.setAttribute("class", "postDetailsContent");
      const postDetailsHeader = document.createElement("h2");
      postDetailsHeader.setAttribute("class", "postDetailsHeader");
      postDetailsHeader.innerText = `Тема: ${el.title}\r\n`;
      const postDetailsBody = document.createElement("p");
      postDetailsBody.setAttribute("class", "postDetailsBody");
      postDetailsBody.innerText = `Пост: ${el.body}`;

      postDetails.appendChild(postDetailsBlock);
      postDetailsBlock.appendChild(postDetailsContent);
      postDetailsContent.appendChild(close);
      postDetailsContent.appendChild(postDetailsHeader);
      postDetailsContent.appendChild(postDetailsBody);

      postDetails.style.display = "block";
    };
    postEl.classList.add("post");
    postEl.innerText = `${el.title}\r\n`;
    postElBody.classList.add("post_body");
    postElBody.innerText = `${el.body}`;
    postDate.innerText = getRandomDate();
    postDate.classList.add("post_date");
    postUser.innerText = `${el.userId}`;
    postUser.classList.add("post_user");
    more.innerText = "Подробнее";
    more.classList.add("button_more");
    bottom.setAttribute("class", "bottom");

    postsEl.appendChild(postDate);
    postsEl.appendChild(postUser);
    postsEl.appendChild(postEl);
    postsEl.appendChild(postElBody);
    postsEl.appendChild(more);
    postElBody.appendChild(bottom);

    let userData = localStorage.getItem("user");
    if (userData != null) {
      let username = JSON.parse(userData).firstname;
      if (el.userId == username) {
        showDeletionButton(postsEl, el.id);
      } else {
        const deletionGap = document.createElement("div");
        postsEl.appendChild(deletionGap);
      }
    } else {
      const deletionGap = document.createElement("div");
      postsEl.appendChild(deletionGap);
    }
  });
}

function displayPagination(arrData, rowPerPage, currentPage) {
  const paginationEl = document.querySelector("#pagination");
  const pagesCount = Math.ceil(arrData.length / rowPerPage);
  const ulEl = document.createElement("ul");
  ulEl.classList.add("pagination__list");

  for (let i = 0; i < pagesCount; i++) {
    const liEl = displayPaginationBtn(i + 1, currentPage, arrData, rowPerPage);
    ulEl.appendChild(liEl);
  }
  paginationEl.appendChild(ulEl);

  if (pagesCount <= 1) {
    paginationEl.style.display = "none";
  }
}

function displayPaginationBtn(page, currentPage, postsData, rows) {
  const liEl = document.createElement("li");
  liEl.classList.add("pagination__item");
  liEl.innerText = page;

  if (currentPage == page) liEl.classList.add("pagination__item--active");

  liEl.addEventListener("click", () => {
    currentPage = page;
    displayList(postsData, rows, currentPage);

    let currentItemLi = document.querySelector("li.pagination__item--active");
    currentItemLi.classList.remove("pagination__item--active");

    liEl.classList.add("pagination__item--active");
  });

  return liEl;
}
