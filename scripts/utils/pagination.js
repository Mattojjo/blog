import { getPosts, addData, deletePost } from "./api.js";

let start = 0;
const end = 10;
const postCache = new Map();
const postsContainer = document.getElementById("posts");
const paginationContainer = document.getElementById("paginationContainer");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const addButton = document.getElementById("addButton");
const postModal = document.getElementById("postModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalDeleteButton = document.getElementById("modalDeleteButton");

const addModal = document.getElementById("addModal");
const addModalClose = document.getElementById("addModalClose");
const addModalCancel = document.getElementById("addModalCancel");
const addModalSave = document.getElementById("addModalSave");
const postTitleInput = document.getElementById("postTitleInput");
const postDescriptionInput = document.getElementById("postDescriptionInput");

let selectedPostId = null;
let lastFocusedElement = null;

function getPostTitle(post) {
  return post.title ?? post.name ?? "Untitled";
}

function openModal(post) {
  if (!postModal || !modalTitle || !modalDescription) {
    return;
  }
  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  selectedPostId = post.id ?? null;
  modalTitle.textContent = getPostTitle(post);
  modalDescription.textContent = post.description ?? "No description";
  if (modalDeleteButton) {
    modalDeleteButton.disabled = selectedPostId == null;
  }
  postModal.classList.remove("hidden");
  postModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  if (modalDeleteButton && !modalDeleteButton.disabled) {
    modalDeleteButton.focus();
  } else if (modalClose) {
    modalClose.focus();
  }
}

function closeModal() {
  if (!postModal) {
    return;
  }
  const activeElement = document.activeElement;
  if (activeElement instanceof HTMLElement && postModal.contains(activeElement)) {
    activeElement.blur();
  }
  selectedPostId = null;
  postModal.classList.add("hidden");
  postModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement && lastFocusedElement.isConnected) {
    setTimeout(() => lastFocusedElement.focus(), 150);
  }
  lastFocusedElement = null;
}

function openAddModal() {
  if (!addModal) {
    return;
  }
  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  postTitleInput.value = "";
  postDescriptionInput.value = "";
  addModal.classList.remove("hidden");
  addModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  postTitleInput.focus();
}

function closeAddModal() {
  if (!addModal) {
    return;
  }
  const activeElement = document.activeElement;
  if (activeElement instanceof HTMLElement && addModal.contains(activeElement)) {
    activeElement.blur();
  }
  addModal.classList.add("hidden");
  addModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement && lastFocusedElement.isConnected) {
    setTimeout(() => lastFocusedElement.focus(), 150);
  }
  lastFocusedElement = null;
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
  
  requestAnimationFrame(() => {
    postsContainer.innerHTML = currentArray.map((post, index) => {
      const cacheKey = `${post.id}`;
      if (!postCache.has(cacheKey)) {
        postCache.set(cacheKey, 
          `<div class="post" data-post-index="${start + index}"><h2>${getPostTitle(post)}</h2><p>${post.description ?? ""}</p></div>`
        );
      }
      return postCache.get(cacheKey);
    }).join("");

    if (paginationContainer) {
      paginationContainer.classList.remove("is-hidden");
    }
    
    nextButton.disabled = start + end >= posts.length;
    previousButton.disabled = start <= 0;
  });
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
    const postModalHidden = postModal?.classList.contains("hidden");
    const addModalHidden = addModal?.classList.contains("hidden");
    
    if (!postModalHidden) {
      closeModal();
    } else if (!addModalHidden) {
      closeAddModal();
    }
  }
});

if (addButton) {
  addButton.addEventListener("click", openAddModal);
}

if (addModalClose) {
  addModalClose.addEventListener("click", closeAddModal);
}

if (addModalCancel) {
  addModalCancel.addEventListener("click", closeAddModal);
}

if (addModal) {
  addModal.addEventListener("click", (event) => {
    if (event.target === addModal) {
      closeAddModal();
    }
  });
}

if (addModalSave) {
  addModalSave.addEventListener("click", async () => {
    const title = postTitleInput.value.trim();
    const description = postDescriptionInput.value.trim();

    if (!title) {
      alert("Please enter a title");
      return;
    }

    const newPost = { title, description };
    await addData(newPost);
    closeAddModal();
    renderPosts();
  });
}

if (modalDeleteButton) {
  modalDeleteButton.addEventListener("click", async () => {
    if (selectedPostId == null) {
      return;
    }

    await deletePost(selectedPostId);
    closeModal();

    const posts = getPosts();
    if (start >= posts.length && start > 0) {
      start = Math.max(0, start - end);
    }

    renderPosts();
  });
}

