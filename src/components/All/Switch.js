import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Switch = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();

  return (
    <div className="container-global-switch">
      <div className="container-switch">
        <button
          className={pathname.includes("all") ? "button-left-activate" : null}
          onClick={() => nav("/all/0")}
        >
          All
        </button>
        <button
          className={pathname.includes("favs") ? "button-right-activate" : null}
          onClick={() => nav("/favs/0")}
        >
          My Favs
        </button>
      </div>
    </div>
  );
};

export default Switch;
