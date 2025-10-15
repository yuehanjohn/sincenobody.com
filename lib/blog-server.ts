import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPostMeta, BlogPostData } from "./blog";

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPostMeta[] {
  // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const fallbackSlug = fileName.replace(/\.(md|mdx)$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      // Prefer custom frontmatter slug if provided, else fallback to filename
      const slug: string = (typeof data.slug === "string" && data.slug.trim()) || fallbackSlug;

      // Use file creation time as deterministic fallback for publishedAt
      let publishedAt = data.publishedAt;
      if (!publishedAt) {
        const stats = fs.statSync(fullPath);
        publishedAt = stats.birthtime.toISOString();
      }
      return {
        slug,
        title: data.title || "Untitled",
        publishedAt,
        author: data.author || {
          name: "Yuehan John",
          avatar: "/assets/profile.png",
        },
        tags: data.tags || [],
        readTime: data.readTime || "5 min",
        featured: data.featured || false,
        description: data.description || "",
        img: data.img || undefined,
        tldr: data.tldr || undefined,
      } as BlogPostMeta;
    })
    .sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  return allPostsData;
}

export function getPostBySlug(slug: string): BlogPostData | null {
  try {
    // First attempt: direct filename match (backward compatible)
    const mdPath = path.join(postsDirectory, `${slug}.md`);
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
    let filePath: string | null = null;

    if (fs.existsSync(mdPath)) {
      filePath = mdPath;
    } else if (fs.existsSync(mdxPath)) {
      filePath = mdxPath;
    } else {
      // Fallback: search for a file whose frontmatter slug matches
      if (!fs.existsSync(postsDirectory)) return null;
      const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
      for (const fname of fileNames) {
        const fpath = path.join(postsDirectory, fname);
        const raw = fs.readFileSync(fpath, "utf8");
        const { data } = matter(raw);
        if (typeof data.slug === "string" && data.slug.trim() === slug) {
          filePath = fpath;
          break;
        }
      }
      if (!filePath) {
        return null;
      }
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const effectiveSlug: string = (typeof data.slug === "string" && data.slug.trim()) || slug;

    return {
      slug: effectiveSlug,
      title: data.title || "Untitled",
      publishedAt: data.publishedAt || new Date().toISOString(),
      author: data.author || {
        name: "Anonymous",
        avatar: "/assets/profile.png",
      },
      tags: data.tags || [],
      readTime: data.readTime || "5 min",
      featured: data.featured || false,
      description: data.description || "",
      img: data.img || undefined,
      tldr: data.tldr || undefined,
      content,
    } as BlogPostData;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const slugs: string[] = [];
  const seen = new Set<string>();
  for (const fileName of fileNames) {
    if (!(fileName.endsWith(".md") || fileName.endsWith(".mdx"))) continue;
    const fullPath = path.join(postsDirectory, fileName);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);
    const fallbackSlug = fileName.replace(/\.(md|mdx)$/, "");
    const customSlug: string | null = (typeof data.slug === "string" && data.slug.trim()) || null;

    // Always include the canonical/custom slug if present
    const pushSlug = (s: string) => {
      if (!seen.has(s)) {
        slugs.push(s);
        seen.add(s);
      }
    };

    if (customSlug) {
      pushSlug(customSlug);
      // Also include the filename-based slug for backward compatibility
      if (fallbackSlug !== customSlug) {
        pushSlug(fallbackSlug);
      }
    } else {
      pushSlug(fallbackSlug);
    }
  }
  return slugs;
}
