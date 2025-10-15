import React, { useRef, useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  texts?: string[];
  children?: React.ReactNode[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  // Marquee-specific props
  marqueeMode?: boolean;
  gap?: number;
  pauseOnHover?: boolean;
}

function useElementWidth<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  children = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
  marqueeMode = false,
  gap = 32,
  pauseOnHover = false,
}) => {
  // Initialize all hooks unconditionally
  const allItems = [...texts, ...children];
  const baseX = useMotionValue(0);
  const copyRef = useRef<HTMLDivElement>(null);
  const copyWidth = useElementWidth(copyRef);
  const [isPaused, setIsPaused] = useState(false);

  // Add scroll responsiveness with damping
  const scrollOptions = scrollContainerRef
    ? { container: scrollContainerRef }
    : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 80, // Higher damping for stability
    stiffness: 300,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping?.input || [0, 1000],
    velocityMapping?.output || [0, 2], // Reduced output range for stability
    { clamp: false },
  );

  const wrap = (min: number, max: number, v: number): number => {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;

    return mod + min;
  };

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";

    return `${wrap(-copyWidth, 0, v)}px`;
  });

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    if (marqueeMode && !isPaused) {
      let moveBy = directionFactor.current * velocity * (delta / 1000);

      // Add scroll influence but keep it stable
      const scrollInfluence = velocityFactor.get();

      if (Math.abs(scrollInfluence) > 0.1) {
        if (scrollInfluence < 0) {
          directionFactor.current = -1;
        } else if (scrollInfluence > 0) {
          directionFactor.current = 1;
        }
        // Apply scroll influence more gently
        moveBy +=
          directionFactor.current *
          moveBy *
          Math.min(Math.abs(scrollInfluence), 2);
      }

      baseX.set(baseX.get() + moveBy);
    }
  });

  // Enhanced Marquee Mode - responsive to scroll but stable
  if (marqueeMode) {
    const items = [];

    for (let i = 0; i < Math.max(8, numCopies); i++) {
      items.push(
        <div
          key={i}
          ref={i === 0 ? copyRef : null}
          className="flex items-center flex-shrink-0"
          style={{ gap: `${gap}px` }}
        >
          {allItems.map((item, index) => (
            <div key={`${i}-${index}`} className="flex-shrink-0">
              {typeof item === "string" ? item : item}
            </div>
          ))}
        </div>,
      );
    }

    return (
      <div
        className={`${parallaxClassName || ""} relative overflow-hidden`}
        style={parallaxStyle}
        onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
        onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
      >
        <motion.div
          className={`${scrollerClassName || ""} flex items-center ${className}`}
          style={{ x, gap: `${gap}px`, ...scrollerStyle }}
        >
          {items}
        </motion.div>
      </div>
    );
  }

  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = "",
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
  }: VelocityTextProps) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef
      ? { container: scrollContainerRef }
      : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400,
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false },
    );

    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef);

    const wrap = (min: number, max: number, v: number): number => {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;

      return mod + min;
    };

    const x = useTransform(baseX, (v) => {
      if (copyWidth === 0) return "0px";

      return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];

    for (let i = 0; i < numCopies!; i++) {
      spans.push(
        <span
          key={i}
          ref={i === 0 ? copyRef : null}
          className={`flex-shrink-0 ${className}`}
        >
          {children}
        </span>,
      );
    }

    return (
      <div
        className={`${parallaxClassName || ""} relative overflow-hidden`}
        style={parallaxStyle}
      >
        <motion.div
          className={`${scrollerClassName || ""} flex whitespace-nowrap items-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]`}
          style={{ x, ...scrollerStyle }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }

  // Original multi-row mode
  const items = [
    ...texts.map((text, index) => ({
      type: "text",
      content: text,
      key: `text-${index}`,
    })),
    ...children.map((child, index) => ({
      type: "component",
      content: child,
      key: `component-${index}`,
    })),
  ];

  return (
    <section>
      {items.map((item, index) => (
        <VelocityText
          key={item.key}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          className={className}
          damping={damping}
          numCopies={numCopies}
          parallaxClassName={parallaxClassName}
          parallaxStyle={parallaxStyle}
          scrollContainerRef={scrollContainerRef}
          scrollerClassName={scrollerClassName}
          scrollerStyle={scrollerStyle}
          stiffness={stiffness}
          velocityMapping={velocityMapping}
        >
          {item.type === "text" ? `${item.content}\u00A0` : item.content}
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
