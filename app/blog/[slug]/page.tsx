import { notFound, redirect } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, getAllPosts } from "@/lib/blog-server";
import BlogPostCard from "@/components/blog/blog-post-card";
import BlogPost from "@/components/blog/blog-post";

export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Fix: Make params async in generateMetadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Await params
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description || `Read ${post.title} by ${post.author?.name}`,
    authors: post.author ? [{ name: post.author.name }] : undefined,
    publishedTime: post.publishedAt,
    keywords: post.tags,
  };
}

// Fix: Update PageProps type
type PageProps = {
  params: Promise<{ slug: string }>; // Now a Promise
};

// Fix: Make component async and await params
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params; // Await params
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  // If a custom canonical slug is defined and differs from the route param, redirect to canonical
  if (post.slug !== slug) {
    redirect(`/blog/${post.slug}`);
  }

  const allPosts = getAllPosts();
  const similarPosts = allPosts
    .filter(
      (p: import("@/lib/blog").BlogPostMeta) =>
        p.slug !== post.slug &&
        Array.isArray(p.tags) &&
        Array.isArray(post.tags) &&
        p.tags.some((tag: string) => post.tags?.includes(tag))
    )
    .slice(0, 3);

  return (
    <>
      <BlogPost
        title={post.title}
        content={post.content}
        author={post.author}
        publishedAt={post.publishedAt}
        tags={post.tags}
        readTime={post.readTime}
        featured={post.featured}
      />

      {similarPosts.length > 0 && (
        <section className="mt-16 border-t pt-4 border-t-divider px-4 md:px-20">
          <h2 className="text-2xl font-bold mb-6">You might like :)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarPosts.map((similarPost) => (
              <div key={similarPost.slug}>
                <BlogPostCard post={similarPost} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
