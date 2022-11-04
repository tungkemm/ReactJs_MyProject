import React from "react";
import { useDispatch } from "react-redux";
import { updateCurrentAccountWhenLogout } from "../../features/slices/accountSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Modal } from "antd";
import clsx from "clsx";
import styles from "./HeaderApp.module.css";

const HeaderApp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Header } = Layout;
  const listHeader = [
    { id: 1, title: "Home", route: "/home" },
    { id: 2, title: "Project 1", route: "/project1" },
    { id: 3, title: "Project 2", route: "/project2" },
    { id: 4, title: "Log out" },
  ];

  const handleClickTitle = (data) => {
    if (data.route) navigate(data.route);
    else {
      if (data.title === "Log out") {
        Modal.confirm({
          title: "Ban co muon dang xuat khong ?",
          okText: "Co",
          cancelText: "Khong",
          onOk: () => {
            dispatch(updateCurrentAccountWhenLogout());
            navigate("/login");
          },
        });
      }
    }
  };

  return (
    <>
      <Header className={clsx(styles.headerApp)}>
        <div className={clsx(styles.headerAppLogo)} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={listHeader.map((item) => ({
            key: item.id,
            label: item.title,
            onClick: () => handleClickTitle(item),
          }))}
        />
      </Header>
      <div className={clsx(styles.headerHollow)}></div>
      <Outlet />
    </>
  );
};

export default HeaderApp;
