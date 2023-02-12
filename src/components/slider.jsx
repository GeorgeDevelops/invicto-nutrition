import React from "react";
import { Carousel } from "react-bootstrap";

export default function SimpleSlider({ images }) {
  return (
    <Carousel className="carousel">
      {images.length < 1
        ? null
        : images.map((image) => (
            <Carousel.Item key={image.url}>
              <img className="d-block w-100" src={image.url} alt={image.url} />
            </Carousel.Item>
          ))}
    </Carousel>
  );
}
