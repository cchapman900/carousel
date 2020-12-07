import { useSelector } from "react-redux";
import { getSelectedImage } from "./carouselSlice";
import styles from "./Carousel.module.css";

export function ImageViewer() {
  const selectedImage = useSelector(getSelectedImage);

  if (!selectedImage) {
    return <div>No active images</div>;
  }
  return (
    <figure className={styles.imageViewerContainer}>
      <img
        src={`/images/${selectedImage.imageName}`}
        alt={selectedImage.imageCaption}
        width={500}
        height={500}
      />
      <figcaption className={styles.imageViewerCaption}>
        {selectedImage.imageCaption}
      </figcaption>
    </figure>
  );
}
