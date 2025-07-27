import type { ICardProps } from "../card/Card";

const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const getWidth = (
    cellWidth: number,
    minSize: number,
    maxWidth: number,
    padding: number
): number => {
    const paddingWidth = (cellWidth * padding) / 100;
    const min = (cellWidth * minSize) / 100;
    const max = (cellWidth * maxWidth) / 100;

    // Available width is reduced by horizontal padding
    const range = Math.max(0, max - min - 2 * paddingWidth);
    const width = Math.random() * range + min;

    return width;
};

const getPositions = (count: number) => {
    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    const cellWidth = 100 / cols;
    const cellHeight = 100 / rows;

    const padding = 5; // % of cell size
    const maxWidth = 70;
    const maxHeight = 80;
    const minWidth = 60; // % of cell size
    const minHeight = 70; // % of cell size

    const cellIndices = shuffleArray(
        Array.from({ length: cols * rows }, (_, i) => i)
    );
    const positions = [];

    for (let i = 0; i < count; i++) {
        const index = cellIndices[i];
        const col = index % cols;
        const row = Math.floor(index / cols);

        const cellLeft = col * cellWidth;
        const cellTop = row * cellHeight;

        const width = getWidth(cellWidth, minWidth, maxWidth, padding);
        const height = getWidth(cellHeight, minHeight, maxHeight, padding); // reuse getWidth for height too

        const paddingX = (cellWidth * padding) / 100;
        const paddingY = (cellHeight * padding) / 100;

        const left =
            Math.random() * (cellWidth - width - 2 * paddingX) + cellLeft + paddingX;
        const top =
            Math.random() * (cellHeight - height - 2 * paddingY) + cellTop + paddingY;

        const rotate = Math.random() * 20 - 10; // Random rotation between -5 and 5 degrees

        positions.push({ width, left, top, height, rotate });
    }
    return { positions };
};

const getArrangedPositions = (count: number) => {
    const padding = 5;
    const cellWidth = (100 - 2 * padding) / count;
    const maxHeight = 70;

    const positions = [];
    for (let i = 0; i < count; i++) {

        const left = (i * cellWidth) + padding;
        const top = (100 - maxHeight);

        positions.push({
            width: cellWidth, // Fixed width
            left,
            top,
            height: maxHeight,
            rotate: 0, // No rotation
        });
    }
    return { positions };
};

const imageUrlCache = new Map<File, string>();

const getCachedUrl = (file: File) => {
    if (!imageUrlCache.has(file)) {
        imageUrlCache.set(file, URL.createObjectURL(file));
    }
    return imageUrlCache.get(file)!;
};

const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
        if (!file) {
            resolve(new Image(10, Math.random() * 20 + 5));
            return;
        }
        const img = new Image();

        img.src = getCachedUrl(file);
        img.onload = () => resolve(img);
    });
};



export const drawCard = async (
    props: ICardProps,
    canvasRef?: React.RefObject<HTMLCanvasElement | null>,
) => {
    if (!canvasRef || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { positions } = props.options.layout === "random"
        ? getPositions(props.card.length)
        : getArrangedPositions(props.card.length);

    // Load all images
    const images = await Promise.all(
        props.card.map((item) => loadImage(props.images[item]))

    );

    // Clear canvas and fill background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (props.options.backgroundImage) {
        const bgImage = await loadImage(props.options.backgroundImage);
        const bgAspect = bgImage.width / bgImage.height;
        const canvasAspect = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (bgAspect > canvasAspect) {
            // Background is wider — fill height, crop width
            drawHeight = canvas.height;
            drawWidth = canvas.height * bgAspect;
        } else {
            // Background is taller — fill width, crop height
            drawWidth = canvas.width;
            drawHeight = canvas.width / bgAspect;
        }

        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = (canvas.height - drawHeight) / 2;

        ctx.drawImage(bgImage, offsetX, offsetY, drawWidth, drawHeight);

    } else {
        ctx.fillStyle = props.options.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    // Draw each image with position and aspect ratio adjustments
    images.forEach((img, index) => {
        const { width, left, top, height, rotate } = positions[index];

        const pxWidth = (width / 100) * canvas.width;
        const pxHeight = (height / 100) * canvas.height;
        const pxLeft = (left / 100) * canvas.width;
        const pxTop = (top / 100) * canvas.height;

        const imgAspect = img.width / img.height;
        const boxAspect = pxWidth / pxHeight;

        let drawWidth = pxWidth;
        let drawHeight = pxHeight;

        if (imgAspect > boxAspect) {
            drawWidth = pxWidth;
            drawHeight = pxWidth / imgAspect;
        } else {
            drawHeight = pxHeight;
            drawWidth = pxHeight * imgAspect;
        }

        ctx.save();

        const alignFromBottom = props.options.layout === "arranged";
        const translateX = pxLeft + pxWidth / 2;
        const translateY = alignFromBottom ? pxTop + pxHeight : pxTop + pxHeight / 2;

        ctx.translate(translateX, translateY);
        ctx.rotate((rotate * Math.PI) / 180);

        const drawX = -drawWidth / 2;
        const drawY = alignFromBottom
            ? -drawHeight
            : -drawHeight / 2;

        if (props.useShapes) {

            ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
            ctx.fillRect(drawX, drawY, drawWidth, drawHeight);
        } else {


            ctx.drawImage(
                img,
                drawX,
                drawY,
                drawWidth,
                drawHeight
            );
        }
        ctx.restore();
    });
};
