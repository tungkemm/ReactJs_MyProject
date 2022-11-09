import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import styles from "./Introduce.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormLogin from "../../components/FormLogin/FormLogin";
import FormRegister from "../../components/FormRegister/FormRegister";
import {
  addNewAccount,
  updateCurrentAccountWhenLogin,
  getAccount,
} from "../../features/slices/accountSlice";
import { accountSelector } from "../../features/selector";

const Introduce = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const infoAccount = useSelector(accountSelector);
  const [isOpenModalRegister, setIsOpenModalRegister] = useState(false);

  // // khi component dc mount, dispatch de lay du lieu list account tu server
  useEffect(() => {
    dispatch(getAccount());
  }, []);

  // xu ly form dang ky
  const handleFormRegister = (data) => {
    const { fullname, birthday, address, phone, username, password, gmail } =
      data;
    if (
      fullname !== "" &&
      address !== null &&
      birthday !== "" &&
      phone !== null &&
      username !== "" &&
      password !== "" &&
      gmail !== ""
    ) {
      const accountDuplicate = infoAccount.listAccount.find(
        (account) => account.username === username
      );

      if (!accountDuplicate) {
        dispatch(
          addNewAccount({
            id: uuidv4(),
            fullname,
            birthday,
            address: address,
            phone: phone,
            username,
            password,
            gmail,
          })
        );

        Modal.success({
          content: "Dang ky tai khoan thanh cong",
        });
        setIsOpenModalRegister(false);
      } else {
        Modal.error({
          content: "Ten dang nhap da duoc dang ky roi :(",
        });
      }
    } else {
      Modal.error({
        content: "Chua nhap day du thong tin",
      });
    }
  };

  // xu ly form dang nhap
  const handleFormLogin = (data) => {
    const { username, password } = data;
    if (username !== "" && password !== "") {
      const accountDuplicate = infoAccount.listAccount.find(
        (account) => account.username === username
      );

      if (accountDuplicate) {
        dispatch(
          updateCurrentAccountWhenLogin({
            username,
            password,
          })
        );

        Modal.success({
          content: "Dang nhap thanh cong",
        });
        navigate("/home");
      } else {
        Modal.error({
          content: "Tai khoan khong ton tai !",
        });
      }
    } else {
      Modal.error({
        content: "Chua nhap day du thong tin",
      });
    }
  };

  return (
    <div className={clsx(styles.introducePage)}>
      {/* Description */}
      <div className={clsx(styles.introduceDscBlock, styles.introduceBlock)}>
        <h1 className={clsx(styles.introduceTitle)}>My Project</h1>
        <p className={clsx(styles.introduceDescription)}>
          Facebook helps you connect and share with the people in your life !
        </p>
      </div>

      {/* Form */}
      <div className={clsx(styles.introduceFormAccount, styles.introduceBlock)}>
        {infoAccount.statusAccount === "loading" ? (
          <div>Loading ...</div>
        ) : (
          <>
            <FormLogin handleFormLogin={handleFormLogin} />
            <div className={clsx(styles.introduceBar)}></div>

            {/* Register */}
            <div className={clsx(styles.introduceBlockBtnRegister)}>
              <Button
                type="primary"
                onClick={() => setIsOpenModalRegister(true)}
              >
                Create new account
              </Button>
            </div>

            <FormRegister
              isOpenModalRegister={isOpenModalRegister}
              setIsOpenModalRegister={setIsOpenModalRegister}
              handleFormRegister={handleFormRegister}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Introduce;
