import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllApi } from "../store/reducers/All.reducer";

const PaginationFavs = ({ number }) => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  return (
    <button
      className={
        pathname === `/favs/${number}`
          ? "button-pagination-active"
          : "button-pagination"
      }
      onClick={() => {
        // these conditions serve to bring specific data from the api and achieve paging
        //these first two conditions is to navigate with the arrows
        if (number === "<") {
          return pathname !== "/favs/0"
            ? nav(`/favs/${pathname.split("")[6] - 1}`)
            : null;
        } else if (number === ">") {
          return pathname === "/favs/9"
            ? null
            : nav(`/favs/${Number(pathname.split("")[6]) + 1}`);
        } else if (number !== "<" && number !== ">") {
          //these conditions is to navigate when clicking the numbers and render the info

          dispatch(getAllApi(number));

          nav(`/favs/${number}`);
        }
      }}
    >
      {number}
    </button>
  );
};

export default PaginationFavs;
