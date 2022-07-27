import React, { useEffect } from "react";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import TargetInfo from "../components/TargetInfo";
import PaginationFavs from "../components/PaginationFavs";
import { getAllApi } from "../store/reducers/All.reducer";

const Favs = () => {
  const dispatch = useDispatch();
  const { favs, loading } = useSelector((state) => state.apiReducer);
  const pagination = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { pathname } = useLocation();
  const numberPage = pathname.split("")[6];

  useEffect(() => {
    dispatch(getAllApi(numberPage));
  }, []);

  return (
    <div className="container-all">
      {loading ? (
        <div className="spinner-container">
          <div className="spinner" />
        </div>
      ) : (
        <div className="container-grid">
          {favs.length > 0 ? (
            <div className="grid-info">
              {favs
                .filter(({ marked }) => marked === true)
                .map((target) => (
                  <TargetInfo target={target} key={target.id} />
                ))}
            </div>
          ) : (
            <div className="dont-have-targets">
              <h1>
                You don't have any cards in this page yet. add them by liking!
              </h1>
            </div>
          )}
        </div>
      )}

      <div className="container-pagination">
        <PaginationFavs number={"<"} />
        {pagination.map((item, index) => (
          <PaginationFavs number={index} key={index} />
        ))}
        <PaginationFavs number={">"} />
      </div>
    </div>
  );
};

export default Favs;
