import { Card } from "../card/Card";
import type { IOptions } from "../editor/Editor";
import { numberOfPhotosNeeded } from "../logic/generateMono";
import styles from "./Cards.module.css";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface ICardsProps {
  cards: number[][];
  images: File[];
  options: IOptions;
}

export const Cards = (props: ICardsProps) => {
  const saveCanvas = async () => {
    const canvases = document.querySelectorAll("canvas");
    const zip = new JSZip();
    const folder = zip.folder("falkeblikk");

    for (let i = 0; i < canvases.length; i++) {
      const canvas = canvases[i] as HTMLCanvasElement;
      const dataUrl = canvas.toDataURL("image/png");
      const base64 = dataUrl.split(",")[1]; // remove the header

      folder?.file(`falkeblikk_${i + 1}.png`, base64, { base64: true });
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "falkeblikk.zip");
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
