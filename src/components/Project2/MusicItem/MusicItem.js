import React, { memo } from "react";
import clsx from "clsx";
import styles from "./MusicItem.module.css";
import { Modal, Popconfirm } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { currentMusicSelector } from "../../../features/selector";
import { deleteMusic, updateInfoCurrentMusicWhenClickMusicItem } from "../../../features/slices/musicplayerSlice";

const MusicItem = ({ dataMusicItem, setIsPlaying }) => {
  const { id, namesong, singer, image } = dataMusicItem;

  const dispatch = useDispatch();
  const currentMusic = useSelector(currentMusicSelector)
 
  // xu ly khi click vao 1 bai hat trong list
  const handleClickItem = (data) => {
    if (currentMusic.id !== id) {
      dispatch(updateInfoCurrentMusicWhenClickMusicItem(data));
      setIsPlaying(true);
    }
  };

  // xu ly khi xoa bai hat
  const handleDeleteMusic = (e, idsong) => {
    e.stopPropagation() // ngan noi bot khi click vao btn 'co'
    if (currentMusic.id !== id) {
      dispatch(deleteMusic(idsong))
      // Modal.info({
      //   content: "Dang code chuc nang nay ...",
      // });
    }
    else {
      Modal.error({
        content: "Ko the xoa bai hat dang duoc chon",
      });
    }
  }

  return (
    <div
      className={clsx(styles.itemBlock)}
      style={{
        ...(currentMusic.id === id && { backgroundColor: "#ec1f55" }),
      }}
      onClick={() => handleClickItem(dataMusicItem)}
    >
      <div
        className={clsx(styles.itemThumb)}
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      <div className={clsx(styles.itemBody)}>
        <h3 className={clsx(styles.itemTitle)}>{namesong}</h3>
        <p className={clsx(styles.itemAuthor)}>{singer}</p>
      </div>

      <Popconfirm
        title="Ban co muon xoa bai hat nay khong?"
        placement="right"
        onConfirm={(e) => handleDeleteMusic(e, id)}
        onCancel={(e) => e.stopPropagation()} //ngan noi bot khi click vao btn 'khong'
        cancelText="Khong"
        okText="Co"
        default
      >
        {/* Ngan noi bot khi click vao icon */}
        <div className={clsx(styles.itemOption)} onClick={e => e.stopPropagation()}> 
        <i className="fa-solid fa-delete-left"></i>
        </div>
      </Popconfirm>
    </div>
  );
};

export default memo(MusicItem);
