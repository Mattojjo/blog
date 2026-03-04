let posts = [];

export async function fetchData() {
  try {
    const response = await fetch("http://127.0.0.1:8000/items/");
    posts = await response.json(); 
  } catch (error) {
    console.log("Error fetching items:", error);
  }
}

export function getPosts() {
  return posts;
}
