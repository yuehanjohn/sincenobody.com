import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { Image } from "@heroui/react";
import ScrollVelocity from "@/components/container/Scrollvelocity";
import { ProgressiveBlur } from "@/components/effects/progressive-blur";

const HeroSection = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  return (
    <section className="h-screen w-full flex items-center justify-center text-white">
      <div
        ref={videoContainerRef}
        style={{ position: "relative", width: "100%", height: "100vh" }}
      >
        {/* Background Video */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            zIndex: 0,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100vh",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "calc(max(100vw, 100vh * 16 / 9))",
                height: "calc(max(100vh, 100vw * 9 / 16))",
                aspectRatio: "16/9",
                overflow: "hidden",
              }}
            >
              <ReactPlayer
                src="https://youtu.be/DHJYJCazX8M"
                playing
                loop
                controls={false}
                muted
                width="100%"
                height="100%"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <span
            className="flex-none font-bebas m-0 p-0 text-2xl"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1,
              verticalAlign: "middle",
              fontFeatureSettings: "liga",
              maxWidth: "100%",
              display: "inline-block",
              position: "relative",
            }}
          >
            The AI Guy
          </span>
        </div>
        <div className="absolute bottom-0 left-0 w-full py-0 overflow-hidden">
          <ScrollVelocity
            marqueeMode={true}
            velocity={100}
            gap={48}
            pauseOnHover={false}
            className="logo-marquee"
            numCopies={8}
          >
            {[
              "bueno.svg",
              "boost.png",
              "turkuamk.png",
              "sinceai.png",
              "founderinstitute.png",
              "kaewtaart.png",
              "businessturku.png",
              "fucard.png",
            ].map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center"
                style={{ height: "100px", minWidth: "120px" }}
              >
                <Image
                  alt="Company Logo"
                  src={`/assets/logos/worked/${logo}`}
                  className="object-contain rounded-none"
                  style={{ maxHeight: "20px", maxWidth: "100px" }}
                />
              </div>
            ))}
          </ScrollVelocity>
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 h-full w-[200px]"
            direction="left"
            blurIntensity={1}
            blurLayers={8}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 h-full w-[200px]"
            direction="right"
            blurIntensity={1}
            blurLayers={8}
          />
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
