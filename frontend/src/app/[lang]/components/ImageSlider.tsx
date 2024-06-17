"use client";
import { Fade } from "react-slideshow-image";
import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";

interface Image {
  id: number;
  alternativeText: string | null;
  caption: string | null;
  url: string;
}

interface SlidShowProps {
  files: Image[];
}

export default function Slideshow({ data }: { data: SlidShowProps }) {
  return (
    <div className="slide-container">
      <Fade>
        {data.files.map((fadeImage: Image, index) => {
          const imageUrl = getStrapiMedia(fadeImage.url);
          return (
            <div key={index}>
              {imageUrl && (
                <Image
                  className="w-full h-96 object-cover rounded-lg"
                  height={800}
                  width={1070}
                  alt="alt text"
                  src={imageUrl}
                />
              )}
            </div>
          );
        })}
      </Fade>
    </div>
  );
}
