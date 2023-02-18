async function getData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
  }
  
  async function main() {

    const postsData = await getData();
    localStorage.setItem('postList', JSON.stringify(postsData));

    let currentPage = 1;
    let rows = 7;
  
    function displayList(arrData, rowPerPage, page) {
      const postsEl = document.querySelector('#posts');
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
        postEl.classList.add("post");
        postEl.innerText = "Тема:   " + `${el.title}\r\n`;
        postElBody.classList.add("post_body");
        postElBody.innerText = `${el.body}`;
        postDate.innerText = getRandomDate();
        postUser.innerText = `${el.id}`;
        postsEl.appendChild(postDate);
        postsEl.appendChild(postUser);
        postsEl.appendChild(postEl);
        postsEl.appendChild(postElBody);
      })
    }
  
    function displayPagination(arrData, rowPerPage) {
      const paginationEl = document.querySelector('#pagination');
      const pagesCount = Math.ceil(arrData.length / rowPerPage);
      const ulEl = document.createElement("ul");
      ulEl.classList.add('pagination__list');
  
      for (let i = 0; i < pagesCount; i++) {
        const liEl = displayPaginationBtn(i + 1);
        ulEl.appendChild(liEl);
      }
      paginationEl.appendChild(ulEl);
    }
  
    function displayPaginationBtn(page) {
      const liEl = document.createElement("li");
      liEl.classList.add('pagination__item');
      liEl.innerText = page
  
      if (currentPage == page) liEl.classList.add('pagination__item--active');
  
      liEl.addEventListener('click', () => {
        currentPage = page
        displayList(postsData, rows, currentPage)
  
        let currentItemLi = document.querySelector('li.pagination__item--active');
        currentItemLi.classList.remove('pagination__item--active');
  
        liEl.classList.add('pagination__item--active');
      })
  
      return liEl;
    }
  
    displayList(postsData, rows, currentPage);
    displayPagination(postsData, rows);
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


 