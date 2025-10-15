"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, ReactNode } from "react";

export type CardComponent = {
  id: string | number;
  component: ReactNode;
};

interface HorizontalScrollCarouselProps {
  cards: (CardComponent | ReactNode)[];
  className?: string;
  cardClassName?: string;
  sectionHeight?: string;
  cardSize?: {
    width: string;
    height: string;
  };
  gap?: string;
}

export const HorizontalScrollCarousel = ({
  cards,
  className = "",
  cardClassName = "",
  sectionHeight = "300vh",
  cardSize = { width: "100vw", height: "100vh" },
  gap = "gap-0",
}: HorizontalScrollCarouselProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  // Helper function to determine if item is a CardComponent or direct ReactNode
  const isCardComponent = (
    item: CardComponent | ReactNode
  ): item is CardComponent => {
    return (
      item !== null &&
      typeof item === "object" &&
      "id" in item &&
      "component" in item
    );
  };

  return (
    <section
      ref={targetRef}
      className={`relative ${className}`}
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className={`flex ${gap}`}>
          {cards.map((card, index) => {
            const cardId = isCardComponent(card) ? card.id : index;
            const cardContent = isCardComponent(card) ? card.component : card;

            return (
              <div
                key={cardId}
                className={`flex-shrink-0 ${cardClassName}`}
                style={{
                  height: cardSize.height,
                  width: cardSize.width,
                }}
              >
                {cardContent}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

// Example Card component for backward compatibility
export type LegacyCardType = {
  url: string;
  title: string;
  id: number;
};

interface LegacyCardProps {
  card: LegacyCardType;
  className?: string;
}

export const LegacyCard = ({ card, className = "" }: LegacyCardProps) => {
  return (
    <div
      className={`group relative h-full w-full overflow-hidden bg-neutral-200 ${className}`}
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default HorizontalScrollCarousel;

// Utility function to create cards easily
export const createCard = (
  id: string | number,
  component: ReactNode
): CardComponent => ({
  id,
  component,
});

// Utility function to create cards from an array of React components
export const createCards = (components: ReactNode[]): CardComponent[] =>
  components.map((component, index) => createCard(index, component));
