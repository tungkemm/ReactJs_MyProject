import React, { useState, useEffect } from "react";
import { Form, Input, Modal, Select } from "antd";

const WorkForm = ({
  isOpenModalWork,
  setIsOpenModalWork,
  handleAddWork,
  handleUpdateWork,
  currentWorkItem,
}) => {
  const [namework, setnameWork] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState(null);

  // click vao btn them || update
  const clickBtnWork = () => {
    if (handleAddWork)
      handleAddWork({
        namework,
        priority,
        status: status === "1" ? false : status === "2" ? true : null,
      });
    if (handleUpdateWork && currentWorkItem)
      handleUpdateWork({
        id: currentWorkItem.id,
        namework,
        priority,
        status: status === "1" ? false : true,
      });
  };

  // click vao btn cancel
  const clickBtnCancelWork = () => {
    if (setIsOpenModalWork) setIsOpenModalWork(false);
  };

  // xu ly khi component dc mount
  useEffect(() => {
    if (currentWorkItem) {
      setnameWork(currentWorkItem.namework);
      setPriority(currentWorkItem.priority);
      setStatus(currentWorkItem.status ? "2" : "1");
    }
  }, [handleUpdateWork, currentWorkItem]);

  // xu ly khi component unmount
  useEffect(() => {
    return () => {
      setnameWork("");
      setPriority("");
      setStatus(null);
    };
  }, [isOpenModalWork]);

  return (
    <Modal
      title={handleAddWork ? "Them cong viec" : "Sua cong viec"}
      open={isOpenModalWork}
      onOk={clickBtnWork}
      onCancel={clickBtnCancelWork}
      okText={handleAddWork ? "Them" : "Cap nhat"}
      cancelText="Huy"
    >
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
      >
        <Form.Item label="Ten cong viec">
          <Input
            value={namework}
            onChange={(e) => setnameWork(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Muc do uu tien">
          <Select
            placeholder="Medium"
            value={priority}
            onChange={(value) => setPriority(value)}
          >
            <Select.Option value="High">High</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="Low">Low</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Trang thai">
          <Select
            placeholder="Chua hoan thanh"
            value={status}
            onChange={(value) => setStatus(value)}
          >
            <Select.Option value="1">Chua hoan thanh</Select.Option>
            <Select.Option value="2">Da hoan thanh</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WorkForm;
