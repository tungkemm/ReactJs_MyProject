import React from "react";
import { useSelector } from "react-redux";
import { currentAccountSelector } from "../../features/selector";

const Home = () => {
  const currentAccount = useSelector(currentAccountSelector);

  return (
    <div>
      {currentAccount &&
      Object.keys(currentAccount).length === 0 &&
      Object.getPrototypeOf(currentAccount) === Object.prototype ? (
        <div>Chua login nen chua co du lieu</div>
      ) : (
        <>
          <h1>Thong tin ca nhan cua ban:</h1>
          <div>Ho va ten: {currentAccount.fullname}</div>
          <div>Dia chi: {currentAccount.address}</div>
          <div>Ngay sinh: {currentAccount.birthday}</div>
          <div>So dien thoai: {currentAccount.phone}</div>
          <div>Gmail: {currentAccount.gmail}</div>
        </>
      )}
    </div>
  );
};

export default Home;
