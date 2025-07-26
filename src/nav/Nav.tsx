import type { Page } from "../App";
import styles from "./Nav.module.css";

interface INavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export const Nav = (props: INavProps) => {
  return (
    <nav className={styles.nav}>
      <input
        type="radio"
        name="view"
        id="images"
        className={styles.radio}
        checked={props.currentPage === "images"}
        onChange={() => props.setCurrentPage("images")}
      />
      <label htmlFor="images">Bilder</label>
      <input
        type="radio"
        name="view"
        id="editor"
        className={styles.radio}
        checked={props.currentPage === "editor"}
        onChange={() => props.setCurrentPage("editor")}
      />
      <label htmlFor="editor">Editor</label>
      <input
        type="radio"
        name="view"
        id="cards"
        className={styles.radio}
        checked={props.currentPage === "cards"}
        onChange={() => props.setCurrentPage("cards")}
      />
      <label htmlFor="cards">Kort</label>
    </nav>
  );
};
