"use client";

import React from "react";
import { Button } from "@heroui/button";

export default function EmptyState() {
  return (
    <div className="text-center py-12 sm:py-16 px-4">
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">
        No blog posts yet
      </h3>
      <p className="text-sm sm:text-base text-foreground-600 mb-6 sm:mb-8">
        Check back soon for new content!
      </p>
      <Button as="a" href="/" variant="solid" color="primary" className="w-full sm:w-auto">
        Go Home
      </Button>
    </div>
  );
}
