"use client";

import React from "react";
import { BlogPostMeta } from "@/lib/blog";
import BlogPostCard from "./blog-post-card";

interface FeaturedPostsSectionProps {
  featuredPosts: BlogPostMeta[];
}

export default function FeaturedPostsSection({ featuredPosts }: FeaturedPostsSectionProps) {
  if (featuredPosts.length === 0) return null;

  return (
    <section className="mb-12 sm:mb-14 md:mb-16">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-foreground">
        Featured Posts
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {featuredPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} isFeatured={true} />
        ))}
      </div>
    </section>
  );
}
