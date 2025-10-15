import BlogPostCard from "@/components/blog/blog-post-card";
import { getAllPosts } from "@/lib/blog-server";
import { BlogIndexClient } from "@/components/blog/blog-index-client";
import BlogHeader from "@/components/blog/blog-header";
import { TopBar } from "@/components/blog/topbar";
import SplashCursor from "@/components/effects/splashcursor";

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPosts = posts.filter((p) => p.featured).slice(0, 3);

  return (
    <main className="w-full" >
      
      <BlogHeader />

      {/* Featured Blogs Section */}
      {featuredPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-bold mb-8">Featured Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <div key={post.slug}>
                <BlogPostCard post={post} isFeatured />
              </div>
            ))}
          </div>
        </section>
      )}

      <main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-10">
        {posts.length === 0 ? (
          <p className="py-24 text-center text-foreground-600">
            No posts yet. Check back soon.
          </p>
        ) : (
          <BlogIndexClient posts={posts} pageSize={6} />
        )}
      </main>
    </main>
  );
}
