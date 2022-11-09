import React, { memo } from "react";
import clsx from "clsx";
import styles from "./MusicList.module.css";
import MusicItem from "../MusicItem/MusicItem";
import { useSelector } from "react-redux";
import { musicplayerSelector } from "../../../features/selector";

const MusicList = ({ setIsPlaying }) => {
  const infoMusicplayer = useSelector(musicplayerSelector);

  return (
    <div className={clsx(styles.listBlock)}>
      {infoMusicplayer.statusMusicPlayer === "loading" ? (
        <div>Loading ...</div>
      ) : infoMusicplayer.listMusic.length > 0 ? (
        infoMusicplayer.listMusic.map((item, index) => (
          <MusicItem
            key={item.id}
            dataMusicItem={item}
            index={index}
            setIsPlaying={setIsPlaying}
          />
        ))
      ) : (
        <div>Chua co bai nhac nao :D</div>
      )}
    </div>
  );
};

export default memo(MusicList);
