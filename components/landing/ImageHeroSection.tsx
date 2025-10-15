import React from "react";
import { ImageHero, Work } from "@/components/imageparallax/imagehero";

const ImageHeroSection = () => (
  <section className="bg-background relative z-10">
    <ImageHero />
    <Work />
  </section>
);
export default ImageHeroSection;
