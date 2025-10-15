"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@heroui/button";

export function TopBar({ count }: { count: number }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-background/70 backdrop-blur-md border-b border-divider">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/logos/icon.png" alt="Site icon" className="h-6 w-6" />
          <strong className="text-sm">Blog</strong>
          <span aria-live="polite" className="text-foreground-500 text-xs">{count} posts</span>
        </div>
        <nav className="hidden md:flex items-center gap-4" aria-label="Primary">
          <Link href="/" className="text-sm text-foreground-600 hover:text-foreground">Home</Link>
          <Link href="/blog" className="text-sm text-foreground-600 hover:text-foreground">Blog</Link>
          <Link href="/about" className="text-sm text-foreground-600 hover:text-foreground">About</Link>
          <ThemeSwitch />
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <ThemeSwitch />
          <Button
            size="sm"
            variant="light"
            aria-label="Toggle menu"
            aria-expanded={open}
            onPress={() => setOpen((v) => !v)}
          >
            ☰
          </Button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-divider bg-background/95">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-2" role="menu" aria-label="Mobile menu">
            <Link role="menuitem" href="/" className="py-2">Home</Link>
            <Link role="menuitem" href="/blog" className="py-2">Blog</Link>
            <Link role="menuitem" href="/about" className="py-2">About</Link>
          </div>
        </div>
      )}
    </header>
  );
}
