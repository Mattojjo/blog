import { getPosts } from "./api.js";
import { postsContainer, previousButton, nextButton } from "./dom.js";

let start = 0;
const end = 10;
let currentArray = [];

function arraySlice(arg) {
  const posts = getPosts();
  if (arg === "previous") {
    start = Math.max(0, start - end);
  } else if (arg === "next") {
    if (start + end < posts.length) {
      start += end;
    }
  }
  return (currentArray = posts.slice(start, start + end));
}

export function load10(arg) {
  arraySlice(arg);
  currentArray.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `<h2>${post.title}</h2><p>${post.description}</p>`;
    postsContainer.appendChild(postElement);
  });
}

function nextPosts() {
  const posts = getPosts();
  if (Array.isArray(posts) && posts.length) {
    postsContainer.innerHTML = "";
    load10("next");

    nextButton.disabled = start >= posts.length;
    previousButton.disabled = start <= 0;
  }
}

function previousPosts() {
  const posts = getPosts();
  if (Array.isArray(posts) && posts.length) {
    postsContainer.innerHTML = "";
    load10("previous");

    nextButton.disabled = start >= posts.length;
    previousButton.disabled = start <= 0;
  }
}

nextButton.addEventListener("click", nextPosts);
previousButton.addEventListener("click", previousPosts);

export { nextPosts, previousPosts };
