import React, { useState, useEffect, memo } from "react";
import { DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import moment from "moment";

const Register = ({
  isOpenModalRegister,
  setIsOpenModalRegister,
  handleFormRegister,
}) => {
  const [fullname, setfullName] = useState("");
  const [address, setAddress] = useState(null);
  const [birthday, setBirthday] = useState("01/01/2000");
  const [phone, setPhone] = useState(null);
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [gmail, setGmail] = useState("");

  const clickBtnRegister = () => {
    if (handleFormRegister) {
      handleFormRegister({
        fullname,
        birthday,
        address,
        phone,
        username,
        password,
        gmail,
      });
    }
  };

  const clickBtnCancelRegister = () => {
    if (setIsOpenModalRegister) setIsOpenModalRegister(false);
  };

  useEffect(() => {
    return () => {
      setfullName("");
      setBirthday("01/01/2000");
      setAddress(null);
      setPhone(null);
      setuserName("");
      setPassword("");
      setGmail("");
    };
  }, [isOpenModalRegister]);

  return (
    <Modal
      title="Register Account"
      open={isOpenModalRegister}
      onOk={clickBtnRegister}
      onCancel={clickBtnCancelRegister}
      okText="Xac nhan"
      cancelText="Huy"
    >
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
        <Form.Item label="Ho va ten">
          <Input
            placeholder="Nguyen Danh Tung"
            value={fullname}
            onChange={(e) => setfullName(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Dia chi">
          <Select
            placeholder="Ha Noi"
            value={address}
            onChange={(value) => setAddress(value)}
          >
            <Select.Option value="Ha Noi">Ha Noi</Select.Option>
            <Select.Option value="Hoa Binh">Hoa Binh</Select.Option>
            <Select.Option value="Hai Phong">Hai Phong</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Ngay sinh">
          <DatePicker
            style={{ width: "100%" }}
            placeholder="26/11/2000"
            value={moment(birthday, "DD/MM/YYYY")}
            format={"DD/MM/YYYY"}
            onChange={(e, date) => setBirthday(date)}
          />
        </Form.Item>

        <Form.Item label="So dien thoai">
          <InputNumber
            style={{ width: "100%" }}
            placeholder="0328394504"
            min={0}
            max={9999999999}
            value={phone}
            onChange={(value) => setPhone(value)}
          />
        </Form.Item>

        <Form.Item label="Ten dang nhap">
          <Input
            placeholder="tungkem"
            value={username}
            onChange={(e) => setuserName(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Mat khau">
          <Input.Password
            placeholder="23conmuc"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Gmail">
          <Input
            placeholder="danhtung.torres@gmail.com"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(Register);
