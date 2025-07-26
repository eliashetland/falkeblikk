import { useEffect, useRef } from "react";
import styles from "./Card.module.css";
import type { IOptions } from "../editor/Editor";
import { drawCard } from "../logic/canvasDrawer";
export interface ICardProps {
  card: number[];
  images: File[];
  options: IOptions;
}

export const Card = (props: ICardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawCard(props, canvasRef);
  }, [props.card, props.images, props.options]);

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={1200}
        height={800}
      />
    </div>
  );
};
