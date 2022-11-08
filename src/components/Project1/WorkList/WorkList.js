import React, {memo} from "react";
import WorkItem from "../WorkItem/WorkItem";
import clsx from "clsx";
import styles from "./WorkList.module.css";
import { useSelector } from "react-redux";
import { worksRemainingSelector } from "../../../features/selector";

const WorkList = () => {
  const infoWork = useSelector(worksRemainingSelector);

  return (
    <div className={clsx(styles.workListBlock)}>
      {infoWork.statusWork === "loading" ? (
        <div>Loading ...</div>
      ) : infoWork.listWork.length > 0 ? (
        infoWork.listWork.map((item) => (
          <WorkItem key={item.id} dataWorkItem={item} />
        ))
      ) : (
        <div>Chua co du lieu</div>
      )}
    </div>
  );
};

export default memo(WorkList);
