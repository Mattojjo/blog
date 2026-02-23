async function blogPosts() {
    let posts = [];

    const postsContainer = document.getElementById('posts');
    const nextButton = document.getElementById('nextButton');
    let start = 0;
    let end = start += 10;

    try {
        const response = await fetch('./posts.json');
        const data = await response.json();
        posts = Array.isArray(data.posts) ? data.posts : data;
        load10(posts)

    } catch (error) {
        console.log("Error", error);
    }

    function load10(posts) {
        const initialArray = posts.slice(start, start += end);
        initialArray.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `<h2>${post.title}</h2><p>${post.description}</p>`
            postsContainer.appendChild(postElement);
        })
    };

    function nextPosts(start, end) {
        let newEnd = end += 10;
        console.log(start, newEnd)
        const nextArray = posts.slice(start, start += newEnd)

        console.log(nextArray);

    }
 
  nextPosts()
}

window.onload = blogPosts;  
