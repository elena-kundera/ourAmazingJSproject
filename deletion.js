function showDeletionButton(postsEl, postId) {
  const deletion = document.createElement("img");
  deletion.setAttribute("class", "img-deletion");
  deletion.setAttribute("src", "assets/images/delete.png");
  deletion.onclick = function () {
    disableScroll();
    const postDetails = document.querySelector("#postDetails");
    postDetails.innerHTML = "";
    const close = document.createElement("div");
    close.onclick = function () {
      closePopUp(postDetails);
    };
    close.innerText = "x";
    close.classList.add("close-delete");

    const postDetailsBlock = document.createElement("div");
    postDetailsBlock.setAttribute("class", "postDetailsBlockDelete");
    const postDetailsContent = document.createElement("div");
    postDetailsContent.setAttribute("class", "postDetailsContent");
    const postDetailsHeader = document.createElement("h2");
    postDetailsHeader.setAttribute("class", "postDetailsHeader");
    postDetailsHeader.innerText = `Удалить пост?`;
    const cancelButton = document.createElement("button");
    cancelButton.innerText = "Отменить";
    cancelButton.classList.add("button_more");
    cancelButton.onclick = function () {
      closePopUp(postDetails);
    };
    const confirmButton = document.createElement("button");
    confirmButton.innerText = "Удалить";
    confirmButton.classList.add("button_deletion");
    confirmButton.onclick = function () {
      deletePostFromList(postId);
      closePopUp(postDetails);
      printListAfterDeletion();
    };
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttonsContainer");

    postDetails.appendChild(postDetailsBlock);
    postDetailsBlock.appendChild(postDetailsContent);
    postDetailsBlock.appendChild(buttonsContainer);
    buttonsContainer.appendChild(cancelButton);
    buttonsContainer.appendChild(confirmButton);
    postDetailsContent.appendChild(close);
    postDetailsContent.appendChild(postDetailsHeader);

    postDetails.style.display = "block";
  };

  postsEl.appendChild(deletion);
}

function closePopUp(postDetails) {
  postDetails.style.display = "none";
  enableScroll();
}

function deletePostFromList(postId) {
  let postsList = JSON.parse(localStorage.getItem("postList"));
  postsList.forEach((element) => {
    if (element.id == postId) {
      const postIndex = postsList.indexOf(element);
      postsList.splice(postIndex, 1);
      localStorage.setItem("postList", JSON.stringify(postsList));
      return;
    }
  });
}

function printListAfterDeletion() {
  const posts = JSON.parse(localStorage.getItem("postList"));
  clearPostList();
  // Выводим посты с пагинацией
  const currentPage = 1;
  const rows = 7;

  createPostContainerChilds();
  posts.sort().reverse();
  displayList(posts, rows, currentPage);
  displayPagination(posts, rows, currentPage);
}
