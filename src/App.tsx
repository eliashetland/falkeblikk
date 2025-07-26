import { useState } from "react";
import { Cards } from "./cards/Cards";
import styles from "./App.module.css";

const generateMono = (n = 5) => {
  const cards = [];
  const cardCount = n ** 2 - n + 1;

  for (let i = 0; i < cardCount; i++) {
    const card = [];
    for (let j = 0; j < n; j++) {
      card.push(((i + 2 ** j) % cardCount) + 1);
    }
    cards.push(card);
  }

  return cards;
};

// const validateMono = (mono) => {
//   const n = mono[0].length;
//   const cardCount = mono.length;

//   // for each card, check if it has only one match in each other card
//   for (let i = 0; i < cardCount; i++) {
//     const firstCard = mono[i];

//     for (let j = 0; j < cardCount; j++) {
//       if (i === j) continue; // skip self

//       const secondCard = mono[j];
//       let matchCount = 0;

//       for (let k = 0; k < n; k++) {
//         if (firstCard.includes(secondCard[k])) {
//           matchCount++;
//         }
//       }

//       if (matchCount !== 1) {
//         console.error(`Cards ${i + 1} and ${j + 1} do not match correctly.`);
//         return false;
//       }
//     }

//   }

//   return true;
// }

function App() {
  const [count, setCount] = useState(3);
  // const isValid = validateMono(mono);
  // if (!isValid) {
  //   console.error("Generated mono does not meet the criteria.");
  // } else {
  //   console.log("Generated mono is valid.");
  // }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Mono Cards</h1>
        <input
          type="number"
          min="1"
          max="10"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </header>
      <main className={styles.main}>
        <Cards cards={generateMono(count)} />
      </main>
    </div>
  );
}

export default App;
