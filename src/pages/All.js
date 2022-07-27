import { NativeSelect } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import TargetInfo from "../components/TargetInfo";
import {
  getAllApi,
  getApiAngular,
  getApiReact,
  getApiVue,
} from "../store/reducers/All.reducer";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const All = () => {
  const dispatch = useDispatch();
  const { api, filter, loading } = useSelector((state) => state.apiReducer);
  const { pathname } = useLocation();
  const [filterValue, setFilterValue] = useState(
    localStorage.getItem("filterState") || ""
  );
  const numberPage = pathname.split("")[5];
  const pagination = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //
  useEffect(() => {
    if (filterValue !== null) {
      if (filterValue === "React") {
        dispatch(getApiReact(numberPage));
      } else if (filterValue === "Angular") {
        dispatch(getApiAngular(numberPage));
      } else if (filterValue === "Vue") {
        dispatch(getApiVue(numberPage));
      }
    } else {
      dispatch(getAllApi(numberPage));
    }
  }, []);

  // This function is responsible for setting the filter status and sending the filter value to local storage.
  const handleChange = (value) => {
    setFilterValue(value);
    localStorage.setItem("filterState", value);
    if (value === "React") {
      dispatch(getApiReact(0));
    } else if (value === "Angular") {
      dispatch(getApiAngular(0));
    } else if (value === "Vue") {
      dispatch(getApiVue(0));
    }
  };

  console.log(filter);
  return (
    <div className="container-all">
      <div className="container-filter">
        <NativeSelect
          data={["React", "Vue", "Angular"]}
          value={filterValue}
          onChange={(event) => handleChange(event.currentTarget.value)}
          placeholder="Select your news"
          required
        />
      </div>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner" />
        </div>
      ) : (
        <div className="container-grid">
          <div className="grid-info">
            {localStorage.getItem("filterState")
              ? filter.map((target) => <TargetInfo target={target} />)
              : api.map((target) => <TargetInfo target={target} />)}
          </div>
        </div>
      )}

      <div className="container-pagination">
        <Pagination number={"<"} />
        {pagination.map((item, index) => (
          <Pagination number={index} key={index} />
        ))}
        <Pagination number={">"} />
      </div>
    </div>
  );
};

export default All;
