import React, { memo } from "react";
import clsx from "clsx";
import styles from "./MusicControl.module.css";
import { Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentMusicWhenClickBtnNext,
  updateCurrentMusicWhenClickBtnPrev,
  updateStatusRandom,
} from "../../../features/slices/musicplayerSlice";
import { statusRandomSelector } from "../../../features/selector";

const MusicControl = ({
  audioElement,
  progress,
  isPlaying,
  setIsPlaying,
  isReplay,
  setIsReplay,
}) => {
  const dispatch = useDispatch();
  const statusRandom = useSelector(statusRandomSelector);

  // xu ly khi click btn play/pause bai hat
  const handleClickBtnTooglePlay = () => {
    isPlaying ? audioElement.current.pause() : audioElement.current.play();
    setIsPlaying(!isPlaying);
  };

  // xu ly khi tua bai hat (onChange slider)
  const handleClickSlider = (value) => {
    const duration = audioElement.current.duration;
    audioElement.current.currentTime = (duration * value) / 100; // update lai thoi gian hien tai cua bai hat
  };

  // xu ly khi click btn next bai hat
  const handleClickBtnNext = () => {
    dispatch(updateCurrentMusicWhenClickBtnNext());
    setIsPlaying(true);
  };

  // xu ly khi click btn prev bai hat
  const handleClickBtnPrev = () => {
    dispatch(updateCurrentMusicWhenClickBtnPrev());
    setIsPlaying(true);
  };

  // xu ly khi click btn random
  const handleClickBtnRandom = () => {
    dispatch(updateStatusRandom());
  };

  return (
    <>
      <div className={clsx(styles.controlBlock)}>
        {/* Btn Replay */}
        <div
          className={clsx(styles.controlBtn)}
          style={{
            ...(isReplay && { color: "#ec1f55" }),
          }}
          onClick={() => setIsReplay(!isReplay)}
        >
          <i className="fas fa-redo"></i>
        </div>

        {/* Btn Prev */}
        <div className={clsx(styles.controlBtn)} onClick={handleClickBtnPrev}>
          <i className="fas fa-step-backward"></i>
        </div>

        {/* Btn play/pause */}
        <div
          className={clsx(styles.controlBtn, styles.controlBtnTooglePlay)}
          onClick={handleClickBtnTooglePlay}
        >
          {isPlaying ? (
            <i className="fas fa-pause icon-pause"></i>
          ) : (
            <i className="fas fa-play icon-play"></i>
          )}
        </div>

        {/* Btn next */}
        <div className={clsx(styles.controlBtn)} onClick={handleClickBtnNext}>
          <i className="fas fa-step-forward"></i>
        </div>

        {/* Btn random */}
        <div
          className={clsx(styles.controlBtn)}
          style={{
            ...(statusRandom && { color: "#ec1f55" }),
          }}
          onClick={handleClickBtnRandom}
        >
          <i className="fas fa-random"></i>
        </div>
      </div>

      <Slider
        min={0}
        max={100}
        value={progress}
        onChange={(value) => handleClickSlider(value)}
      />
    </>
  );
};

export default memo(MusicControl);