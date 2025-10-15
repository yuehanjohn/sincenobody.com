"use client";

import React from "react";
import { Cover } from "../effects/cover";

export default function BlogHeader() {
  return (
    <header className="w-full px-4 md:px-16 justify-center items-center my-16 sm:my-20 md:my-24 lg:my-28 flex flex-col">
      <div className="flex flex-col justify-center items-center w-full h-full gap-4">
        <p
          className="text-balance w-fit max-w-screen-lg"
          style={{
            lineHeight: 1.5,
            fontSize: "clamp(1.5rem, 4vw, 3rem)", // Responsive font size
          }}
        >
          <span
            className="flex-none font-bebas m-0 p-0 mr-2"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1,
              verticalAlign: "middle",
              fontFeatureSettings: "liga",
              maxWidth: "100%",
              // maxHeight: "calc(1em + 60px)",
              display: "inline-block",
              position: "relative",
              fontSize: "clamp(2.5rem, 10vw, 6rem)", // Responsive font size for heading

              // Add a fade effect using a linear-gradient mask
            }}
          >
            Blog{" "}
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: "80%",
                transform: "translate(-50%, -50%) rotate(-10deg)",
                width: "100%",
                height: "40%",
                background:
                  "linear-gradient(180deg, background 0%, transparent 100%)",
                zIndex: 2,
                pointerEvents: "none",
                opacity: 1, // Controls overall fade strength
                filter: "blur(2px)", // Controls softness of the fade
                WebkitMaskImage: `
              linear-gradient(180deg, background 0%, transparent 100%),
              linear-gradient(to right, transparent 0%, background 20%, background 80%, transparent 100%)
            `,
                maskImage: `
              linear-gradient(180deg, background 0%, transparent 100%),
              linear-gradient(to right, transparent 0%, background 20%, background 80%, transparent 100%)
            `,
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />
          </span>{" "}
          <span
            className="flex-none font-bebas m-0 p-0"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1,
              verticalAlign: "middle",
              fontFeatureSettings: "liga",
              maxWidth: "100%",
              // maxHeight: "calc(1em + 60px)",
              display: "inline-block",
              position: "relative",
              fontSize: "clamp(2.5rem, 10vw, 6rem)", // Responsive font size for heading

              // Add a fade effect using a linear-gradient mask
            }}
          >
            by{" "}
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: "80%",
                transform: "translate(-50%, -50%) rotate(-10deg)",
                width: "100%",
                height: "40%",
                background:
                  "linear-gradient(180deg, background 0%, transparent 100%)",
                zIndex: 2,
                pointerEvents: "none",
                opacity: 1, // Controls overall fade strength
                filter: "blur(2px)", // Controls softness of the fade
                WebkitMaskImage: `
              linear-gradient(180deg, background 0%, transparent 100%),
              linear-gradient(to right, transparent 0%, background 20%, background 80%, transparent 100%)
            `,
                maskImage: `
              linear-gradient(180deg, background 0%, transparent 100%),
              linear-gradient(to right, transparent 0%, background 20%, background 80%, transparent 100%)
            `,
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />
          </span>
          <span className="text-base mx-4 sm:mx-8 md:mx-16">Yuehan John</span>A
          resourceful, creative, and <Cover>lightning-fast</Cover> adaptive AI
          developer.
        </p>
      </div>
    </header>
  );
}
