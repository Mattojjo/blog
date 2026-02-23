async function blogPosts() {
    const postsContainer = document.getElementById('posts');

        try {
            const response = await fetch('./posts.json');
            const data = await response.json();
            
            data.posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `<h2>${post.title}</h2><p>${post.description}</p>`;
                postsContainer.appendChild(postElement);
    });
        } catch (e) {
            console.log("Error", e);
        }
    }

window.onload = blogPosts;  
