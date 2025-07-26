import styles from "./Figure.module.css";
interface IFigureProps {
  item: number;
}

export const Figure = (props: IFigureProps) => {
  return (
    <div className={styles.container}>
      <span>{props.item}</span>
    </div>
  );
};
