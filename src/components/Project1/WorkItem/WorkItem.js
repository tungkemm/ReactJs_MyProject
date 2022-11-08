import React, { useState, memo } from "react";
import { Button, Checkbox, Modal, Popconfirm, Tag } from "antd";
import clsx from "clsx";
import styles from "./WorkItem.module.css";
import WorkForm from "../WorkForm/WorkForm";
import { useDispatch } from "react-redux";
import {
  deleteWork,
  updateStatusWork,
  updateWork,
} from "../../../features/slices/workSlice";

const WorkItem = ({ dataWorkItem }) => {
  const { id, namework, priority, status } = dataWorkItem;
  const priorityColorMapping = {
    High: "red",
    Medium: "blue",
    Low: "gray",
  };

  const dispatch = useDispatch();
  const [isOpenModalWork, setIsOpenModalWork] = useState(false);
  const [currentWorkItem, setCurrentWorkItem] = useState(null);

  // khi click vao btn Sua
  const clickBtnUpdate = (data) => {
    setIsOpenModalWork(true);
    setCurrentWorkItem(data);
  };

  // xu ly update status complete cua 1 work
  const handleUpdateStatusWork = (data) => {
    dispatch(updateStatusWork(data));
  };

  //xu ly xoa work
  const handleDeleteWork = (idCurrentWork) => {
    dispatch(deleteWork(idCurrentWork));
  };

  // xu ly update work
  const handleUpdateWork = (newData) => {
    const { id, namework, priority, status } = newData;
    if (namework !== "" && priority !== "" && status !== null) {
      dispatch(
        updateWork({
          id,
          namework,
          priority,
          status,
        })
      );

      setIsOpenModalWork(false);
    } else {
      Modal.error({
        content: "Chua cap nhat day du thong tin",
      });
    }
  };

  return (
    <div
      className={clsx(styles.itemBlock)}
      style={{
        ...(status && { opacity: 0.6, textDecoration: "line-through" }),
      }}
    >
      <Checkbox
        checked={status}
        onChange={() => handleUpdateStatusWork(dataWorkItem)}
      >
        {namework}
      </Checkbox>
      <Tag color={priorityColorMapping[priority]}>{priority}</Tag>

      <div>
        <Button
          type="primary"
          size="small"
          className={clsx(styles.itemBtn, styles.itemBtnUpdate)}
          onClick={() => clickBtnUpdate(dataWorkItem)}
        >
          Sua
        </Button>

        <Popconfirm
          title="Ban co muon xoa cong viec nay khong?"
          placement="rightBottom"
          onConfirm={() => handleDeleteWork(id)}
          // onCancel={(e) => console.log(e)}
          cancelText="Khong"
          okText="Co"
          default
        >
          <Button type="primary" size="small" className={clsx(styles.itemBtn)}>
            Xoa
          </Button>
        </Popconfirm>

        <WorkForm
          isOpenModalWork={isOpenModalWork}
          setIsOpenModalWork={setIsOpenModalWork}
          handleUpdateWork={handleUpdateWork}
          currentWorkItem={currentWorkItem}
        />
      </div>
    </div>
  );
};

export default memo(WorkItem);
