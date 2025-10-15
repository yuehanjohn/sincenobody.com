import React from "react";
import { motion } from "motion/react";
import CardItem from "./CardItem";

export interface Card {
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: (() => JSX.Element) | string;
}

interface CardListProps {
  cards: Card[];
  id: string;
  onCardClick: (card: Card) => void;
}

const CardList: React.FC<CardListProps> = ({ cards, id, onCardClick }) => (
    
  <ul className="max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {cards.map((card) => (
      <CardItem key={card.title} card={card} id={id} onClick={() => onCardClick(card)} />
    ))}
  </ul>
);

export default CardList;
