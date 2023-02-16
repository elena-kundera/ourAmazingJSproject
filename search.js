function searchPosts(){
    clearPostList();

    const searchText = document.querySelector(".header-search__input").value;

    // В идеале здесь обрщаться к локальной переменной, в которой хранятся посты, полученные с сервера, + посты, созданные пользователем
    let posts = JSON.parse(postsJSON);
    let resultPostList = [];

    posts.forEach(post => {
        if (post.title.toLowerCase().includes(searchText)){
        resultPostList.push(post);
    }
    else if (post.body.toLowerCase().includes(searchText)){
        resultPostList.push(post);
    }
    });

}

function printSearchResult(posts){
    if (posts.lenght > 0){
        // Здесь нужно выводить посты с пагинацией
    }
    else{
        let container = document.querySelector("#posts");
        let resultText = document.createElement("p");
        resultText.innerHTML = "Посты не найдены";
        container.appendChild(resultText);
    }
}

function clearPostList()
{
    let postsContainer = document.querySelector("#postsContainer");
    postsContainer.innerHTML = '';
}

function cancelSearch(){
    // Здесь нужно выводить посты с пагинацией
}

document.querySelector(".header-search__button").addEventListener("click", searchPosts);
document.querySelector(".header-search__cancel").addEventListener("click", cancelSearch);

let postsJSON = `[{
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
},{
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
},{
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    },{
    "userId": 1,
    "id": 4,
    "title": "eum et est occaecati",
    "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
},{
    "userId": 1,
    "id": 5,
    "title": "nesciunt quas odio",
    "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
    }]`;