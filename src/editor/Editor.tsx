import { Card } from "../card/Card";
import { numberOfPhotosNeeded, validCardSizes } from "../logic/generateMono";
import styles from "./Editor.module.css";

export interface IOptions {
  color: string;
  count: number;
  layout: Layout;
  backgroundImage?: File | null;
}

export type Layout = "random" | "arranged";
interface IEditorProps {
  options: IOptions;
  images: File[];
  setOptions: (options: IOptions) => void;
}

export const Editor = (props: IEditorProps) => {
  const previewCard = Array.from(
    { length: props.options.count },
    (_, i) => i + 1
  );
  return (
    <div className={styles.container}>
      <h2>Rediger kort</h2>

      <div className={styles.preview}>
        <Card
          card={previewCard}
          images={[]}
          options={props.options}
          useShapes
        />
      </div>

      <section className={styles.color}>
        <label htmlFor="color">Card Color</label>
        <input
          type="color"
          value={props.options.color}
          onChange={(e) =>
            props.setOptions({
              ...props.options,
              color: e.target.value,
              backgroundImage: null,
            })
          }
        />
      </section>

      <section className={styles.backgroundImage}>
        <div className={styles.fileInput}>
          <label htmlFor="fileInput">Bakgrunnsbilde</label>
          <button type="button" className={styles.uploadButton}>
            Upload
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  props.setOptions({
                    ...props.options,
                    backgroundImage: e.target.files[0],
                  });
                }
              }}
            />
          </button>
        </div>

        <button
          disabled={!props.options.backgroundImage}
          onClick={() =>
            props.setOptions({
              ...props.options,
              backgroundImage: null,
            })
          }
        >
          Fjern bakgrunnsbilde
        </button>
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

      <section className={styles.layout}>
        <input
          type="radio"
          name="layout"
          id="random"
          checked={props.options.layout === "random"}
          onChange={() =>
            props.setOptions({ ...props.options, layout: "random" })
          }
        />
        <label htmlFor="random">Random Layout</label>

        <input
          type="radio"
          name="layout"
          id="arranged"
          checked={props.options.layout === "arranged"}
          onChange={() =>
            props.setOptions({ ...props.options, layout: "arranged" })
          }
        />
        <label htmlFor="arranged">Arranged Layout</label>
      </section>
    </div>
  );
};
