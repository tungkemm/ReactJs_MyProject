import React, { memo } from "react";
import clsx from "clsx";
import styles from "./MusicInfo.module.css";
import { useSelector } from "react-redux";
import { currentMusicSelector } from "../../../features/selector";

const MusicInfo = () => {
  const currentMusic = useSelector(currentMusicSelector);
  const { namesong, image } = currentMusic;
  
  return (
    <div className={clsx(styles.infoBlock)}>
      <div className={clsx(styles.inforTitle)}>
        <p>Now playing:</p>
        <h2>{namesong}</h2>
      </div>

      <div className={clsx(styles.infoCd)}>
        <div
          className={styles.infoCdThumd}
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      </div>
    </div>
  );
};

export default memo(MusicInfo);
