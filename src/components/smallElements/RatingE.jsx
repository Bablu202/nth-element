import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
export default function RatingE({ maxrating = 5 }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  let star = !tempRating ? rating : tempRating;

  return (
    <div>
      <div className="rating__stars">
        {Array.from({ length: maxrating }, (_, i) => (
          <div
            className=""
            key={i}
            onClick={() => setRating(i + 1)}
            onMouseEnter={() => setTempRating(i + 1)}
            onMouseLeave={() => setTempRating(0)}
          >
            {star >= i + 1 ? <AiFillStar /> : <AiOutlineStar />}
          </div>
        ))}
      </div>
      <p className="number">rating : {star || ""}</p>
    </div>
  );
}

/*.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__stars {
    display: flex;
    flex-direction: row;
    color: #ffb30d;
  }
}*/
