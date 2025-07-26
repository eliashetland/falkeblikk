import styles from "./Figure.module.css";
interface IFigureProps {
  item: number;
  image: File | null;
}

export const Figure = (props: IFigureProps) => {
  return (
    <div className={styles.container}>
      {props.image ? (
        <img
          className={styles.image}
          src={URL.createObjectURL(props.image)}
          alt={`Figure ${props.item}`}
        />
      ) : (
        <div className={styles.placeholder}>
          <span>{props.item}</span>
        </div>
      )}
    </div>
  );
};
