import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./MusicPlayerManage.module.css";
import { useSelector, useDispatch } from "react-redux";
import MusicFilter from "../MusicFilter/MusicFilter";
import MusicInfo from "../MusicInfo/MusicInfo";
import MusicControl from "../MusicControl/MusicControl";
import MusicList from "../MusicList/MusicList";
import { currentMusicSelector } from "../../../features/selector";
import { updateCurrentMusicWhenClickBtnNext } from "../../../features/slices/musicplayerSlice";

const MusicPlayerManage = () => {
  const dispatch = useDispatch();
  const currentMusic = useSelector(currentMusicSelector);
  const { pathsong } = currentMusic;

  const audioElement = useRef();
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReplay, setIsReplay] = useState(true);

  // luon play bai hat moi khi next/prev/bai hat ket thuc/chon bai tu list
  useEffect(() => {
    isPlaying && audioElement.current.play();
    setProgress(0)
  }, [currentMusic]);

  // xu ly khi bai hat chay
  const onPlaying = () => {
    const duration = audioElement.current.duration; // lay tong thoi gian bai hat
    const currentTimeSong = audioElement.current.currentTime; // lay thoi gian hien tai cua bai hat

    if (duration) setProgress((currentTimeSong / duration) * 100); // update lai thanh slider
  };

  // xu ly khi bai hat ket thuc
  const onEnded = () => {
    if (isReplay) {
      audioElement.current.play();
    } else {
      dispatch(updateCurrentMusicWhenClickBtnNext());
      setIsPlaying(true);
    }
  };

  return (
    <div className={clsx(styles.manageBlock)}>
      <MusicFilter />
      <MusicInfo />
      <MusicControl
        audioElement={audioElement}
        progress={progress}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isReplay={isReplay}
        setIsReplay={setIsReplay}
      />
      <audio
        ref={audioElement}
        src={pathsong}
        onTimeUpdate={onPlaying}
        onEnded={onEnded}
      />
      <MusicList />
    </div>
  );
};

export default MusicPlayerManage;
