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
        clearPostList();
        // Выводим посты с пагинацией
        const currentPage = 1;
        const rows = 7;
        
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
    let postsContainer = document.querySelector('.posts');
    postsContainer.innerHTML = '';

    let pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    let placeholder = document.querySelector('.container-posts-placeholder');
    if (placeholder != null){
        let postsContainer = document.querySelector('.container-posts');
        postsContainer.removeChild(placeholder);
    }
}

function cancelSearch(){
    // Очищаем поле поиска
    const searchField = document.querySelector('.header-search__input');
    searchField.value = '';

    // Убираем старый результат
    clearPostList();

    // Показываем все посты
    const posts = JSON.parse(localStorage.getItem('postList'));
    const currentPage = 1;
    const rows = 7;
        
    displayList(posts, rows, currentPage);
    displayPagination(posts, rows, currentPage);
}

document.querySelector('.header-search__button').addEventListener('click', searchPosts);
document.querySelector('.header-search__cancel').addEventListener('click', cancelSearch);


