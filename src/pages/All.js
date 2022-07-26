import { NativeSelect } from "@mantine/core";
import React, { useState } from "react";
import Pagination from "../components/Pagination";
import TargetInfo from "../components/TargetInfo";

const All = () => {
  const [filterValue, setFilterValue] = useState(
    localStorage.getItem("filterState") || ""
  );
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const pagination = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // This function is responsible for setting the filter status and sending the filter value to local storage.
  const handleChange = (value) => {
    setFilterValue(value);
    localStorage.setItem("filterState", value);
  };

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

      <div className="container-grid">
        <div className="grid-info">
          {array.map(() => (
            <TargetInfo />
          ))}
        </div>
      </div>
      <div className="container-pagination">
        <Pagination number={"<"} />
        {pagination.map((item, index) => (
          <Pagination number={index} />
        ))}
        <Pagination number={">"} />
      </div>
    </div>
  );
};

export default All;
