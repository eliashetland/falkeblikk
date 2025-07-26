import { numberOfPhotosNeeded, validCardSizes } from "../logic/generateMono";
import styles from "./Editor.module.css";

export interface IOptions {
  color: string;
  count: number;
}

interface IEditorProps {
  options: IOptions;
  images: File[];
  setOptions: (options: IOptions) => void;
}

export const Editor = (props: IEditorProps) => {
  return (
    <div className={styles.container}>
      <h2>Rediger kort</h2>
      <section className={styles.color}>
        <label htmlFor="color">Card Color</label>
        <input
          type="color"
          value={props.options.color}
          onChange={(e) =>
            props.setOptions({ ...props.options, color: e.target.value })
          }
        />
      </section>

      <section className={styles.count}>
        <label htmlFor="count">Personer per kort</label>
        <select
          id="count"
          value={props.options.count}
          onChange={(e) =>
            props.setOptions({
              ...props.options,
              count: Number(e.target.value),
            })
          }
        >
          {validCardSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <span>
          Du har {props.images.length}/
          {numberOfPhotosNeeded(props.options.count)} bilder lastet opp.
        </span>
      </section>
    </div>
  );
};
