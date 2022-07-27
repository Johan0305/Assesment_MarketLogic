import React, { useState } from "react";
import heart from "../assets/heart.png";
import heartFull from "../assets/heart-full.png";
import clock from "../assets/reloj-de-pared.png";
import { useDispatch } from "react-redux";
import { UPDATE_HITS } from "../store/reducers/All.reducer";

const TargetInfo = ({ target }) => {
  const dispatch = useDispatch();
  const [heartMarked, setHeartMarked] = useState(target?.marked);
  const targetsID =
    localStorage.getItem("targetsMarked") !== null &&
    localStorage
      .getItem("targetsMarked")
      .split(",")
      .filter((item) => item !== "");
  const date = new Date(target?.created_at);

  //this function checks the card in the global state
  const handleSubmitTargetsMarked = (id) => {
    setHeartMarked(true);
    dispatch({
      type: UPDATE_HITS,
      payload: { ...target, marked: true },
    });

    if (localStorage.getItem("targetsMarked") === null) {
      localStorage.setItem("targetsMarked", id);
    } else {
      localStorage.setItem("targetsMarked", [...targetsID, id]);
    }
  };

  //this function unchecks the card in the global state
  const handleSubmitNoTargetsMarked = (id) => {
    setHeartMarked(false);
    dispatch({
      type: UPDATE_HITS,
      payload: { ...target, marked: false },
    });
    localStorage.setItem(
      "targetsMarked",
      targetsID.filter((item) => item !== "" && item !== id)
    );
  };

  return (
    <div className="container-target" key={target?.id}>
      <a href={target?.story_url} target="_blank" rel="noreferrer">
        <div className="container-info">
          <div className="container-time">
            <img src={clock} alt={"time"} />
            <p>{`${date.getHours()} hours ago by ${target?.author}`}</p>
          </div>
          <div className="container-text">
            <p>{target?.story_title}</p>
          </div>
        </div>
      </a>
      <div className="container-like">
        <img
          src={heartMarked ? heartFull : heart}
          alt="heart"
          onClick={() =>
            heartMarked === false
              ? handleSubmitTargetsMarked(target.id)
              : handleSubmitNoTargetsMarked(target.id)
          }
        />
      </div>
    </div>
  );
};

export default TargetInfo;
