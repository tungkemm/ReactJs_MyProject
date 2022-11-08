import React, { useState } from "react";
import { Button, Modal } from "antd";
import clsx from "clsx";
import styles from "./WorkManage.module.css";
import WorkFilter from "../WorkFilter/WorkFilter";
import WorkList from "../WorkList/WorkList";
import WorkForm from "../WorkForm/WorkForm";
import { useDispatch } from "react-redux";
import { addNewWork } from "../../../features/slices/workSlice";
import { v4 as uuidv4 } from 'uuid'

const WorkManage = () => {
  const dispatch = useDispatch()
  const [isOpenModalWork, setIsOpenModalWork] = useState(false);

  // xu ly them work
  const handleAddWork = (data) => {
    const { namework, priority, status } = data
    if (namework !== "" && priority !== "" && status !== null) {
      dispatch(addNewWork({
        id: uuidv4(),
        namework,
        priority,
        status
      }))

      setIsOpenModalWork(false);
    }
    else {
      Modal.error({
        content: "Chua them day du thong tin",
      });
    }
  };

  return (
    <div className={clsx(styles.workBlock)}>
      <h1 className={clsx(styles.workTitle)}>Quan ly cong viec</h1>
      
      <WorkFilter />

      <div className={clsx(styles.workBar)}></div>

      <WorkList />

      <>
        <div className={clsx(styles.workBtnAdd)}>
          <Button type="primary" onClick={() => setIsOpenModalWork(true)}>
            Create a work
          </Button>
        </div>

        <WorkForm
          isOpenModalWork={isOpenModalWork}
          setIsOpenModalWork={setIsOpenModalWork}
          handleAddWork={handleAddWork}
        />
      </>
    </div>
  );
};

export default WorkManage;
