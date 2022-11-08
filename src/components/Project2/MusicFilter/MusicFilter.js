import React, { memo } from "react";
import clsx from "clsx";
import styles from "./MusicFilter.module.css";
import { Input } from "antd";

const MusicFilter = () => {
  const { Search } = Input;
  return (
    <>
      <div className={clsx(styles.filterBlock)}>
        <span className={clsx(styles.filterTitle)}>Search: </span>
        <Search
          placeholder="Waiting for you ..."
          // value={inputSearch}
          // onChange={(e) => handleSearchChange(e)}
        />
      </div>
    </>
  );
};

export default memo(MusicFilter);
