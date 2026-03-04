let posts = [];

export async function fetchData() {
  try {
    const response = await fetch("http://127.0.0.1:8000/items/");
    posts = await response.json(); 
  } catch (error) {
    console.log("Error fetching items:", error);
  }
}

export function addData(obj) {
  fetch("http://127.0.0.1:8000/items/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => response.json())
    .then((data) => {
      posts.push(data);
    })
    .catch((error) => {
      console.log("Error adding item:", error);
    });
}

export function getPosts() {
  return posts;
}

export function deletePost(id) {
  fetch(`http://127.0.0.1:8000/items/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      posts = posts.filter((post) => post.id !== id);
    })
    .catch((error) => {
      console.log("Error deleting item:", error);
    });
}