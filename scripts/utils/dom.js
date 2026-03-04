const root = document.getElementById("root");

const postsContainer = document.createElement("div");
const previousButton = document.createElement("button");
const nextButton = document.createElement("button");
const buttonContainer = document.createElement("div");

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

export { postsContainer, previousButton, nextButton };
