"use client";
import React, { useState, useEffect } from "react";
import ShinyText from "@/components/text/shinytext";

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function TestPage() {
  return (
    <>
      <div>
        <section className="section h-screen w-full relative flex">
          <div className="items-center justify-center m-auto text-center">
            <h1 className="text-foreground">
              Since Nobody is doing it, so we did
            </h1>
            <h1 className="text-foreground/50">
              <ShinyText
                text="A community of doers, not dreamers."
                disabled={false}
                speed={3}
              />
            </h1>
          </div>
        </section>
      </div>
    </>
  );
}
