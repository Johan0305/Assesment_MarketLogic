import React, { useState } from "react";
import heart from "../assets/heart.png";
import heartFull from "../assets/heart-full.png";
import clock from "../assets/reloj-de-pared.png";

const TargetInfo = () => {
  const [hearts, setHearts] = useState(heart);
  return (
    <div className="container-target">
      <div className="container-info">
        <div className="container-time">
          <img src={clock} alt={"time"} />
          <p> subido hace 2 horas</p>
        </div>
        <div className="container-text">
          <p>Tilte</p>
        </div>
      </div>
      <div className="container-like">
        <img
          src={hearts}
          alt="heart"
          onClick={() =>
            hearts === heart ? setHearts(heartFull) : setHearts(heart)
          }
        ></img>
      </div>
    </div>
  );
};

export default TargetInfo;
