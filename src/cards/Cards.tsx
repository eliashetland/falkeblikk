import { Card } from "../card/Card";
import type { IOptions } from "../editor/Editor";
import { numberOfPhotosNeeded } from "../logic/generateMono";
import styles from "./Cards.module.css";

interface ICardsProps {
  cards: number[][];
  images: File[];
  options: IOptions;
}

export const Cards = (props: ICardsProps) => {
  const saveCanvas = () => {
    const canvases = document.querySelectorAll("canvas");

    for (const canvas of canvases) {
      const link = document.createElement("a");
      link.download = "falkeblikk.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
  <div className={styles.container}>
      <button
        className={styles.downloadButton}
        type="button"
        onClick={saveCanvas}
      >
        Last ned
      </button>

      {numberOfPhotosNeeded(props.options.count) > props.images.length && (
        <p className={styles.warning}>
          Du har lastet opp {props.images.length} bilder av{" "}
          {numberOfPhotosNeeded(props.options.count)} bilder som trengs.
        </p>
      )}

    <div className={styles.scrollContainer}>
      {props.cards.map((card, index) => (
        <Card
        key={index}
        card={card}
        images={props.images}
        options={props.options}
        />
      ))}
    </div>
        </div>
  );
};
