function searchPosts(){
    clearPostList();

    const searchText = document.querySelector(".header-search__input").value;
    let resultPostList = [];

    postList.forEach(post => {
        if (post.title.toLowerCase().includes(searchText)){
        resultPostList.push(post);
    }
    else if (post.body.toLowerCase().includes(searchText)){
        resultPostList.push(post);
    }
    });

    printSearchResult(resultPostList);

}

function printSearchResult(posts){
    if (posts.length > 0){
        // Здесь нужно выводить посты с пагинацией
    }
    else{
        /*let container = document.querySelector("#posts");
        let resultText = document.createElement("p");
        resultText.innerHTML = "Посты не найдены";
        container.appendChild(resultText);*/
        alert("Посты не найдены");
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