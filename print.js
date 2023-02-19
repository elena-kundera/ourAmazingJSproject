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
        postEl.classList.add("post");
        postEl.innerText = `${el.title}\r\n`;
        postElBody.classList.add("post_body");
        postElBody.innerText = `${el.body}`;
        postsEl.appendChild(postEl);
        postsEl.appendChild(postElBody);
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



