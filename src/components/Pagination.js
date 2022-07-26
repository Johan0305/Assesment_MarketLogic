import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Pagination = ({ number }) => {
  const { pathname } = useLocation();
  const nav = useNavigate();

  return (
    <button
      className={
        pathname === `/all/${number}`
          ? "button-pagination-active"
          : "button-pagination"
      }
      onClick={() => {
        if (number === "<") {
          return pathname !== "/all/0"
            ? nav(`/all/${pathname.split("")[5] - 1}`)
            : null;
        } else if (number === ">") {
          return pathname === "/all/9"
            ? null
            : nav(`/all/${Number(pathname.split("")[5]) + 1}`);
        } else if (number !== "<" && number !== ">") {
          nav(`/all/${number}`);
        }
      }}
    >
      {number}
    </button>
  );
};

export default Pagination;
