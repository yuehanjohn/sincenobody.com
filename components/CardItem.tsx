import React from "react";
import { motion } from "motion/react";
import { Card as CardType } from "./CardList";
import { Card, Image, CardBody, CardFooter } from "@heroui/react";

interface CardItemProps {
  card: CardType;
  id: string;
  onClick: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, id, onClick }) => (
  <motion.div
    layoutId={`card-${card.title}-${id}`}
    onClick={onClick}
    className="p-0 flex flex-col "
  >
    <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer h-full border-none bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
      <CardBody className="p-0 relative flex-none">
        <div className="relative overflow-hidden w-full">
          <Image
            src={card.src}
            alt={card.title}
            className="w-full h-auto aspect-[16/9] object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </CardBody>

      <CardFooter className="p-4 flex flex-col gap-2">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors text-ellipsis text-left w-full h-fit">
          {card.title.length > 80
            ? card.title.slice(0, 77) + "..."
            : card.title}
        </h3>
        {card.description && (
          <p className="text-sm text-foreground/70 line-clamp-2 w-full text-left">
            {card.description}
          </p>
        )}
      </CardFooter>
    </Card>
  </motion.div>
);

export default CardItem;
