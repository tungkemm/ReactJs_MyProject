import React, { useState } from "react";
import { Input, Radio, Select, Tag } from "antd";
import clsx from "clsx";
import styles from "./WorkFilter.module.css";
import { useDispatch } from "react-redux";
import {
  updateFilterPriority,
  updateFilterStatus,
  updateFilterText,
} from "../../features/slices/workSlice";

const WorkFilter = () => {
  const dispatch = useDispatch();
  const { Search } = Input;
  const [inputSearch, setInputSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("All");
  const [prioritySearch, setPrioritySearch] = useState([]);

  // xu ly khi onchange input text
  const handleSearchChange = (e) => {
    setInputSearch(e.target.value);
    dispatch(updateFilterText(e.target.value));
  };

  // xu ly khi onchange radio
  const handleStatusChange = (e) => {
    setStatusSearch(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  // xu ly khi onchange select
  const handlePriorityChange = (value) => {
    setPrioritySearch(value);
    dispatch(updateFilterPriority(value));
  };

  return (
    <>
      <div className={clsx(styles.workFilterBlock)}>
        <span className={clsx(styles.workFilterTitle)}>Search: </span>
        <Search
          placeholder="Search work"
          value={inputSearch}
          onChange={(e) => handleSearchChange(e)}
        />
      </div>

      <div className={clsx(styles.workFilterBlock)}>
        <span className={clsx(styles.workFilterTitle)}>Filter by status: </span>
        <Radio.Group
          value={statusSearch}
          onChange={(e) => handleStatusChange(e)}
        >
          <Radio value="All">All</Radio>
          <Radio value="Completed">Completed</Radio>
          <Radio value="Work">Incomplete</Radio>
        </Radio.Group>
      </div>

      <div className={clsx(styles.workFilterBlock)}>
        <span className={clsx(styles.workFilterTitle)}>
          Filter by priority:
        </span>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          value={prioritySearch}
          onChange={(e) => handlePriorityChange(e)}
        >
          <Select.Option value="High" label="High">
            <Tag color="red">High</Tag>
          </Select.Option>
          <Select.Option value="Medium" label="Medium">
            <Tag color="blue">Medium</Tag>
          </Select.Option>
          <Select.Option value="Low" label="Low">
            <Tag color="gray">Low</Tag>
          </Select.Option>
        </Select>
      </div>
    </>
  );
};

export default WorkFilter;
