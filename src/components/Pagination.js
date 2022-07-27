import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getAllApi,
  getApiAngular,
  getApiReact,
  getApiVue,
} from "../store/reducers/All.reducer";

const Pagination = ({ number }) => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const filterState = localStorage.getItem("filterState");

  return (
    <button
      className={
        pathname === `/all/${number}`
          ? "button-pagination-active"
          : "button-pagination"
      }
      onClick={() => {
        // these conditions serve to bring specific data from the api and achieve paging
        //these first two conditions is to navigate with the arrows
        if (number === "<") {
          if (pathname !== "/all/0") {
            if (filterState !== null) {
              if (filterState === "React") {
                dispatch(getApiReact(Number(pathname.split("")[5]) - 1));
              } else if (filterState === "Angular") {
                dispatch(getApiAngular(Number(pathname.split("")[5]) - 1));
              } else if (filterState === "Vue") {
                dispatch(getApiVue(Number(pathname.split("")[5]) - 1));
              }
            } else {
              dispatch(getAllApi(Number(pathname.split("")[5]) - 1));
            }
            nav(`/all/${Number(pathname.split("")[5]) - 1}`);
          } else {
            return null;
          }
        } else if (number === ">") {
          if (pathname === "/all/9") {
            return null;
          } else {
            if (filterState !== null) {
              if (filterState === "React") {
                dispatch(getApiReact(Number(pathname.split("")[5]) + 1));
              } else if (filterState === "Angular") {
                dispatch(getApiAngular(Number(pathname.split("")[5]) + 1));
              } else if (filterState === "Vue") {
                dispatch(getApiVue(Number(pathname.split("")[5]) + 1));
              }
            } else {
              dispatch(getAllApi(Number(pathname.split("")[5]) + 1));
            }
            nav(`/all/${Number(pathname.split("")[5]) + 1}`);
          }
        } else if (number !== "<" && number !== ">") {
          //these conditions is to navigate when clicking the numbers and render the info
          if (filterState !== null) {
            if (filterState === "React") {
              dispatch(getApiReact(number));
            } else if (filterState === "Angular") {
              dispatch(getApiAngular(number));
            } else if (filterState === "Vue") {
              dispatch(getApiVue(number));
            }
          } else {
            dispatch(getAllApi(number));
          }
          nav(`/all/${number}`);
        }
      }}
    >
      {number}
    </button>
  );
};

export default Pagination;
