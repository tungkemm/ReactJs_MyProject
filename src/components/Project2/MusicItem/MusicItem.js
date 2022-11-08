import React, { memo } from "react";
import clsx from "clsx";
import styles from "./MusicItem.module.css";
import { useSelector, useDispatch } from "react-redux";
import { currentIndexSelector } from "../../../features/selector";
import { updateInfoCurrentMusicWhenClickMusicItem } from "../../../features/slices/musicplayerSlice";

const MusicItem = ({ dataMusicItem, index }) => {
  const { namesong, singer, image } = dataMusicItem;
  
  const dispatch = useDispatch();
  const currentIndex = useSelector(currentIndexSelector);

  const handleClickItem = (data) => {
    const newData = {...data, indexsong: index}
    if (index !== currentIndex) {
      dispatch(updateInfoCurrentMusicWhenClickMusicItem(newData));
    }
  };

  return (
    <div
      className={clsx(styles.itemBlock)}
      style={{
        ...(index === currentIndex && { backgroundColor: "#ec1f55" }),
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

      <div className={clsx(styles.itemOption)}>
        <i className="fas fa-ellipsis-h"></i>
      </div>
    </div>
  );
};

export default memo(MusicItem);
