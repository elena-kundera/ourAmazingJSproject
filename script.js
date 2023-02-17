async function getData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
  }
  
  async function main() {
    const postsData = await getData();
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
        postEl.classList.add("post");
        postEl.innerText = `${el.title}\r\n`;
        postElBody.classList.add("post_body");
        postElBody.innerText = `${el.body}`;
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
        ulEl.appendChild(liEl)
      }
      paginationEl.appendChild(ulEl)
    }
  
    function displayPaginationBtn(page) {
      const liEl = document.createElement("li");
      liEl.classList.add('pagination__item')
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
  
//const result = document.querySelector('.result');
////const authorname = document.querySelector('.author');
const btn = document.querySelector('.btn');
const comment = document.querySelector('.comment');
  
  
document.addEventListener("DOMContentLoaded" ,function(event){
      let name=localStorage.getItem('user');
      obj = JSON.parse(name);
      const author = document.createElement("div");
      if(name!=null){
          author.innerText =`Пользователь:${obj.firstname}`;
          //authorname.innerHTML = obj.firstname;
      }
      author.appendChild(author);
      comment.appendChild(comment);
      });
  
  btn.addEventListener('click',function showMessage(){})
   //class comment {
     // constructor(options) {
      //  this.Date= options.Date; 
       // this.author = options.author;
       // this.text=options.text
      //}}
    //let comment= new Comment({

   // });
  //result.innerHTML= obj.firstname+":"+comment.value
  localStorage.setItem()//obj.firstname+new Date(),comment.value
  