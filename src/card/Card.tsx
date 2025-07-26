import { Figure } from "../figure/Figure";
import styles from "./Card.module.css";
interface ICardProps {
  card: number[];
  images: File[];
}

const getPositionCss = (
  width: number,
  left: number,
  top: number,
  height: number,
  rotate: number
) => {
  return {
    position: "absolute" as const,
    transform: `rotate(${rotate}deg)`,
    top: `${top}%`,
    left: `${left}%`,
    width: `${width}%`,
    height: `${height}%`,
  };
};

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getWidth = (
  cellWidth: number,
  minSize: number,
  maxWidth: number,
  padding: number
): number => {
  const paddingWidth = (cellWidth * padding) / 100;
  const min = (cellWidth * minSize) / 100;
  const max = (cellWidth * maxWidth) / 100;

  // Available width is reduced by horizontal padding
  const range = Math.max(0, max - min - 2 * paddingWidth);
  const width = Math.random() * range + min;

  return width;
};

const getPositions = (count: number) => {
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  const cellWidth = 100 / cols;
  const cellHeight = 100 / rows;

  const padding = 5; // % of cell size
  const maxWidth = 70;
  const maxHeight = 80;
  const minWidth = 20; // % of cell size
  const minHeight = 40; // % of cell size

  const cellIndices = shuffleArray(
    Array.from({ length: cols * rows }, (_, i) => i)
  );
  const positionsCss = [];

  for (let i = 0; i < count; i++) {
    const index = cellIndices[i];
    const col = index % cols;
    const row = Math.floor(index / cols);

    const cellLeft = col * cellWidth;
    const cellTop = row * cellHeight;

    const width = getWidth(cellWidth, minWidth, maxWidth, padding);
    const height = getWidth(cellHeight, minHeight, maxHeight, padding); // reuse getWidth for height too

    const paddingX = (cellWidth * padding) / 100;
    const paddingY = (cellHeight * padding) / 100;

    const left =
      Math.random() * (cellWidth - width - 2 * paddingX) + cellLeft + paddingX;
    const top =
      Math.random() * (cellHeight - height - 2 * paddingY) + cellTop + paddingY;

    const rotate = Math.random() * 20 - 10; // Random rotation between -5 and 5 degrees

    positionsCss.push(getPositionCss(width, left, top, height, rotate));
  }

  return positionsCss;
};

export const Card = (props: ICardProps) => {
  const positions = getPositions(props.card.length);

  return (
    <div className={styles.container}>
      {props.card.map((item, index) => (
        <div className={styles.figure} key={index} style={positions[index]}>
          <Figure item={item} key={index} image={props.images[index]} />
        </div>
      ))}
    </div>
  );
};
