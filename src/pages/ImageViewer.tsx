import { useState, useEffect } from "react";
import styles from "./styles/ImageViewer.module.css";
import { useParams } from "react-router-dom";
import { URLAPI } from "../../const";
import { getMediaType } from "../utils/getMediaType.js";

type imagesProps = {
  mimeType: "Image" | "Video";
  url: string;
};

const ImageViewer = () => {
  const [images, setImages] = useState<imagesProps[]>([]);
  const { id_reference } = useParams();

  useEffect(() => {
    const getimages = async () => {
      try {
        const data = await fetch(
          `${URLAPI}getMultimediaSeleceted/${id_reference}`
        );
        if (!data.ok) throw new Error("error");

        const res = await data.json();

        setImages(res);
      } catch (error) {
        console.log(error);
      }
    };

    getimages();
  }, [id_reference]);

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.contImages}>
          {images.map((media) => {
            return getMediaType(media.mimeType) === "image" ? (
              <div style={{ width: "100%" }}>
                <img style={{ width: "100%" }} src={media.url} />
              </div>
            ) : (
              <div style={{ width: "100%" }}>
                <video style={{ width: "100%" }} src={media.url} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
