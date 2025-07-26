// export const validCardSizes = [2, 3, 4, 5, 6, 8, 12, 14, 18, 20];
export const validCardSizes = [2, 3, 4, 5, 6, 8];

export const numberOfPhotosNeeded = (n: number): number => {
    return n * (n - 1) + 1; 
}

export function generateMonomatch(n: number): number[][] {


    if (!validCardSizes.includes(n)) {
        console.error(`Invalid n = ${n}. Must be one of: ${validCardSizes.join(", ")}`);
        return [];
    }

    const cards: number[][] = [];

    // Generate the first n cards (each containing symbol 0)
    for (let i = 0; i < n; i++) {
        const card: number[] = [0]; // Common symbol on all first cards

        for (let j = 0; j < n - 1; j++) {
            const symbol = i * (n - 1) + j + 1;
            card.push(symbol);
        }

        cards.push(card);
    }

    // Generate the remaining (n - 1)^2 cards
    for (let row = 0; row < n - 1; row++) {
        for (let col = 0; col < n - 1; col++) {
            const card: number[] = [row + 1]; // Common symbol for this group

            for (let k = 0; k < n - 1; k++) {
                const symbolOffset = n + (n - 1) * k;
                const symbolIndex = (row * k + col) % (n - 1);
                const symbol = symbolOffset + symbolIndex;

                card.push(symbol);
            }

            cards.push(card);
        }
    }

    return cards.sort(() => Math.random() - 0.5);
}

// const validateMono = (mono: number[][]) => {
//     if (mono.length === 0) {
//         console.error("Mono is empty.");
//         return false;
//     }
//     const n = mono[0].length;
//     const cardCount = mono.length;

//     // for each card, check if it has only one match in each other card
//     for (let i = 0; i < cardCount; i++) {
//         const firstCard = mono[i];

//         for (let j = 0; j < cardCount; j++) {
//             if (i === j) continue; // skip self

//             const secondCard = mono[j];
//             let matchCount = 0;

//             for (let k = 0; k < n; k++) {
//                 if (firstCard.includes(secondCard[k])) {
//                     matchCount++;
//                 }
//             }

//             if (matchCount !== 1) {
//                 console.log(firstCard, secondCard);

//                 console.error(`Cards ${i + 1} and ${j + 1} do not match correctly.`);
//                 return false;
//             }
//         }
//     }

//     return true;
// };