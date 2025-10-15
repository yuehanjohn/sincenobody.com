"use client";

import React, { useEffect, useMemo, useState } from "react";
import { BlogPostMeta } from "@/lib/blog";
import BlogPostCard from "@/components/blog/blog-post-card";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { FaSearch } from "react-icons/fa";

// ...existing imports...

interface DropdownSelectProps {
  label: string;
  options: { label: string; key: string }[];
  selected: string | null;
  onChange: (key: string) => void;
}

export function DropdownSelect({
  label,
  options,
  selected,
  onChange,
}: DropdownSelectProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-fit">
      <Button
        type="button"
        className="w-fit px-3 py-2 rounded-xl bg-content1 dark:bg-content2 backdrop-blur-md text-left text-sm shadow-lg transition-all duration-200"
        onPress={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="ml-2 font-semibold">
          {options.find((o) => o.key === selected)?.label ?? "Select"}
        </span>
        <span className="float-right opacity-60">▼</span>
      </Button>
      <motion.div className="absolute left-0 right-0 z-50">
        <motion.div className="relative">
          <motion.div style={{ position: "absolute", width: "100%" }}>
            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-2 w-full rounded-xl bg-black/60 dark:bg-zinc-900/80 backdrop-blur-lg border border-zinc-700 shadow-xl py-1"
                  style={{ zIndex: 50 }}
                >
                  {options.map((opt) => (
                    <li
                      key={opt.key}
                      className={`px-3 py-2 cursor-pointer text-sm text-white hover:bg-primary/20 transition-all ${selected === opt.key ? "bg-primary/30" : ""}`}
                      onClick={() => {
                        onChange(opt.key);
                        setOpen(false);
                      }}
                      role="option"
                      aria-selected={selected === opt.key}
                    >
                      {opt.label}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";

type Props = {
  posts: BlogPostMeta[];
  pageSize?: number;
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function BlogIndexClient({ posts, pageSize = 6 }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc"); // 'desc' or 'asc'
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  // Collect all unique tags from posts
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((p) => (p.tags || []).forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [posts]);

  // filter by title, description, tags, and tagFilter
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = posts;
    if (q) {
      result = result.filter((p) => {
        const hay = [
          p.title,
          p.description,
          p.tldr,
          p.author?.name,
          ...(p.tags || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    }
    if (tagFilter) {
      result = result.filter((p) => p.tags?.includes(tagFilter));
    }
    // Sort by publishedAt
    result = result.slice().sort((a, b) => {
      const aDate = new Date(a.publishedAt || 0).getTime();
      const bDate = new Date(b.publishedAt || 0).getTime();
      return sortOrder === "desc" ? bDate - aDate : aDate - bDate;
    });
    return result;
  }, [posts, query, tagFilter, sortOrder]);

  useEffect(() => {
    setPage(1);
  }, [query, tagFilter, sortOrder]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  const onPrev = () => setPage((p) => Math.max(1, p - 1));
  const onNext = () => setPage((p) => Math.min(totalPages, p + 1));

  // Sort options
  const sortOptions = [
    {
      label: "Newest First",
      key: "desc",
      description: "Sort by latest published",
    },
    {
      label: "Oldest First",
      key: "asc",
      description: "Sort by earliest published",
    },
  ];

  return (
    <section aria-labelledby="all-posts" className="mt-10">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 justify-between mb-6">
        <h2 id="all-posts" className="text-xl md:text-2xl font-semibold">
          All Blogs
        </h2>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto h-fit">
          <Input
            aria-label="Search blog posts"
            placeholder="Search posts..."
            value={query}
            variant="flat"
            onValueChange={setQuery}
            endContent={
              <Button
                variant="light"
                isIconOnly
                onPress={() => setQuery(query)}
                aria-label="Search"
              >
                <FaSearch />
              </Button>
            }
            onKeyDown={(e) => {
              if (
                e.key === "/" &&
                (e.target as HTMLElement).tagName !== "INPUT"
              ) {
                e.preventDefault();
              }
            }}
            className="max-w-xs"
          />
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" className="inline-flex w-auto px-10">
                {sortOptions.find((o) => o.key === sortOrder)?.label ??
                  "Sort by"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Sort Options"
              disallowEmptySelection={false}
              selectionMode="single"
              selectedKeys={[sortOrder]}
              onSelectionChange={(keys) =>
                setSortOrder(Array.from(keys)[0] as string)
              }
            >
              {sortOptions.map((opt) => (
                <DropdownItem key={opt.key}>{opt.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" className="inline-flex w-auto px-10">
                {tagFilter ?? "Tag"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Tag Filter"
              disallowEmptySelection={false}
              selectionMode="single"
              selectedKeys={tagFilter ? [tagFilter] : []}
              onSelectionChange={(keys) =>
                setTagFilter(Array.from(keys)[0] as string)
              }
            >
              {allTags.map((tag) => (
                <DropdownItem key={tag}>{tag}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {total === 0 ? (
        <div role="status" className="py-16 text-center text-foreground-600">
          No posts match your search.
        </div>
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="show"
            variants={container}
          >
            {visible.map((post) => (

                <BlogPostCard key={post.slug} post={post} isFeatured={post.featured} />
            ))}
          </motion.div>
          <nav
            aria-label="Pagination"
            className="flex items-center justify-between gap-4 mt-8"
          >
            <div className="text-sm text-foreground-500">
              Showing {start + 1}-{Math.min(start + pageSize, total)} of {total}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="flat"
                onPress={onPrev}
                isDisabled={page === 1}
                aria-label="Previous page"
              >
                Prev
              </Button>
              <div aria-live="polite" className="text-sm">
                Page {page} of {totalPages}
              </div>
              <Button
                size="sm"
                variant="flat"
                color="primary"
                onPress={onNext}
                isDisabled={page === totalPages}
                aria-label="Next page"
              >
                Next
              </Button>
            </div>
          </nav>
        </>
      )}
    </section>
  );
}

export function CommentsSection() {
  const [comments, setComments] = useState<
    Array<{ id: number; name: string; text: string }>
  >([{ id: 1, name: "Alex", text: "Love the clean design!" }]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setComments((prev) => [
      { id: Date.now(), name: name.trim(), text: text.trim() },
      ...prev,
    ]);
    setName("");
    setText("");
  };

  return (
    <section
      aria-labelledby="comments"
      className="mt-16 border-t border-divider pt-10"
    >
      <h3 id="comments" className="text-lg md:text-xl font-semibold mb-4">
        Comments (mock)
      </h3>
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 max-w-2xl">
        <Input
          aria-label="Your name"
          placeholder="Your name"
          value={name}
          onValueChange={setName}
        />
        <textarea
          aria-label="Your comment"
          placeholder="Your comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-24 rounded-medium border border-divider bg-content1 px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
        />
        <div>
          <Button type="submit" color="primary">
            Post comment
          </Button>
        </div>
      </form>
      <ul className="mt-6 space-y-4">
        {comments.map((c) => (
          <li
            key={c.id}
            className="p-4 rounded-large bg-content1 border border-divider"
          >
            <p className="font-medium">{c.name}</p>
            <p className="text-foreground-600">{c.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
