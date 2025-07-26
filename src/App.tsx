import { useState } from "react";
import { Cards } from "./cards/Cards";
import styles from "./App.module.css";
import { generateMonomatch } from "./logic/generateMono";
import { UploadImages } from "./uploadImages/UploadImages";
import { Editor, type IOptions } from "./editor/Editor";
import { Nav } from "./nav/Nav";

export type Page = "cards" | "editor" | "images";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("cards");
  const [options, setOptions] = useState<IOptions>({
    color: "#e8e8e8",
    count: 3,
  });

  const [images, setImages] = useState<File[]>([]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Falkeblikk</h1>
        <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </header>
      <main className={styles.main}>
        {currentPage === "images" && (
          <UploadImages images={images} onImagesChange={setImages} count={options.count} />
        )}
        {currentPage === "editor" && (
          <Editor options={options} setOptions={setOptions} images={images} />
        )}
        {currentPage === "cards" && (
          <Cards
            cards={generateMonomatch(options.count)}
            images={images}
            options={options}
          />
        )}
      </main>
    </div>
  );
}

export default App;
