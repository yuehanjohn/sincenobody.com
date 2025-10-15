"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { Card, CardBody, Chip, User } from "@heroui/react";
import { Button } from "@heroui/button";
import Image from "next/image";
import { TracingBeam } from "@/components/effects/tracing-beam";
import { FaShare } from "react-icons/fa";

// Import highlight.js CSS for syntax highlighting
import "highlight.js/styles/github-dark.css";

interface BlogPostProps {
  title: string;
  content: string;
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  publishedAt: string;
  tags?: string[];
  readTime?: string;
  featured?: boolean;
}

export default function BlogPost({
  title,
  content,
  author,
  publishedAt,
  tags = [],
  readTime,
  featured = false,
}: BlogPostProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Extract headings from markdown content
  const [sections, setSections] = useState<{ id: string; text: string }[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const innerSidebarRef = useRef<HTMLDivElement>(null);
  // Sidebar scrolls to center the highlighted button
  useEffect(() => {
    if (!activeSection || !sidebarRef.current) return;
    const sidebar = sidebarRef.current;
    const btn = sidebar.querySelector<HTMLButtonElement>(
      `button[data-id='${activeSection}']`
    );
    if (!btn) return;
    const target =
      btn.offsetTop + btn.offsetHeight / 2 - sidebar.clientHeight / 2;
    // Custom smooth scroll
    const duration = 400; // ms
    const start = sidebar.scrollTop;
    const change = target - start;
    let startTime: number | null = null;
    function animateScroll(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease in-out
      const ease = 0.5 - Math.cos(Math.PI * progress) / 2;
      sidebar.scrollTop = start + change * ease;
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }
    requestAnimationFrame(animateScroll);
  }, [activeSection, sections]);

  // Removed unused bottomOffset logic

  useEffect(() => {
    // Parse only h2 headings from markdown for main sections
    const regex = /^##\s+(.*)$/gm;
    const found: { id: string; text: string }[] = [];
    let match;
    while ((match = regex.exec(content))) {
      const text = match[1].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      found.push({ id, text });
    }
    setSections(found);
  }, [content]);

  // Robust active section tracking: IntersectionObserver + fallback to scroll position
  useEffect(() => {
    if (sections.length === 0) return;
    let lastVisible = "";
    const visibleIds = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          if (entry.isIntersecting) visibleIds.add(id);
          else visibleIds.delete(id);
        }
        // Pick the last visible section in document order
        lastVisible =
          [...sections.map((s) => s.id)]
            .filter((id) => visibleIds.has(id))
            .pop() || "";
        if (lastVisible) setActiveSection(lastVisible);
      },
      {
        root: null,
        rootMargin: "-40% 0px -60% 0px",
        threshold: 0.1,
      }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    // Fallback: if no section is visible, use scroll position
    const onScroll = () => {
      if (lastVisible) return;
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight / 2) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  // Scroll to section on click
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TracingBeam>
        <div className="flex flex-row pt-16 sm:pt-20 md:pt-24 px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8 sm:mb-10 md:mb-12 pt-6 sm:pt-8 md:pt-12">
              {featured && (
                <Chip
                  color="primary"
                  variant="flat"
                  className="mb-3 sm:mb-4"
                  size="sm"
                >
                  Featured
                </Chip>
              )}

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-5 md:mb-6 text-foreground">
                {title}
              </h1>

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base text-foreground-600">
                <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
                {readTime && (
                  <>
                    <span>•</span>
                    <span>{readTime} read</span>
                  </>
                )}
              </div>

              {/* Author */}
              {author && (
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-7 md:mb-8">
                  <User
                    name={author.name}
                    description={author.bio || "Author"}
                    avatarProps={{
                      src: author.avatar || "/assets/profile.png",
                      size: "md",
                    }}
                    classNames={{
                      name: "text-sm sm:text-base",
                      description: "text-xs sm:text-sm",
                    }}
                  />
                </div>
              )}
            </header>

            {/* Blog Content (centered) */}
            <div className="flex-1">
              <Card className="mb-8 sm:mb-10 md:mb-12">
                <CardBody className="p-4 sm:p-6 md:p-8 lg:p-12">
                  <article className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight, rehypeRaw]}
                      components={{
                        img: ({ src, alt, ...props }) => (
                          <div className="my-6 sm:my-8">
                            <Image
                              src={src || ""}
                              alt={alt || "Blog image"}
                              width={800}
                              height={400}
                              className="rounded-lg shadow-md w-full h-auto"
                            />
                            {alt && (
                              <p className="text-center text-xs sm:text-sm text-foreground-600 mt-2 italic">
                                {alt}
                              </p>
                            )}
                          </div>
                        ),
                        h1: ({ children }) => (
                          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-8 sm:mt-10 md:mt-12 mb-4 sm:mb-5 md:mb-6 text-foreground">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => {
                          // Generate id for section navigation
                          const text =
                            typeof children === "string"
                              ? children
                              : React.Children.toArray(children).join("");
                          const id = text
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-");
                          return (
                            <h2
                              id={id}
                              className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 sm:mt-8 md:mt-10 mb-3 sm:mb-4 text-foreground scroll-mt-32"
                            >
                              {children}
                            </h2>
                          );
                        },
                        h3: ({ children }) => {
                          const text =
                            typeof children === "string"
                              ? children
                              : React.Children.toArray(children).join("");
                          const id = text
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-");
                          return (
                            <h3
                              id={id}
                              className="text-base sm:text-lg md:text-xl font-medium mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-3 text-foreground scroll-mt-32"
                            >
                              {children}
                            </h3>
                          );
                        },
                        p: ({ children }) => (
                          <p className="mb-4 sm:mb-5 md:mb-6 leading-relaxed text-sm sm:text-base text-foreground-800">
                            {children}
                          </p>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-primary pl-4 sm:pl-6 py-2 my-4 sm:my-6 bg-content2 rounded-r-lg">
                            <div className="text-sm sm:text-base text-foreground-700 italic">
                              {children}
                            </div>
                          </blockquote>
                        ),
                        pre: ({ children }) => (
                          <div className="my-4 sm:my-6 overflow-x-auto">
                            <pre className="bg-content1 rounded-lg p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm">
                              {children}
                            </pre>
                          </div>
                        ),
                        code: ({ children, className }) => {
                          const isInline = !className;
                          if (isInline) {
                            return (
                              <code className="bg-content2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-mono text-primary">
                                {children}
                              </code>
                            );
                          }
                          return <code className={className}>{children}</code>;
                        },
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside mb-4 sm:mb-5 md:mb-6 space-y-1 sm:space-y-2 text-sm sm:text-base text-foreground-800">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside mb-4 sm:mb-5 md:mb-6 space-y-1 sm:space-y-2 text-sm sm:text-base text-foreground-800">
                            {children}
                          </ol>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            className="text-primary hover:text-primary-600 underline underline-offset-2 break-words"
                            target={
                              href?.startsWith("http") ? "_blank" : undefined
                            }
                            rel={
                              href?.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {content}
                    </ReactMarkdown>
                  </article>
                </CardBody>
              </Card>
            </div>

            {/* Footer Navigation */}
            <div className="flex flex-row justify-between w-full items-start">
              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-7 md:mb-8 mt-1">
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      variant="flat"
                      size="lg"
                      className="text-xs sm:text-sm"
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>
              )}
              <Button
                variant="light"
                color="primary"
                startContent={<FaShare />}
              >
                Share
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 sm:py-8 border-t border-divider">
              <Button
                variant="light"
                as="a"
                href="/blog"
                className="w-full sm:w-auto"
              >
                ← Back to Blog
              </Button>
              <Button
                variant="light"
                as="a"
                href="/"
                className="w-full sm:w-auto"
              >
                Home
              </Button>
            </div>
          </div>
          {/* Animated Section List Sidebar (Desktop only) */}
          <div
            ref={sidebarRef}
            className="hidden lg:block sticky left-auto right-8 top-1/2 -translate-y-1/2 min-w-[220px] max-w-[260px] overflow-y-auto h-[60vh] scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="relative rounded-xl shadow-lg p-4 animate-fade-in">
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      data-id={section.id}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded transition-colors duration-200 cursor-pointer text-sm font-medium",
                        activeSection === section.id
                          ? "text-foreground"
                          : "text-foreground/30 hover:text-foreground"
                      )}
                      onClick={() => scrollToSection(section.id)}
                    >
                      {section.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </TracingBeam>
    </div>
  );
}
