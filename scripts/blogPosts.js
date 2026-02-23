function blogPosts() {
    const postsContainer = document.getElementById('posts');

    const posts = [
        { title: 'First Post', content: 'This is the first post on my blog!' },
        { title: 'Second Post', content: 'This is the second post on my blog!' },
        { title: 'Third Post', content: 'This is the third post on my blog!' }
    ];
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.class = 'post';
        postElement.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
        postsContainer.appendChild(postElement);
    });
}

window.onload = blogPosts;  
