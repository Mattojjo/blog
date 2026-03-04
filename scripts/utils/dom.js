const root = document.getElementById("root");

const postsContainer = document.createElement("div");

const topButtonContainer = document.createElement("div");
const addButton = document.createElement("button");
const deleteButton = document.createElement("button");

const bottomButtonContainer = document.createElement("div");
const previousButton = document.createElement("button");
const nextButton = document.createElement("button");


function init() {

  topButtonContainer.id = "topButtonContainer";
  topButtonContainer.className = "button-container";
  addButton.id = "addButton";
  deleteButton.id = "deleteButton";
  addButton.className = "postButtons";
  deleteButton.className = "postButtons";
  addButton.innerHTML = "Add Post";
  deleteButton.innerHTML = "Delete";

  postsContainer.id = "posts";

  bottomButtonContainer.className = "button-container";
  nextButton.id = "nextButton";
  previousButton.id = "preciousButton";
  nextButton.className = "postButtons";
  previousButton.className = "postButtons";
  nextButton.innerHTML = "Next";
  previousButton.innerHTML = "Previous";


  ////////// DOM Order //////////////
  root.appendChild(topButtonContainer);
  topButtonContainer.appendChild(addButton);
  topButtonContainer.appendChild(deleteButton);

  root.appendChild(postsContainer);


  root.appendChild(bottomButtonContainer);
  bottomButtonContainer.appendChild(previousButton);
  bottomButtonContainer.appendChild(nextButton);
}

init();

export { postsContainer, previousButton, nextButton };
