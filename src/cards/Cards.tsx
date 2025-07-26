import { Card } from "../card/Card";
import styles from "./Cards.module.css";

interface ICardsProps {
  cards: number[][];
  images: File[];
}

export const Cards = (props: ICardsProps) => {
  return (
    <div className={styles.container}>
      {props.cards.map((card, index) => (
        <Card key={index} card={card} images={props.images} />
      ))}
    </div>
  );
};
