# Round-D-Blog

A lightweight, pure HTML, CSS, and JavaScript blog application with pagination support.

## Features

- **No Dependencies** – Built entirely with vanilla HTML, CSS, and JavaScript
- **Responsive Design** – WIP: Mobile-friendly layout with smooth animations and gradients
- **Pagination** – Browse through a limited number of posts per page
- **Dynamic Content** – Posts loaded from JSON data file (to be moved to Python backend in the future)

## How It Works

The blog currently fetches post data from `posts.json` and displays 10 posts per page. Navigation buttons allow users to move between pages.

## File Structure

```
├── index.html              # Main HTML file
├── posts.json             # Blog posts data
├── styles/
│   └── index.css          # Styling (gradients, animations, responsive)
└── scripts/
    └── blogPosts.js       # Post loading and pagination logic
```

## Getting Started

1. Serve the `index.html` file in a web browser (e.g., by opening it directly or using a local server).
2. That's it!

**Note:** This is a pure client-side application with no build tools, frameworks, or external dependencies.
