import { useState } from "react";
import styles from "./UploadImages.module.css";
interface IUploadImagesProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  onComplete: () => void;
}

export const UploadImages = (props: IUploadImagesProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileChange({
      target: { files },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      props.onImagesChange(fileArray);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className={styles.fileInput}
        />

        <p>Drag and drop files here, or click to browse</p>
        {props.images.length > 0 && (
          <p>Uploaded Images ({props.images.length}): </p>
        )}
      </div>

      {props.images.length > 0 && (
        <div className={styles.imagesSection}>
          <div className={styles.completeButtonContainer}>
            <button
              className={styles.completeButton}
              onClick={props.onComplete}
            >
              Complete Upload
            </button>
          </div>
          <div className={styles.imagesContainer}>
            {props.images.map((image, index) => (
              <div className={styles.imageContainer} key={index}>
                <button
                  className={styles.deleteButton}
                  onClick={() =>
                    props.onImagesChange(
                      props.images.filter((_, i) => i !== index)
                    )
                  }
                >
                  &times;
                </button>
                <img
                  className={styles.image}
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
