"use client";

import React from "react";
import { Button } from "@heroui/button";

export default function BlogNavigation() {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center h-16 sm:h-20 md:h-24 z-50 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden bg-background/80 backdrop-blur-md border-b border-divider">
      <img
        src="/assets/logos/logo.png"
        alt="Logo"
        className="h-4 sm:h-5 w-auto object-contain"
        style={{ aspectRatio: "auto" }}
      />
      <div className="hidden md:flex items-center gap-2 flex-row">
        <Button variant="light" as="a" href="/">
          Home
        </Button>
        <Button variant="solid" color="primary" as="a" href="/blog">
          Blog
        </Button>
        <Button variant="light" as="a" href="/about">
          About
        </Button>
        <Button variant="light" as="a" href="/contact">
          Contact
        </Button>
      </div>
      {/* Mobile menu */}
      <div className="md:hidden flex items-center gap-2">
        <Button variant="light" size="sm" as="a" href="/">
          Home
        </Button>
      </div>
    </div>
  );
}
