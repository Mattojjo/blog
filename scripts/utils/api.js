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
    console.log("Error fetching items, Check the backend server", error);
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
    alert("Failed to add post. Please ensure the backend server is running.");
    console.log("Failed to add post. Please ensure the backend server is running."
      , "Error adding item:", error);
  }
}

export function getPosts() {
  return posts;
}

export async function updatePost(id, updatedData) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Update failed with status ${response.status}`);
    }

    const data = await response.json();
    const index = posts.findIndex((post) => post.id === id);
    if (index !== -1) {
      posts[index] = data;
    }
  } catch (error) {
    alert("Failed to update post. Please ensure the backend server is running.");
    console.log("Failed to update post. Please ensure the backend server is running."
      , "Error updating item:", error);
  }
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
    alert("Failed to delete post. Please ensure the backend server is running.");
    console.log("Failed to delete post. Please ensure the backend server is running."
      , "Error deleting item:", error);
  }
}