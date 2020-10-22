import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

//Component styles
import "react-lazy-load-image-component/src/effects/blur.css";

//Interfaces
interface IProps {
  photo: {
    alt: string;
    width: string;
    height: string;
    src: string;
  };
}

const Photo: React.FC<IProps> = (props) => {
  const { alt, width, height, src } = props.photo;

  return (
    <div>
      <LazyLoadImage
        alt={alt}
        width={width}
        height={height}
        src={src}
        effect="blur"
      />
    </div>
  );
};

export default Photo;
