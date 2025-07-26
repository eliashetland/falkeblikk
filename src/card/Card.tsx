import { Figure } from "../figure/Figure";
import styles from "./Card.module.css";
interface ICardProps {
  card: number[];
}

const getPositionCss = (
  width: number,
  left: number,
  top: number,
  rotate: number
) => {
  return {
    position: 'absolute' as const,
    transform: `rotate(${rotate}deg)`,
    top: `${top}%`,
    left: `${left}%`,
    width: `${width}%`,
  };
};
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getPositions = (count: number) => {
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  const cellWidth = 100 / cols;
  const cellHeight = 100 / rows;

  const padding = 5; // % of cell size
  const cellIndices = shuffleArray(
    Array.from({ length: count }, (_, i) => i)
  );

  const positionsCss = [];

  for (let i = 0; i < count; i++) {
    const index = cellIndices[i];
    const col = index % cols;
    const row = Math.floor(index / cols);

    // Calculate the bounds of the current cell
    const cellLeft = col * cellWidth;
    const cellTop = row * cellHeight;

    const maxShapeWidth = cellWidth - 2 * padding;
    const width = Math.random() * Math.min(maxShapeWidth, cellHeight - 2 * padding);

    // Prevent overflow by adjusting offsets
    const offsetX = padding + Math.random() * (cellWidth - width - 2 * padding);
    const offsetY = padding + Math.random() * (cellHeight - width - 2 * padding);
    const rotate = Math.random() * 150 - 75;

    const left = cellLeft + offsetX;
    const top = cellTop + offsetY;

    positionsCss.push(getPositionCss(width, left, top, rotate));
  }

  return positionsCss;
};

export const Card = (props: ICardProps) => {
  const positions = getPositions(props.card.length);

  return (
    <div className={styles.container}>
      {props.card.map((item, index) => (
        <div className={styles.figure} key={index} style={positions[index]}>
          <Figure item={item} key={index} />
        </div>
      ))}
    </div>
  );
};
