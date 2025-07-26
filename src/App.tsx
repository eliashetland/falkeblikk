import { useState } from "react";
import { Cards } from "./cards/Cards";
import styles from "./App.module.css";
import { generateMonomatch, validCardSizes } from "./logic/generateMono";
import { UploadImages } from "./uploadImages/UploadImages";

function App() {
  const [count, setCount] = useState(3);

  const [images, setImages] = useState<File[]>([]);
  const [displayCards, setDisplayCards] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Falkeblikk</h1>
        <div className={styles.controls}>
          <label htmlFor="count">Personer per kort:</label>
          <select
            id="count"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            {validCardSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </header>
      <main className={styles.main}>
        {displayCards ? (
          <Cards cards={generateMonomatch(count)} images={images} />
        ) : (
          <UploadImages images={images} onImagesChange={setImages} onComplete={() => setDisplayCards(true)} />
        )}
      </main>
    </div>
  );
}

export default App;
