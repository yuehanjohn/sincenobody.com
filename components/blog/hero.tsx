"use client";

import React from "react";
import { BlogPostMeta } from "@/lib/blog";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";

type Props = {
  latest?: BlogPostMeta;
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function BlogHero({ latest }: Props) {
  return (
    <section
      role="banner"
      aria-label="Blog hero"
      className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pt-12 md:pt-16 lg:pt-20"
    >
      {/* Background aesthetics */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_30%_-20%,hsl(var(--nextui-primary-500)/0.15),transparent_60%),radial-gradient(1000px_circle_at_120%_120%,hsl(var(--nextui-secondary-500)/0.15),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(100%_100%_at_50%_0%,black,transparent)]" style={{ backgroundImage: "url('data:image/svg+xml;utf8, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\' viewBox=\'0 0 10 10\'%3E%3Cg fill=\'%23fff\' fill-opacity=\'0.6\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'.5\'/%3E%3C/g%3E%3C/svg%3E')" }} />
      </div>
      {/* Background aesthetics – cyberpunk neon */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        {/* Neon radial glows */}
        <div className="pointer-events-none absolute -top-28 -left-20 h-96 w-96 rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(255,0,128,0.25), transparent)" }} />
        <div className="pointer-events-none absolute -bottom-28 -right-20 h-[28rem] w-[28rem] rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(0,255,255,0.22), transparent)" }} />

        {/* Neon grid */}
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-screen"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(0,255,255,0.25) 0 1px, transparent 1px 40px), repeating-linear-gradient(0deg, rgba(255,0,128,0.25) 0 1px, transparent 1px 40px)",
            maskImage: "radial-gradient(100% 100% at 50% 0%, black, transparent)",
            WebkitMaskImage: "radial-gradient(100% 100% at 50% 0%, black, transparent)",
          }}
        />

        {/* Animated neon beams */}
        <motion.div
          initial={{ rotate: 5 }}
          animate={{ rotate: -5 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 10, ease: "easeInOut" }}
          className="absolute -inset-x-20 -top-32 h-64"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,255,255,0.12), rgba(255,0,128,0.12), transparent)",
            filter: "blur(10px)",
          }}
        />

        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(100%_100%_at_50%_0%,black,transparent)]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8, %3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\' viewBox=\\'0 0 10 10\\'%3E%3Cg fill=\\'%23fff\\' fill-opacity=\\'0.7\\'%3E%3Ccircle cx=\\'1\\' cy=\\'1\\' r=\\'.5\\'/%3E%3C/g%3E%3C/svg%3E')",
          }}
        />

        {/* Scanning light sweep */}
        <motion.div
          initial={{ x: "-20%", opacity: 0.0 }}
          animate={{ x: "120%", opacity: [0.0, 0.15, 0.0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", repeatDelay: 1.2 }}
          className="pointer-events-none absolute top-0 h-full w-1/3"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
            filter: "blur(12px)",
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-divider bg-content1/60 px-3 py-1 text-xs text-foreground-600 backdrop-blur"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            Insights & Stories
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-4 text-balance text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight relative"
            style={{
              textShadow:
                "0 0 18px rgba(255,0,128,0.25), 0 0 28px rgba(0,255,255,0.18)",
            }}
          >
            {/* Glitch layers (aria-hidden) */}
            <span aria-hidden className="pointer-events-none absolute inset-0 translate-x-[1px] translate-y-[-1px] mix-blend-screen text-fuchsia-400 opacity-40 select-none">
              Minimal design. Maximum clarity.
            </span>
            <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-[1px] translate-y-[1px] mix-blend-screen text-cyan-300 opacity-40 select-none">
              Minimal design. Maximum clarity.
            </span>
            <span className="relative">Minimal design. Maximum clarity.</span>
            <br />
            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]">
              Engineering the future, one post at a time.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-4 max-w-2xl text-lg text-foreground-600"
          >
            Fast, accessible, and delightful. Explore deep-dives, practical guides, and ideas that matter.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-6 flex items-center gap-3"
          >
            {latest ? (
              <Button
                as={Link}
                href={`/blog/${latest.slug}`}
                color="primary"
                size="md"
                aria-label={`Read latest post: ${latest.title}`}
                className="shadow-[0_0_24px_rgba(236,72,153,0.35)] ring-1 ring-fuchsia-400/50"
              >
                Read latest
              </Button>
            ) : null}
            <Button
              as={Link}
              href="#all-posts"
              variant="flat"
              size="md"
              className="bg-transparent ring-1 ring-cyan-300/50 text-cyan-300 hover:bg-cyan-300/10 shadow-[0_0_24px_rgba(34,211,238,0.25)]"
            >
              Browse all posts
            </Button>
          </motion.div>

          {latest && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-6 flex items-center gap-4 text-sm text-foreground-500"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{latest.author?.name || "Anonymous"}</span>
              </div>
              <time dateTime={latest.publishedAt}>{new Date(latest.publishedAt).toLocaleDateString()}</time>
              {latest.readTime && <span>• {latest.readTime}</span>}
            </motion.div>
          )}
        </div>

        {/* Visual */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl border border-fuchsia-500/30 bg-content1 shadow-xl"
            style={{ boxShadow: "0 0 40px rgba(236,72,153,0.18), 0 0 60px rgba(34,211,238,0.12)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-400/15 via-transparent to-cyan-300/15" />
            <img
              src={latest?.img || "/assets/images/dev.jpg"}
              alt={latest?.title || "Latest post"}
              className="w-full aspect-[16/10] object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent text-white">
              <p className="text-xs uppercase tracking-wide opacity-80">Latest</p>
              <h2 className="text-lg font-semibold line-clamp-2">{latest?.title || "Coming soon"}</h2>
            </div>
            {/* Animated border sheen */}
            <motion.div
              aria-hidden
              initial={{ x: "-20%", opacity: 0 }}
              animate={{ x: "120%", opacity: [0, 0.5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatDelay: 2 }}
              className="pointer-events-none absolute top-0 h-full w-1/5"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)", filter: "blur(8px)" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 hidden md:flex items-center gap-2 text-xs text-foreground-500"
        aria-hidden
      >
        <div className="h-[1px] w-12 bg-foreground/20" />
        Scroll
      </motion.div>
    </section>
  );
}
