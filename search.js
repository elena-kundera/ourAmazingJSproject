function searchPosts(){
    showCancelIcon();
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
        cancelSearch();
    }
}

function showCancelIcon(){
    const canselIcon = document.querySelector('.header-search__cancel');
    const magnifierIcon = document.querySelector('.header-search__magnifier');

    canselIcon.classList.remove('hidden-icon');
    magnifierIcon.classList.add('hidden-icon');
}

function showMagnifierIcon(){
    const canselIcon = document.querySelector('.header-search__cancel');
    const magnifierIcon = document.querySelector('.header-search__magnifier');

    magnifierIcon.classList.remove('hidden-icon');
    canselIcon.classList.add('hidden-icon');
}

function printSearchResult(posts){
    if (posts.length > 0){
        clearPostList();
        // Выводим посты с пагинацией
        const currentPage = 1;
        const rows = 7;
        
        createPostContainerChilds();  
        displayList(posts, rows, currentPage);
        displayPagination(posts, rows, currentPage);
    }
    else{
        // Если совпадений нет, показываем плейсхолдер
        clearPostList();
        const placeholder = document.createElement('div');
        placeholder.classList.add('container-posts-placeholder')
        placeholder.innerHTML = 'Посты не найдены';
        const postsContainer = document.querySelector('.container-posts');
        postsContainer.appendChild(placeholder);
    }
}

function clearPostList()
{
    const postContainer = document.querySelector('.container-posts');

    const posts = document.querySelector('.posts');
    if (posts != null){
        postContainer.removeChild(posts);
    }

    const pagination = document.querySelector('.pagination');
    if (pagination != null){
        postContainer.removeChild(pagination);
    }

    const placeholder = document.querySelector('.container-posts-placeholder');
    if (placeholder != null){
        postContainer.removeChild(placeholder);
    }
}

function createPostContainerChilds(){
    const postContainer = document.querySelector('.container-posts');
    createContainerElement(postContainer, 'posts');
    createContainerElement(postContainer, 'pagination');

}

function createContainerElement(container, childName){
    const child = document.createElement('div');
    child.classList.add(childName);
    child.setAttribute('id', childName);
    container.appendChild(child);
}

function cancelSearch(){
    // Очищаем поле поиска
    clearSearchInput();

    // Убираем старый результат
    clearPostList();

    // Показываем все посты
    const posts = JSON.parse(localStorage.getItem('postList'));
    const currentPage = 1;
    const rows = 7;

    createPostContainerChilds();    
    displayList(posts, rows, currentPage);
    displayPagination(posts, rows, currentPage);
}

function clearSearchInput(){
    const searchField = document.querySelector('.header-search__input');
    if (searchField != null){
        searchField.value = '';
        showMagnifierIcon();
    }
}


document.querySelector('.header-search__cancel').addEventListener('click', cancelSearch);

const searchInput = document.querySelector('.header-search__input');
searchInput.addEventListener('change', searchPosts);
searchInput.addEventListener('keyup', searchPosts);


