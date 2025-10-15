# Blog System Documentation

## Overview
This Next.js application now includes a fully functional blog system that can render markdown blog posts with rich formatting, syntax highlighting, and responsive design.

## Features

### ✅ Markdown Support
- Full markdown parsing with `react-markdown`
- GitHub Flavored Markdown (GFM) support
- Syntax highlighting for code blocks
- Custom styled components for all markdown elements

### ✅ Blog Post Features
- **Frontmatter Support**: YAML frontmatter for post metadata
- **Author Information**: Author name, avatar, and bio
- **Tags and Categories**: Categorize posts with tags
- **Reading Time**: Automatic or manual reading time estimates
- **Featured Posts**: Highlight important posts
- **Publication Dates**: Proper date formatting and sorting

### ✅ UI Components
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Card Layout**: Beautiful card-based post listings
- **Typography**: Custom typography using Bebas Neue and Nunito fonts
- **Dark Mode Ready**: Supports NextUI's dark mode
- **Image Optimization**: Next.js Image component integration

## File Structure

```
├── app/
│   ├── blog/
│   │   ├── page.tsx              # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx          # Individual blog post page
│   └── test/
│       └── page.tsx              # Demo page showing blog functionality
├── components/
│   └── blog/
│       ├── blog-post.tsx         # Individual blog post component
│       └── blog-list.tsx         # Blog listing component
├── content/
│   └── blog/                     # Markdown blog posts
│       ├── getting-started-with-nextjs.md
│       ├── future-of-ai-development.md
│       └── building-responsive-uis-tailwind.md
├── lib/
│   └── blog.ts                   # Blog utilities and functions
└── styles/
    └── globals.css               # Global styles including blog prose styles
```

## Adding New Blog Posts

### 1. Create a Markdown File
Create a new `.md` or `.mdx` file in the `content/blog/` directory:

```markdown
---
title: "Your Blog Post Title"
publishedAt: "2024-01-15"
author:
  name: "Author Name"
  avatar: "/path/to/avatar.jpg"
  bio: "Author bio"
tags: ["tag1", "tag2", "tag3"]
readTime: "5 min"
featured: true
description: "Brief description of the post"
---

# Your Blog Post Content

Start writing your blog post content here using markdown syntax.

## Headings
Use standard markdown headings.

### Code Examples
```javascript
const example = "This will be syntax highlighted";
```

### Images
![Alt text](/path/to/image.jpg)

### Lists
- Item 1
- Item 2
- Item 3

> This is a blockquote that will be styled nicely.
```

### 2. Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title |
| `publishedAt` | string | Yes | Publication date (YYYY-MM-DD) |
| `author.name` | string | No | Author name |
| `author.avatar` | string | No | Path to author avatar |
| `author.bio` | string | No | Author bio |
| `tags` | array | No | Array of tag strings |
| `readTime` | string | No | Reading time estimate |
| `featured` | boolean | No | Whether post is featured |
| `description` | string | No | Post description for previews |
| `slug` | string | No | Custom URL slug (default is filename). If provided, the post will be served at `/blog/<slug>`. Old filename-based URLs will redirect to the canonical slug. |

## Accessing Blog Posts

### Routes
- `/blog` - Blog listing page showing all posts
- `/blog/[slug]` - Individual blog post page
- `/test` - Demo page showing blog functionality

### Programmatic Access
```typescript
import { getAllPosts, getPostBySlug } from '@/lib/blog';

// Get all posts
const posts = getAllPosts();

// Get specific post
const post = getPostBySlug('post-slug');
```

## Customization

### Styling
- Modify `components/blog/blog-post.tsx` for individual post styling
- Modify `components/blog/blog-list.tsx` for listing page styling
- Update `styles/globals.css` for prose styles

### Components
The blog system uses custom React components for rendering markdown:
- Custom headings with Bebas Neue font
- Styled code blocks with syntax highlighting
- Responsive images with Next.js Image component
- Custom blockquotes and lists
- Styled links with hover effects

### Markdown Plugins
Current plugins:
- `remark-gfm`: GitHub Flavored Markdown
- `rehype-highlight`: Syntax highlighting
- `rehype-raw`: Raw HTML support

## Dependencies

```json
{
  "react-markdown": "^9.0.1",
  "remark-gfm": "^4.0.0",
  "rehype-highlight": "^7.0.0",
  "rehype-raw": "^7.0.0",
  "gray-matter": "^4.0.3"
}
```

## Future Enhancements

Potential improvements:
- [ ] Search functionality
- [ ] Tag filtering
- [ ] RSS feed generation
- [ ] Comment system
- [ ] Related posts
- [ ] Table of contents
- [ ] Social sharing
- [ ] Blog post analytics

## Example Blog Post Usage

Visit `/blog` to see the blog listing page with sample posts, or go to `/test` to see the blog functionality in action.

Sample posts include:
- Getting Started with Next.js and React
- The Future of AI Development  
- Building Responsive UIs with Tailwind CSS

Each post demonstrates different markdown features and styling options.
