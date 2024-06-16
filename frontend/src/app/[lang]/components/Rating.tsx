// components/Rating.tsx

import React from "react";

type RatingProps = {
  rating: number; // Rating value (between 1 and 5)
};

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const maxStars = 5;
  const filledStars = rating;
  const emptyStars = maxStars - filledStars;

  return (
    <div style={{ display: "flex" }}>
      {[...Array(filledStars)].map((_, index) => (
        <div
          key={index}
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "yellow",
            margin: "2px",
            borderRadius: "10px",
          }}
        />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <div
          key={index}
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "lightgrey",
            margin: "2px",
            borderRadius: "10px",
          }}
        />
      ))}
    </div>
  );
};

export default Rating;
