import { getPosts, addData, deletePost } from "./api.js";

let start = 0;
const end = 10;
const postsContainer = document.getElementById("posts");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const addButton = document.getElementById("addButton");
const deleteButton = document.getElementById("deleteButton");
const postModal = document.getElementById("postModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

const testPost = {title: "sdhsdju", description:"ghjghgh"}
const testDelete = 5;

function getPostTitle(post) {
  return post.title ?? post.name ?? "Untitled";
}

function openModal(post) {
  if (!postModal || !modalTitle || !modalDescription) {
    return;
  }
  modalTitle.textContent = getPostTitle(post);
  modalDescription.textContent = post.description ?? "No description";
  postModal.classList.remove("hidden");
  postModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  if (!postModal) {
    return;
  }
  postModal.classList.add("hidden");
  postModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function renderPosts(arg) {
  const posts = getPosts();
  if (arg === "previous") {
    start = Math.max(0, start - end);
  } else if (arg === "next") {
    if (start + end < posts.length) {
      start += end;
    }
  }
  
  const currentArray = posts.slice(start, start + end);
  postsContainer.innerHTML = currentArray.map((post, index) => 
    `<div class="post" data-post-index="${start + index}"><h2>${getPostTitle(post)}</h2><p>${post.description ?? ""}</p></div>`
  ).join("");
  
  nextButton.disabled = start + end >= posts.length;
  previousButton.disabled = start <= 0;
}

export function load10(arg) {
  renderPosts(arg);
}

nextButton.addEventListener("click", () => renderPosts("next"));
previousButton.addEventListener("click", () => renderPosts("previous"));
postsContainer.addEventListener("click", (event) => {
  const postElement = event.target.closest(".post");
  if (!postElement) {
    return;
  }

  const postIndex = Number(postElement.dataset.postIndex);
  const post = getPosts()[postIndex];
  if (post) {
    openModal(post);
  }
});

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (postModal) {
  postModal.addEventListener("click", (event) => {
    if (event.target === postModal) {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

if (addButton) {
  addButton.addEventListener("click", () => {
    addData(testPost);
    renderPosts();
  });
}

if (deleteButton) {
  deleteButton.addEventListener("click", () => {
    deletePost(testDelete);
    renderPosts();
  });
}

