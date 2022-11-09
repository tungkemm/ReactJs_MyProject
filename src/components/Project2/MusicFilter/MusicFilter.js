import React, { memo, useState } from "react";
import clsx from "clsx";
import styles from "./MusicFilter.module.css";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { updateFilterText } from "../../../features/slices/musicplayerSlice";

const MusicFilter = () => {
  const { Search } = Input;
  const dispatch = useDispatch()
  const [inputSearch, setInputeSearch] = useState('')

  const handleSearchChange = (e) => {
    setInputeSearch(e.target.value)
    dispatch(updateFilterText(e.target.value))
  }

  return (
    <>
      <div className={clsx(styles.filterBlock)}>
        <span className={clsx(styles.filterTitle)}>Search: </span>
        <Search
          placeholder="Waiting for you ..."
          value={inputSearch}
          onChange={(e) => handleSearchChange(e)}
        />
      </div>
    </>
  );
};

export default memo(MusicFilter);
