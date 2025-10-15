"use client";

import React from "react";
import ShinyText from "@/components/text/shinytext";
import { CircularProgress } from "@heroui/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 h-screen w-full z-50 flex items-center justify-center bg-background gap-4">
      <ShinyText text="Thinking..." disabled={false} speed={3} />
    </div>
  );
}
