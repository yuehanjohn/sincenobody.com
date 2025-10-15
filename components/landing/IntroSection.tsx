import React from "react";
import { Cover } from "@/components/effects/cover";

const IntroSection = () => (
  <section className="flex w-full min-h-screen bg-background relative z-10 justify-center items-center px-8 md:px-16 overflow-x-hidden">
    <div className="flex flex-col justify-center items-center w-full h-full gap-4 ">
      <p className="text-4xl l text-balance" style={{ lineHeight: 1.5 }}>
        <span className="text-base mr-16">I'm John</span>A resourceful, creative, and <Cover>lightning-fast</Cover> adaptive AI developer.
      </p>
    </div>
  </section>
);
export default IntroSection;
