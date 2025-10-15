"use client";

import React from "react";
import { BlogPostMeta } from "@/lib/blog";
import BlogNavigation from "./blog-navigation";
import BlogHeader from "./blog-header";
import FeaturedPostsSection from "./featured-posts-section";
import RegularPostsSection from "./regular-posts-section";
import EmptyState from "./empty-state";

interface BlogListProps {
  posts: BlogPostMeta[];
}

export default function BlogList({ posts }: BlogListProps) {
  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <BlogNavigation />

      {/* Main Content */}
      <div className="pt-16 sm:pt-20 md:pt-24 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <BlogHeader />
          <FeaturedPostsSection featuredPosts={featuredPosts} />
          <RegularPostsSection regularPosts={regularPosts} />
          {posts.length === 0 && <EmptyState />}
        </div>
      </div>
    </div>
  );
}
