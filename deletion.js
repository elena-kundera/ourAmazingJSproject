function showDeletionButton(postsEl) {
  const deletion = document.createElement("button");
  deletion.innerText = "Удалить";
  deletion.onclick = function () {
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
    postDetailsHeader.innerText = `Удалить пост?`;
    const cancelButton = document.createElement("button");
    cancelButton.innerText = "Отменить";
    cancelButton.classList.add("button_more");
    cancelButton.onclick = function () {
      postDetails.style.display = "none";
      enableScroll();
    };
    const confirmButton = document.createElement("button");
    confirmButton.innerText = "Удалить";
    confirmButton.classList.add("button_deletion");
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
  deletion.classList.add("button_deletion");
  postsEl.appendChild(deletion);
}
