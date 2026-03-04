let posts = [];

export function shouldFetch() {
  return !document.hidden;
}

export async function fetchData() {
  try {
    if (!shouldFetch()) {
      return;
    }
    const response = await fetch("http://127.0.0.1:8000/items/");
    posts = await response.json(); 
  } catch (error) {
    console.log("Error fetching items:", error);
  }
}

export async function addData(obj) {
  try {
    const response = await fetch("http://127.0.0.1:8000/items/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error(`Add failed with status ${response.status}`);
    }

    const data = await response.json();
    posts.push(data);
  } catch (error) {
    console.log("Error adding item:", error);
  }
}

export function getPosts() {
  return posts;
}

export async function deletePost(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/items/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Delete failed with status ${response.status}`);
    }

    posts = posts.filter((post) => post.id !== id);
  } catch (error) {
    console.log("Error deleting item:", error);
  }
}