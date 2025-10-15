// Type definitions for blog posts
export interface BlogPostMeta {
  title: string;
  publishedAt: string;
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  tags?: string[];
  readTime?: string;
  featured?: boolean;
  description?: string;
  tldr?: string;
  slug: string;
  img?: string;
}

export interface BlogPostData extends BlogPostMeta {
  content: string;
}

// Function to calculate reading time (client-side safe)
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min`;
}
