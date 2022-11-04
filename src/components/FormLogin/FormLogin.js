import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";

const Login = ({ handleFormLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onClickBtnLogin = () => {
    if (handleFormLogin) {
      handleFormLogin({
        username,
        password,
      });
    }
  };

  useEffect(() => {
    return () => {
      setUsername("");
      setPassword("");
    };
  }, []);

  return (
    <Form
      labelCol={{
        span: 5,
      }}
    >
      <Form.Item label="Username">
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item label="Password">
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 10,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={onClickBtnLogin}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
