function searchPosts(){
    const searchField = document.querySelector('.header-search__input');
    let searchText = searchField.value;
    searchText = searchText.trim();

    if (searchText != ''){
        clearPostList();
        let resultPostList = [];
        
        const posts = JSON.parse(localStorage.getItem('postList'));
        posts.forEach(post => {
            if (post.title.toLowerCase().includes(searchText)){
                resultPostList.push(post);
            }
            else if (post.body.toLowerCase().includes(searchText)){
                resultPostList.push(post);
            }
        });
        
        printSearchResult(resultPostList);
    }

    else{
        searchField.value = '';
    }
}

function printSearchResult(posts){
    if (posts.length > 0){
        // Здесь нужно выводить посты с пагинацией
        const posts = JSON.localStorage.getItem('postList');
        let currentPage = 1;
        let rows = 7;
        
        displayList(posts, rows, currentPage);
        displayPagination(posts, rows, currentPage);
    }
    else{
        // Если совпадений нет, показываем плейсхолдер
        clearPostList();
        let placeholder = document.createElement('div');
        placeholder.classList.add('container-posts-placeholder')
        placeholder.innerHTML = 'Посты не найдены';
        let postsContainer = document.querySelector('.container-posts');
        postsContainer.appendChild(placeholder);
    }
}

function clearPostList()
{
    let postsContainer = document.querySelector('.container-posts');
    postsContainer.innerHTML = '';
}

function cancelSearch(){
    // Здесь нужно выводить посты с пагинацией
}

document.querySelector('.header-search__button').addEventListener('click', searchPosts);
document.querySelector('.header-search__cancel').addEventListener('click', cancelSearch);



//displayList(postsData, rows, currentPage);
  //  displayPagination(postsData, rows, currentPage);