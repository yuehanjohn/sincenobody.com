"use client";

import React from "react";
import { BlogPostMeta } from "@/lib/blog";
import BlogPostCard from "./blog-post-card";

interface RegularPostsSectionProps {
  regularPosts: BlogPostMeta[];
}

export default function RegularPostsSection({ regularPosts }: RegularPostsSectionProps) {
  if (regularPosts.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-foreground">
        All Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {regularPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} isFeatured={false} />
        ))}
      </div>
    </section>
  );
}
