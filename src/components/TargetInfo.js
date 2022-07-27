import React, { useState } from "react";
import heart from "../assets/heart.png";
import heartFull from "../assets/heart-full.png";
import clock from "../assets/reloj-de-pared.png";

const TargetInfo = ({
  created_at,
  author,
  story_id,
  story_title,
  story_url,
}) => {
  const [hearts, setHearts] = useState(heart);
  const date = new Date(created_at);
  return (
    <div className="container-target" key={story_id}>
      <a href={story_url} target="_blank" rel="noreferrer" c>
        <div className="container-info">
          <div className="container-time">
            <img src={clock} alt={"time"} />
            <p>{`${date.getHours()} hours ago by ${author}`}</p>
          </div>
          <div className="container-text">
            <p>{story_title}</p>
          </div>
        </div>
      </a>
      <div className="container-like">
        <img
          src={hearts}
          alt="heart"
          onClick={() =>
            hearts === heart ? setHearts(heartFull) : setHearts(heart)
          }
        />
      </div>
    </div>
  );
};

export default TargetInfo;
