let postsContainer = document.createElement("div");
let previousButton = document.createElement("button");
let nextButton = document.createElement("button");
let buttonContainer = document.createElement("div");
let posts = [];
let currentArray = [];

const root = document.getElementById("root");
let start = 0;
const end = 10;

function init() {
  postsContainer.id = "posts";
  nextButton.id = "nextButton";
  previousButton.id = "preciousButton";
  nextButton.className = "postButtons";
  nextButton.innerHTML = "Next";
  previousButton.className = "postButtons";
  previousButton.innerHTML = "Previous";
  buttonContainer.className = "button-container";

  root.appendChild(postsContainer);
  buttonContainer.appendChild(previousButton);
  buttonContainer.appendChild(nextButton);
  root.appendChild(buttonContainer);
}

init();

async function fetchData() {
  try {
    const response = await fetch("./posts.json");
    const data = await response.json();
    posts = data.posts;
  } catch (error) {
    console.log("Error", error);
  }
}

function arraySlice(arg) {
  if (arg === "previous") {
    start = Math.max(0, start - end);
  } else if (arg === "next") {
    if (start + end < posts.length) {
      start += end;
    }
  }
  return (currentArray = posts.slice(start, start + end));
}

function load10(arg) {
  arraySlice(arg);
  currentArray.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `<h2>${post.title}</h2><p>${post.description}</p>`;
    postsContainer.appendChild(postElement);
  });
}

function nextPosts() {
  let next = "next";
  if (Array.isArray(posts) && posts.length) {
    postsContainer.innerHTML = "";
    load10(next);

    nextButton.disabled = start >= posts.length;
    previousButton.disabled = start <= 0;
  }
}

function previousPosts() {
  let previous = "previous";
  if (Array.isArray(posts) && posts.length) {
    postsContainer.innerHTML = "";
    load10(previous);

    nextButton.disabled = start >= posts.length;
    previousButton.disabled = start <= 0;
  }
}

nextButton.addEventListener("click", nextPosts);
previousButton.addEventListener("click", previousPosts);

window.onload = async () => {
  await fetchData();
  load10();
};
