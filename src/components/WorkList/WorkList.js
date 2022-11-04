import React from "react";
import WorkItem from "../WorkItem/WorkItem";
import clsx from "clsx";
import styles from "./WorkList.module.css";
import { useSelector } from "react-redux";
import { worksRemainingSelector } from "../../features/selector";

const WorkList = () => {
  const infoWork = useSelector(worksRemainingSelector);

  return (
    <div className={clsx(styles.workListBlock)}>
      {infoWork.statusWork === "loading" ? (
        <div>Loading ...</div>
      ) : (
        infoWork.listWork.map((item) => (
          <WorkItem key={item.id} dataWorkItem={item} />
        ))
      )}
    </div>
  );
};

export default WorkList;
